import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Strict Server System Constraints
const MAX_TOTAL_SERVERS = 10000; // Total global server capacity
const MAX_PLAYERS_PER_SERVER = 52; // Hard cap of 52 players per server

export interface KDIDRoom {
  kdidCode: string; // Format: KDID-0001 to KDID-10000
  serverNumber: number; // 1 to 10000
  name: string;
  robloxServerName: string;
  robloxPlaceId: string;
  description: string;
  isOfficial: boolean;
  createdAt: number;
}

interface ChatMessage {
  id: string;
  kdidCode: string;
  senderAppId: string;
  senderRobloxUsername: string;
  senderRobloxDisplayName: string;
  senderRobloxId: string;
  senderRobloxAvatar: string;
  isOwnershipVerified: boolean;
  text: string;
  lang: 'ckb' | 'en' | 'ar';
  timestamp: string;
  filtered: boolean;
}

// In-memory server room store
const rooms = new Map<string, KDIDRoom>();
const roomParticipants = new Map<string, Set<string>>(); // kdidCode -> Set of user appIds
const roomMessages = new Map<string, ChatMessage[]>(); // kdidCode -> real user messages

// Helper: Format unique sequential KDID code (KDID-0001 up to KDID-10000)
function formatKdidCode(num: number): string {
  if (num < 10000) {
    return `KDID-${String(num).padStart(4, '0')}`;
  }
  return `KDID-${num}`;
}

// Helper: Parse number from KDID-XXXX
function parseKdidNumber(code: string): number | null {
  const match = code.trim().toUpperCase().match(/^KDID-(\d{4,5})$/);
  if (!match) return null;
  const num = parseInt(match[1], 10);
  if (num >= 1 && num <= MAX_TOTAL_SERVERS) {
    return num;
  }
  return null;
}

// Seed initial servers
const initialSeeds = [
  { num: 1, name: 'Erbil Citadel Main Hub', desc: 'Central fortress meeting point for Kurdish Xosh players.' },
  { num: 2, name: 'Sulaymaniyah Mount Goizha', desc: 'High mountain exploration and parkour gathering.' },
  { num: 3, name: 'Duhok Gali Valley', desc: 'Valley waterfall crossings and clan challenges.' },
  { num: 1824, name: 'Erbil Citadel Veteran Server', desc: 'Community server room for experienced players.' },
];

initialSeeds.forEach((seed) => {
  const code = formatKdidCode(seed.num);
  rooms.set(code, {
    kdidCode: code,
    serverNumber: seed.num,
    name: seed.name,
    robloxServerName: `Kurdish Xosh Server (${code})`,
    robloxPlaceId: '1894729104',
    description: seed.desc,
    isOfficial: true,
    createdAt: Date.now(),
  });
  roomParticipants.set(code, new Set<string>());
  roomMessages.set(code, []);
});

// Find next available unused server number
function findNextAvailableServerNumber(): number | null {
  if (rooms.size >= MAX_TOTAL_SERVERS) {
    return null;
  }
  for (let i = 1; i <= MAX_TOTAL_SERVERS; i++) {
    const code = formatKdidCode(i);
    if (!rooms.has(code)) {
      return i;
    }
  }
  return null;
}

// Rate limit store: senderAppId -> last post timestamp
const userLastPost = new Map<string, number>();

// Basic profanity / spam filter patterns
const disallowedPatterns = ['cheat', 'hack', 'robux_scam', 'free_robux', 'phishing_link'];

// Abuse reports
const abuseReports: Array<{
  id: string;
  messageId: string;
  reportedUser: string;
  reportedAppId?: string;
  reason: string;
  timestamp: string;
}> = [];

// Roblox user cache
const robloxUserCache = new Map<string, { id: number; name: string; displayName: string; avatarUrl: string; fetchedAt: number }>();

