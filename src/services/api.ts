import { KDIDRoom, ChatMessage, RobloxAccount, ServerSystemStats } from '../types';

export const api = {
  async lookupRobloxUser(username: string): Promise<RobloxAccount> {
    const res = await fetch(`/api/roblox/user/${encodeURIComponent(username.trim())}`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Roblox account lookup failed');
    }
    return data.user;
  },

  async fetchRooms(): Promise<{ stats: ServerSystemStats; rooms: KDIDRoom[] }> {
    const res = await fetch('/api/rooms');
    if (!res.ok) throw new Error('Failed to fetch rooms');
    const data = await res.json();
    return {
      stats: data.stats || {
        totalServers: data.rooms?.length || 0,
        maxTotalServers: 10000,
        maxPlayersPerServer: 52,
        allServersFull: false,
      },
      rooms: data.rooms || [],
    };
  },

  async createRoom(name?: string, description?: string): Promise<KDIDRoom> {
    const res = await fetch('/api/rooms/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to create server');
    }
    return data.room;
  },

  async findAvailableRoom(): Promise<KDIDRoom> {
    const res = await fetch('/api/rooms/find-available');
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'No available servers found');
    }
    return data.room;
  },

  async joinRoom(kdid: string, appId: string): Promise<KDIDRoom> {
    const res = await fetch(`/api/rooms/${encodeURIComponent(kdid)}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appId }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      const err: any = new Error(data.message || 'Failed to join server');
      err.code = data.code;
      err.activePlayers = data.activePlayers;
      err.maxPlayers = data.maxPlayers;
      throw err;
    }
    return data.room;
  },

  async leaveRoom(kdid: string, appId: string): Promise<void> {
    await fetch(`/api/rooms/${encodeURIComponent(kdid)}/leave`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appId }),
    });
  },

  async fetchRoomMessages(kdid: string): Promise<ChatMessage[]> {
    const res = await fetch(`/api/rooms/${encodeURIComponent(kdid)}/messages`);
    if (!res.ok) throw new Error('Failed to fetch room messages');
    const data = await res.json();
    return data.messages || [];
  },

  async sendRoomMessage(
    kdid: string,
    payload: {
      senderAppId: string;
      senderRobloxUsername: string;
      senderRobloxDisplayName: string;
      senderRobloxId: string;
      senderRobloxAvatar: string;
      isOwnershipVerified: boolean;
      text: string;
      lang: string;
      authToken: string;
    }
  ): Promise<ChatMessage> {
    const res = await fetch(`/api/rooms/${encodeURIComponent(kdid)}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to send message');
    }
    return data.message;
  },

  async reportAbuse(payload: {
    messageId?: string;
    reportedUser: string;
    reportedAppId?: string;
    reason: string;
  }): Promise<void> {
    const res = await fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to submit report');
    }
  },
};
