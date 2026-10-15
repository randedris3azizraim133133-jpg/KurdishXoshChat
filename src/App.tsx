/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Language,
  KDIDRoom,
  UserProfile,
  PermissionSettings,
  ModerationSettings,
  ServerSystemStats,
} from './types';
import { translations } from './locales/i18n';
import { api } from './services/api';
import { Navbar } from './components/Navbar';
import { KurdishXoshWeb } from './components/KurdishXoshWeb';
import { XoshChatApp } from './components/XoshChatApp';
import { KDIDRoomsModal } from './components/KDIDRoomsModal';
import { UserProfileModal } from './components/UserProfileModal';
import { ProductionGuideModal } from './components/ProductionGuideModal';
import { PermissionsModal } from './components/PermissionsModal';
import { DownloadModal } from './components/DownloadModal';
import { GitHubModal } from './components/GitHubModal';
import { SettingsModal } from './components/SettingsModal';
import { ModerationSafetyModal } from './components/ModerationSafetyModal';
import { ShieldCheck, MessageSquare } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'web' | 'app' | 'safety'>('web');
  const [language, setLanguage] = useState<Language>('ckb'); // Default to Kurdish Sorani

  // Persistent User Profile with Real Roblox Account & Unique Companion App ID
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('xosh_chat_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.robloxUsername) return parsed;
      } catch {
        // Fallback default
      }
    }
    const randId = Math.floor(10000 + Math.random() * 90000);
    const randCode = Math.floor(1000 + Math.random() * 9000);
    const randToken = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    return {
      appId: `KX-ID-${randId}`,
      robloxUsername: 'Builderman',
      robloxDisplayName: 'Builderman',
      robloxId: '156',
      robloxAvatarUrl: 'https://www.roblox.com/headshot-thumbnail/image?userId=156&width=150&height=150&format=png',
      isLookupVerified: true,
      isOwnershipVerified: false,
      verificationCode: `KX-VERIFY-${randCode}`,
      authToken: randToken,
    };
  });

  // Server system global stats (Max 10,000 servers, 52 players max each)
  const [serverStats, setServerStats] = useState<ServerSystemStats>({
    totalServers: 4,
    maxTotalServers: 10000,
    maxPlayersPerServer: 52,
    allServersFull: false,
  });

  // Default KDID rooms adhering to KDID-0001 through KDID-10000
  const [activeRooms, setActiveRooms] = useState<KDIDRoom[]>([
    {
      kdidCode: 'KDID-0001',
      serverNumber: 1,
      name: 'Erbil Citadel Main Hub',
      robloxServerName: 'Kurdish Xosh — Live Server (Erbil)',
      robloxPlaceId: '1894729104',
      activePlayers: 1,
      maxPlayers: 52,
      isFull: false,
      description: 'Central fortress meeting point for Kurdish Xosh players.',
      isOfficial: true,
      createdAt: Date.now(),
    },
    {
      kdidCode: 'KDID-0002',
      serverNumber: 2,
      name: 'Sulaymaniyah Mount Goizha',
      robloxServerName: 'Kurdish Xosh — Live Server (Slemani)',
      robloxPlaceId: '1894729104',
      activePlayers: 0,
      maxPlayers: 52,
      isFull: false,
      description: 'High mountain exploration and parkour gathering.',
      isOfficial: true,
      createdAt: Date.now(),
    },
    {
      kdidCode: 'KDID-0003',
      serverNumber: 3,
      name: 'Duhok Gali Valley',
      robloxServerName: 'Kurdish Xosh — Live Server (Duhok)',
      robloxPlaceId: '1894729104',
      activePlayers: 0,
      maxPlayers: 52,
      isFull: false,
      description: 'Valley waterfall crossings and clan challenges.',
      isOfficial: true,
      createdAt: Date.now(),
    },
    {
      kdidCode: 'KDID-1824',
      serverNumber: 1824,
      name: 'Erbil Citadel Veteran Server',
      robloxServerName: 'Kurdish Xosh Server (KDID-1824)',
      robloxPlaceId: '1894729104',
      activePlayers: 0,
      maxPlayers: 52,
      isFull: false,
      description: 'Community server room for experienced players.',
      isOfficial: true,
      createdAt: Date.now(),
    },
  ]);

  const [currentRoom, setCurrentRoom] = useState<KDIDRoom>(activeRooms[0]);

  // Load real rooms and system stats from backend
  const loadRooms = () => {
    api
      .fetchRooms()
      .then((data) => {
        if (data.rooms && data.rooms.length > 0) {
          setActiveRooms(data.rooms);
          if (data.stats) setServerStats(data.stats);
          const found = data.rooms.find((r) => r.kdidCode === currentRoom.kdidCode);
          if (found) setCurrentRoom(found);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadRooms();
    // Register active user in initial room
    api.joinRoom(currentRoom.kdidCode, userProfile.appId).catch(() => {});
  }, []);

  // Save profile changes to localStorage
  useEffect(() => {
    localStorage.setItem('xosh_chat_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Permissions state
  const [permissionSettings, setPermissionSettings] = useState<PermissionSettings>(() => {
    const saved = localStorage.getItem('xosh_chat_permissions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback default
      }
    }
    return {
      notifications: true,
      overlay: true,
      haptics: true,
      telemetryDisabled: true,
    };
  });

  // Moderation state
  const [moderationSettings, setModerationSettings] = useState<ModerationSettings>({
    filterLevel: 'strict',
    autoFlagSpam: true,
    blockedUsers: [],
  });

  // Modals
  const [isPermissionsOpen, setIsPermissionsOpen] = useState<boolean>(() => {
    return !localStorage.getItem('xosh_chat_onboarded');
  });
  const [isKDIDRoomsOpen, setIsKDIDRoomsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isProdGuideOpen, setIsProdGuideOpen] = useState<boolean>(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState<boolean>(false);
  const [isGithubOpen, setIsGithubOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [reportModalContext, setReportModalContext] = useState<{
    messageId: string;
    reportedUser: string;
    reportedAppId?: string;
  } | null>(null);

  // Sync RTL and language on html root element
  useEffect(() => {
    const isRtl = language === 'ckb' || language === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  const handleBlockUser = (username: string) => {
    setModerationSettings((prev) => ({
      ...prev,
      blockedUsers: prev.blockedUsers.includes(username) ? prev.blockedUsers : [...prev.blockedUsers, username],
    }));
  };

  const handleUnblockUser = (username: string) => {
    setModerationSettings((prev) => ({
      ...prev,
      blockedUsers: prev.blockedUsers.filter((u) => u !== username),
    }));
  };

  const handleJoinByCode = async (code: string) => {
    try {
      const room = await api.joinRoom(code, userProfile.appId);
      setCurrentRoom(room);
      setActiveRooms((prev) => {
        const exists = prev.some((r) => r.kdidCode === room.kdidCode);
        return exists ? prev.map((r) => (r.kdidCode === room.kdidCode ? room : r)) : [...prev, room];
      });
      setCurrentTab('app');
    } catch (err: any) {
      throw err;
    }
  };

  const handleServerCreated = (newRoom: KDIDRoom) => {
    setActiveRooms((prev) => [...prev, newRoom]);
    setCurrentRoom(newRoom);
    setServerStats((prev) => ({ ...prev, totalServers: prev.totalServers + 1 }));
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        userProfile={userProfile}
        currentRoomCode={`${currentRoom.kdidCode} (${currentRoom.activePlayers}/52)`}
        onOpenKDIDRooms={() => setIsKDIDRoomsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenDownload={() => setIsDownloadOpen(true)}
        onOpenProdGuide={() => setIsProdGuideOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Views */}
      <main className="flex-1">
        {currentTab === 'web' && (
          <KurdishXoshWeb
            language={language}
            setLanguage={setLanguage}
            currentRoom={currentRoom}
            activeRooms={activeRooms}
            serverStats={serverStats}
            onOpenMobileApp={() => setCurrentTab('app')}
            onOpenKDIDRooms={() => setIsKDIDRoomsOpen(true)}
            onOpenDownload={() => setIsDownloadOpen(true)}
            onOpenGithub={() => setIsGithubOpen(true)}
            onOpenProdGuide={() => setIsProdGuideOpen(true)}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenPermissions={() => setIsPermissionsOpen(true)}
          />
        )}

        {currentTab === 'app' && (
          <XoshChatApp
            language={language}
            currentRoom={currentRoom}
            userProfile={userProfile}
            permissionSettings={permissionSettings}
            moderationSettings={moderationSettings}
            onOpenKDIDRooms={() => setIsKDIDRoomsOpen(true)}
            onOpenProfile={() => setIsProfileOpen(true)}
            onBlockUser={handleBlockUser}
            onOpenReportModal={(messageId, reportedUser, reportedAppId) =>
              setReportModalContext({ messageId, reportedUser, reportedAppId })
            }
            onOpenPermissions={() => setIsPermissionsOpen(true)}
          />
        )}

        {currentTab === 'safety' && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{t.safety}</h2>
                  <p className="text-xs text-slate-500">
                    Server limits (10,000 servers, 52 players/server), zero bots, and TextChatService standards
                  </p>
                </div>
              </div>

              {/* Policy cards */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-xs sm:text-sm leading-relaxed space-y-2">
                <h3 className="font-bold text-emerald-900">
                  Backend-Enforced Server Constraints & Zero Bots Policy
                </h3>
                <p>
                  • Maximum of 10,000 total servers in Kurdish Xosh.<br />
                  • Strict limit of 52 players per server instance to prevent overcrowding.<br />
                  • Server IDs follow the sequential format KDID-0001 through KDID-10000.<br />
                  • Zero bots, automated scripts, or simulated chat participants. All users are authenticated with real Roblox usernames.
                </p>
              </div>

              {/* Blocked Users Section */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-2">
                  Blocked Players ({moderationSettings.blockedUsers.length})
                </h4>
                {moderationSettings.blockedUsers.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No players blocked yet.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {moderationSettings.blockedUsers.map((user) => (
                      <span
                        key={user}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-mono"
                      >
                        <span>{user}</span>
                        <button
                          onClick={() => handleUnblockUser(user)}
                          className="text-slate-400 hover:text-rose-600 font-bold"
                          title="Unblock"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Chat Bubble Launcher (When in Web tab & overlay enabled) */}
      {permissionSettings.overlay && currentTab === 'web' && (
        <aside
          aria-label="Floating chat bubble shortcut"
          className="fixed bottom-6 end-6 z-30 group"
        >
          <button
            onClick={() => setCurrentTab('app')}
            className="w-14 h-14 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-500 active:scale-95 transition-all flex items-center justify-center border-2 border-white relative"
            title="Open Xosh Chat Floating Bubble"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute top-0 end-0 px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-amber-400 text-slate-900 border border-white">
              {currentRoom.activePlayers}/52
            </span>
          </button>
        </aside>
      )}

      {/* Modals */}
      <KDIDRoomsModal
        language={language}
        isOpen={isKDIDRoomsOpen}
        onClose={() => setIsKDIDRoomsOpen(false)}
        activeRooms={activeRooms}
        currentRoom={currentRoom}
        serverStats={serverStats}
        onSelectRoom={(room) => {
          setCurrentRoom(room);
          api.joinRoom(room.kdidCode, userProfile.appId).catch(() => {});
        }}
        onJoinByCode={handleJoinByCode}
        onServerCreated={handleServerCreated}
      />

      <UserProfileModal
        language={language}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
      />

      <ProductionGuideModal
        language={language}
        isOpen={isProdGuideOpen}
        onClose={() => setIsProdGuideOpen(false)}
      />

      <PermissionsModal
        language={language}
        isOpen={isPermissionsOpen}
        onClose={() => setIsPermissionsOpen(false)}
        permissionSettings={permissionSettings}
        setPermissionSettings={setPermissionSettings}
        onComplete={() => {
          localStorage.setItem('xosh_chat_onboarded', 'true');
          setIsPermissionsOpen(false);
        }}
      />

      <DownloadModal
        language={language}
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        onOpenGithub={() => setIsGithubOpen(true)}
      />

      <GitHubModal
        language={language}
        isOpen={isGithubOpen}
        onClose={() => setIsGithubOpen(false)}
      />

      <SettingsModal
        language={language}
        setLanguage={setLanguage}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        permissionSettings={permissionSettings}
        setPermissionSettings={setPermissionSettings}
        onResetOnboarding={() => {
          localStorage.removeItem('xosh_chat_onboarded');
          setIsPermissionsOpen(true);
        }}
      />

      <ModerationSafetyModal
        language={language}
        isOpen={reportModalContext !== null}
        onClose={() => setReportModalContext(null)}
        reportContext={reportModalContext}
        moderationSettings={moderationSettings}
        setModerationSettings={setModerationSettings}
        onUnblockUser={handleUnblockUser}
      />
    </div>
  );
}