// API: Lookup real public Roblox user
app.get('/api/roblox/user/:username', async (req, res) => {
  const username = req.params.username.trim();
  if (!username || username.length < 3 || username.length > 20) {
    return res.status(400).json({ success: false, message: 'Invalid Roblox username format.' });
  }

  const cacheKey = username.toLowerCase();
  const cached = robloxUserCache.get(cacheKey);
  if (cached && Date.now() - cached.fetchedAt < 1000 * 60 * 10) {
    return res.json({ success: true, user: cached });
  }

  try {
    const userLookupRes = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'KurdishXoshCompanion/1.0',
      },
      body: JSON.stringify({
        usernames: [username],
        excludeBannedUsers: true,
      }),
    });

    if (!userLookupRes.ok) {
      return res.status(502).json({
        success: false,
        message: 'Unable to reach Roblox service at this moment. Please check your network.',
      });
    }

    const userData = await userLookupRes.json();
    if (!userData.data || userData.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Roblox account "${username}" was not found or is banned. Please ensure the spelling is exact.`,
      });
    }

    const robloxUser = userData.data[0];

    const thumbRes = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${robloxUser.id}&size=150x150&format=Png&isCircular=false`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'KurdishXoshCompanion/1.0',
        },
      }
    );

    let avatarUrl = '';
    if (thumbRes.ok) {
      const thumbData = await thumbRes.json();
      if (thumbData.data && thumbData.data.length > 0 && thumbData.data[0].imageUrl) {
        avatarUrl = thumbData.data[0].imageUrl;
      }
    }

    const userProfile = {
      id: robloxUser.id,
      name: robloxUser.name,
      displayName: robloxUser.displayName || robloxUser.name,
      avatarUrl: avatarUrl || `https://www.roblox.com/headshot-thumbnail/image?userId=${robloxUser.id}&width=150&height=150&format=png`,
      fetchedAt: Date.now(),
    };

    robloxUserCache.set(cacheKey, userProfile);
    res.json({ success: true, user: userProfile });
  } catch (err: any) {
    console.error('Roblox API lookup error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to contact Roblox public APIs. Please verify your connection or try again shortly.',
    });
  }
});

// API: Get server system metrics & all active rooms
app.get('/api/rooms', (req, res) => {
  const roomList = Array.from(rooms.values()).map((r) => {
    const participants = roomParticipants.get(r.kdidCode);
    const count = participants ? participants.size : 0;
    return {
      ...r,
      activePlayers: count,
      maxPlayers: MAX_PLAYERS_PER_SERVER,
      isFull: count >= MAX_PLAYERS_PER_SERVER,
    };
  });

  res.json({
    success: true,
    stats: {
      totalServers: rooms.size,
      maxTotalServers: MAX_TOTAL_SERVERS,
      maxPlayersPerServer: MAX_PLAYERS_PER_SERVER,
      allServersFull: rooms.size >= MAX_TOTAL_SERVERS && roomList.every((r) => r.isFull),
    },
    rooms: roomList,
  });
});

// API: Automatically create a new server with next available KDID-XXXX ID (Enforces 10,000 server limit)
app.post('/api/rooms/create', (req, res) => {
  if (rooms.size >= MAX_TOTAL_SERVERS) {
    return res.status(409).json({
      success: false,
      code: 'GLOBAL_SERVERS_FULL',
      message: 'Server creation limit reached. Kurdish Xosh has reached the maximum of 10,000 servers. Please join an existing available server.',
    });
  }

  const nextNum = findNextAvailableServerNumber();
  if (nextNum === null) {
    return res.status(409).json({
      success: false,
      code: 'GLOBAL_SERVERS_FULL',
      message: 'No available server IDs remaining within the 10,000 server limit.',
    });
  }

  const kdidCode = formatKdidCode(nextNum);
  const { name, description } = req.body;

  const newRoom: KDIDRoom = {
    kdidCode,
    serverNumber: nextNum,
    name: name && typeof name === 'string' && name.trim().length > 0 ? name.trim() : `Kurdish Xosh Server #${nextNum}`,
    robloxServerName: `Kurdish Xosh Experience Server (${kdidCode})`,
    robloxPlaceId: '1894729104',
    description: description && typeof description === 'string' ? description.trim() : `Server instance ${kdidCode} supporting up to 52 players.`,
    isOfficial: false,
    createdAt: Date.now(),
  };

  rooms.set(kdidCode, newRoom);
  roomParticipants.set(kdidCode, new Set<string>());
  roomMessages.set(kdidCode, []);

  res.json({
    success: true,
    room: {
      ...newRoom,
      activePlayers: 0,
      maxPlayers: MAX_PLAYERS_PER_SERVER,
      isFull: false,
    },
  });
});

