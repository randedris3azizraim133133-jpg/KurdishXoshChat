export type Language = 'ckb' | 'en' | 'ar';

export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface RobloxAccount {
  id: number;
  name: string;
  displayName: string;
  avatarUrl: string;
}

export interface UserProfile {
  appId: string; // Unique persistent companion App ID
  robloxUsername: string; // Real verified Roblox username
  robloxDisplayName: string;
  robloxId: string;
  robloxAvatarUrl: string; // Official Roblox headshot thumbnail
  isLookupVerified: boolean; // Account exists on Roblox public API
  isOwnershipVerified: boolean; // Explicit in-game verification code confirmed
  verificationCode: string; // Code to confirm in Kurdish Xosh
  authToken: string; // Prevents impersonation
}

export interface KDIDRoom {
  kdidCode: string; // Format: KDID-0001 to KDID-10000
  serverNumber: number; // 1 to 10000
  name: string;
  robloxServerName: string;
  robloxPlaceId: string;
  activePlayers: number; // Real players (max 52)
  maxPlayers: number; // 52
  isFull: boolean;
  description: string;
  isOfficial: boolean;
  createdAt: number;
}

export interface ServerSystemStats {
  totalServers: number;
  maxTotalServers: number; // 10000
  maxPlayersPerServer: number; // 52
  allServersFull: boolean;
}

export interface ChatMessage {
  id: string;
  kdidCode: string;
  senderAppId: string;
  senderRobloxUsername: string;
  senderRobloxDisplayName: string;
  senderRobloxId: string;
  senderRobloxAvatar: string;
  isOwnershipVerified: boolean;
  text: string;
  lang: Language;
  timestamp: string;
  filtered: boolean;
  isSelf?: boolean;
}

export interface PermissionSettings {
  notifications: boolean;
  overlay: boolean;
  haptics: boolean;
  telemetryDisabled: boolean;
}

export interface ModerationSettings {
  filterLevel: 'strict' | 'standard';
  autoFlagSpam: boolean;
  blockedUsers: string[];
}

export interface AbuseReport {
  id: string;
  messageId: string;
  reportedUser: string;
  reportedAppId?: string;
  reason: string;
  timestamp: string;
}