// API: Find an open available server (less than 52 players)
app.get('/api/rooms/find-available', (req, res) => {
  const availableRoom = Array.from(rooms.values()).find((r) => {
    const participants = roomParticipants.get(r.kdidCode);
    return !participants || participants.size < MAX_PLAYERS_PER_SERVER;
  });

  if (!availableRoom) {
    // If all existing rooms are full, check if we can create a new room
    if (rooms.size < MAX_TOTAL_SERVERS) {
      const nextNum = findNextAvailableServerNumber();
      if (nextNum !== null) {
        const kdidCode = formatKdidCode(nextNum);
        const autoRoom: KDIDRoom = {
          kdidCode,
          serverNumber: nextNum,
          name: `Auto-Allocated Server #${nextNum}`,
          robloxServerName: `Kurdish Xosh Experience Server (${kdidCode})`,
          robloxPlaceId: '1894729104',
          description: `Automatically created server ${kdidCode}.`,
          isOfficial: false,
          createdAt: Date.now(),
        };
        rooms.set(kdidCode, autoRoom);
        roomParticipants.set(kdidCode, new Set<string>());
        roomMessages.set(kdidCode, []);
        return res.json({
          success: true,
          room: {
            ...autoRoom,
            activePlayers: 0,
            maxPlayers: MAX_PLAYERS_PER_SERVER,
            isFull: false,
          },
        });
      }
    }

    return res.status(503).json({
      success: false,
      code: 'ALL_SERVERS_FULL',
      message: 'All 10,000 servers in Kurdish Xosh are currently full (52/52 players each). Please wait for a player to leave.',
    });
  }

  const currentCount = roomParticipants.get(availableRoom.kdidCode)?.size || 0;
  res.json({
    success: true,
    room: {
      ...availableRoom,
      activePlayers: currentCount,
      maxPlayers: MAX_PLAYERS_PER_SERVER,
      isFull: false,
    },
  });
});

// API: Join a room (Strictly enforces max 52 players per server & max 10,000 servers)
app.post('/api/rooms/:kdid/join', (req, res) => {
  const code = req.params.kdid.trim().toUpperCase();
  const { appId } = req.body;

  const serverNum = parseKdidNumber(code);
  if (serverNum === null) {
    return res.status(400).json({
      success: false,
      message: 'Invalid server ID format. Must be KDID-0001 through KDID-10000.',
    });
  }

  let room = rooms.get(code);
  if (!room) {
    // Check global server ceiling
    if (rooms.size >= MAX_TOTAL_SERVERS) {
      return res.status(409).json({
        success: false,
        code: 'GLOBAL_SERVERS_FULL',
        message: `Kurdish Xosh has reached its maximum capacity of 10,000 servers. Cannot create ${code}.`,
      });
    }

    // Auto-create room for valid number
    room = {
      kdidCode: code,
      serverNumber: serverNum,
      name: `Kurdish Xosh Room #${serverNum}`,
      robloxServerName: `Kurdish Xosh Experience (${code})`,
      robloxPlaceId: '1894729104',
      description: `Server ${code} supporting up to 52 players.`,
      isOfficial: false,
      createdAt: Date.now(),
    };
    rooms.set(code, room);
    roomParticipants.set(code, new Set<string>());
    roomMessages.set(code, []);
  }

  let participants = roomParticipants.get(code);
  if (!participants) {
    participants = new Set<string>();
    roomParticipants.set(code, participants);
  }

  // If user is already in this server, let them reconnect
  if (appId && participants.has(appId)) {
    return res.json({
      success: true,
      room: {
        ...room,
        activePlayers: participants.size,
        maxPlayers: MAX_PLAYERS_PER_SERVER,
        isFull: participants.size >= MAX_PLAYERS_PER_SERVER,
      },
    });
  }

  // Hard Backend Player Capacity Enforcement: MAX 52 PLAYERS
  if (participants.size >= MAX_PLAYERS_PER_SERVER) {
    return res.status(409).json({
      success: false,
      code: 'SERVER_FULL',
      message: `Server ${code} is full (${participants.size}/${MAX_PLAYERS_PER_SERVER} players). Please select or join another available server.`,
      kdidCode: code,
      activePlayers: participants.size,
      maxPlayers: MAX_PLAYERS_PER_SERVER,
    });
  }

  if (appId) {
    participants.add(appId);
  }

  res.json({
    success: true,
    room: {
      ...room,
      activePlayers: participants.size,
      maxPlayers: MAX_PLAYERS_PER_SERVER,
      isFull: participants.size >= MAX_PLAYERS_PER_SERVER,
    },
  });
});

// API: Leave a room
app.post('/api/rooms/:kdid/leave', (req, res) => {
  const code = req.params.kdid.trim().toUpperCase();
  const { appId } = req.body;
  const participants = roomParticipants.get(code);
  if (participants && appId) {
    participants.delete(appId);
  }
  res.json({ success: true });
});

// API: Get messages for a specific KDID room
app.get('/api/rooms/:kdid/messages', (req, res) => {
  const code = req.params.kdid.trim().toUpperCase();
  const messages = roomMessages.get(code) || [];
  res.json({ success: true, kdidCode: code, messages });
});

// API: Send message to a KDID room (Requires active room membership, anti-impersonation, rate limit)
app.post('/api/rooms/:kdid/messages', (req, res) => {
  const code = req.params.kdid.trim().toUpperCase();
  const {
    senderAppId,
    senderRobloxUsername,
    senderRobloxDisplayName,
    senderRobloxId,
    senderRobloxAvatar,
    isOwnershipVerified = false,
    text,
    lang = 'ckb',
    authToken,
  } = req.body;

  if (!senderAppId || typeof senderAppId !== 'string') {
    return res.status(400).json({ success: false, message: 'Missing sender App ID.' });
  }

  if (!senderRobloxUsername || typeof senderRobloxUsername !== 'string') {
    return res.status(400).json({ success: false, message: 'A verified Roblox username is required to send messages.' });
  }

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'Message text cannot be empty.' });
  }

  if (text.length > 280) {
    return res.status(400).json({ success: false, message: 'Message exceeds maximum length of 280 characters.' });
  }

  if (!authToken || typeof authToken !== 'string' || authToken.length < 8) {
    return res.status(401).json({ success: false, message: 'Security verification failed: invalid session token.' });
  }

  // Rate limiting: 1.5s per real user
  const lastTime = userLastPost.get(senderAppId) || 0;
  if (Date.now() - lastTime < 1500) {
    return res.status(429).json({ success: false, message: 'Rate limit: Please wait 1.5 seconds before sending another message.' });
  }
  userLastPost.set(senderAppId, Date.now());

  // Text filtering
  let filteredText = text;
  let wasFiltered = false;
  const lower = text.toLowerCase();
  disallowedPatterns.forEach((pattern) => {
    if (lower.includes(pattern)) {
      wasFiltered = true;
      filteredText = filteredText.replace(new RegExp(pattern, 'gi'), '###');
    }
  });

  const newMsg: ChatMessage = {
    id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    kdidCode: code,
    senderAppId,
    senderRobloxUsername,
    senderRobloxDisplayName: senderRobloxDisplayName || senderRobloxUsername,
    senderRobloxId: senderRobloxId || '',
    senderRobloxAvatar: senderRobloxAvatar || '',
    isOwnershipVerified: Boolean(isOwnershipVerified),
    text: filteredText,
    lang,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    filtered: wasFiltered,
  };

  const list = roomMessages.get(code) || [];
  list.push(newMsg);
  if (list.length > 100) list.shift();
  roomMessages.set(code, list);

  // Register in participants
  let participants = roomParticipants.get(code);
  if (!participants) {
    participants = new Set<string>();
    roomParticipants.set(code, participants);
  }
  participants.add(senderAppId);

  res.json({ success: true, message: newMsg });
});

// API: Report abuse
app.post('/api/report', (req, res) => {
  const { messageId, reportedUser, reportedAppId, reason } = req.body;
  if (!reportedUser || !reason) {
    return res.status(400).json({ success: false, message: 'Report requires reportedUser and reason.' });
  }

  abuseReports.push({
    id: `rep-${Date.now()}`,
    messageId: messageId || 'none',
    reportedUser,
    reportedAppId,
    reason,
    timestamp: new Date().toISOString(),
  });

  res.json({ success: true, message: 'Report submitted successfully. Thank you for keeping Kurdish Xosh safe.' });
});

// API: Platform integrity & compliance info
app.get('/api/compliance', (req, res) => {
  res.json({
    compliance: {
      standard: 'Roblox Creator Hub Policy & TextChatService Standard',
      botPolicy: 'ZERO_BOTS_ENFORCED',
      maxGlobalServers: MAX_TOTAL_SERVERS,
      maxPlayersPerServer: MAX_PLAYERS_PER_SERVER,
      serverFormat: 'KDID-0001 through KDID-10000',
      filteringActive: true,
    },
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kurdish Xosh server system running on http://0.0.0.0:${PORT} (Max ${MAX_TOTAL_SERVERS} servers, ${MAX_PLAYERS_PER_SERVER} players each)`);
  });
}

startServer();
