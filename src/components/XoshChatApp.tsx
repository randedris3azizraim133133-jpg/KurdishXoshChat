import React, { useState, useEffect, useRef } from 'react';
import {
  Language,
  KDIDRoom,
  UserProfile,
  ChatMessage,
  PermissionSettings,
  ModerationSettings,
} from '../types';
import { translations } from '../locales/i18n';
import { api } from '../services/api';
import {
  MessageSquare,
  Minimize2,
  Server,
  User,
  ShieldCheck,
  Flag,
  UserX,
  Send,
  AlertTriangle,
  RefreshCw,
  CheckCheck,
  Edit3,
  Layers,
  ChevronDown,
  Info,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface XoshChatAppProps {
  language: Language;
  currentRoom: KDIDRoom;
  userProfile: UserProfile;
  permissionSettings: PermissionSettings;
  moderationSettings: ModerationSettings;
  onOpenKDIDRooms: () => void;
  onOpenProfile: () => void;
  onBlockUser: (user: string) => void;
  onOpenReportModal: (messageId: string, reportedUser: string, reportedAppId?: string) => void;
  onOpenPermissions: () => void;
}

export const XoshChatApp: React.FC<XoshChatAppProps> = ({
  language,
  currentRoom,
  userProfile,
  permissionSettings,
  moderationSettings,
  onOpenKDIDRooms,
  onOpenProfile,
  onBlockUser,
  onOpenReportModal,
  onOpenPermissions,
}) => {
  const t = translations[language];

  const [isBubbleOpen, setIsBubbleOpen] = useState<boolean>(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [rateLimitError, setRateLimitError] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick greetings for Kurdish Xosh players
  const quickPhrases = [
    { text: 'سڵاو لە هەمووان لە قەڵای هەولێر! 🏰', lang: 'ckb' },
    { text: `سڵاو لە ژووری ${currentRoom.kdidCode}! ✨`, lang: 'ckb' },
    { text: 'وەرن با یاری بکەین پێکەوە! 🎮', lang: 'ckb' },
    { text: `مرحباً بكم في غرفة ${currentRoom.kdidCode} 👋`, lang: 'ar' },
    { text: `Ready to play in room ${currentRoom.kdidCode}!`, lang: 'en' },
  ];

  // Fetch real messages for the current KDID room (ZERO BOTS)
  const refreshRoomMessages = () => {
    api
      .fetchRoomMessages(currentRoom.kdidCode)
      .then((data) => {
        setMessages(data || []);
      })
      .catch(() => {
        setMessages([]);
      });
  };

  useEffect(() => {
    refreshRoomMessages();
    // Poll for real-time room updates from real players every 3.5 seconds
    const interval = setInterval(refreshRoomMessages, 3500);
    return () => clearInterval(interval);
  }, [currentRoom.kdidCode]);

  // Scroll to bottom
  useEffect(() => {
    if (isBubbleOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isBubbleOpen]);

  // Send real message (Strictly no bot replies generated)
  const handleSendMessage = async (textToSend?: string) => {
    const content = (textToSend || inputText).trim();
    if (!content) return;

    if (!userProfile.robloxUsername) {
      onOpenProfile();
      return;
    }

    if (content.length > 280) {
      setRateLimitError('Message exceeds maximum 280 characters.');
      return;
    }

    setIsSending(true);
    setRateLimitError('');

    try {
      const newMsg = await api.sendRoomMessage(currentRoom.kdidCode, {
        senderAppId: userProfile.appId,
        senderRobloxUsername: userProfile.robloxUsername,
        senderRobloxDisplayName: userProfile.robloxDisplayName || userProfile.robloxUsername,
        senderRobloxId: userProfile.robloxId,
        senderRobloxAvatar: userProfile.robloxAvatarUrl,
        isOwnershipVerified: userProfile.isOwnershipVerified,
        text: content,
        lang: language,
        authToken: userProfile.authToken,
      });

      setMessages((prev) => [...prev, newMsg]);
      if (!textToSend) setInputText('');
    } catch (err: any) {
      setRateLimitError(err.message || t.rateLimitWarning);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Room Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenKDIDRooms}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-colors"
            title="Switch KDID Room"
          >
            <Server className="w-4 h-4 text-emerald-700" />
            <div className="text-start">
              <span className="text-[10px] font-bold text-emerald-700 block uppercase">
                {t.currentRoomLabel}
              </span>
              <span className="text-sm font-extrabold font-mono text-emerald-950 block">
                {currentRoom.kdidCode} ({currentRoom.activePlayers}/52)
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-emerald-600 ms-1" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 block">
                {currentRoom.name}
              </span>
              {currentRoom.activePlayers >= 52 ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                  {t.serverFullBadge}
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {currentRoom.activePlayers}/52 Players
                </span>
              )}
            </div>
            <span className="text-xs text-slate-500 block">
              {currentRoom.activePlayers >= 52 ? t.serverFullError : `Capacity: ${currentRoom.activePlayers} of 52 players connected`}
            </span>
          </div>
        </div>

        {/* User Roblox Identity Bar */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 p-1.5 pe-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
            title={t.changeProfile}
          >
            <div className="relative">
              <img
                src={
                  userProfile.robloxAvatarUrl ||
                  'https://www.roblox.com/headshot-thumbnail/image?userId=1&width=150&height=150&format=png'
                }
                alt={userProfile.robloxUsername || 'Roblox User'}
                className="w-8 h-8 rounded-xl object-cover border border-emerald-300 bg-white"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://www.roblox.com/headshot-thumbnail/image?userId=1&width=150&height=150&format=png';
                }}
              />
              {userProfile.isOwnershipVerified && (
                <span className="absolute -top-1 -end-1 w-3.5 h-3.5 rounded-full bg-emerald-600 border border-white text-white text-[8px] flex items-center justify-center font-bold">
                  ✓
                </span>
              )}
            </div>

            <div className="text-start">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {userProfile.robloxDisplayName || userProfile.robloxUsername || 'Connect Roblox User'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 block">
                @{userProfile.robloxUsername || 'guest'} · {userProfile.appId}
              </span>
            </div>
            <Edit3 className="w-3.5 h-3.5 text-slate-400 ms-1" />
          </button>

          {/* Permissions / Overlay Mode */}
          <button
            onClick={onOpenPermissions}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            title="Permissions & Overlay Mode"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Bubble Screen Simulator */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-300/80 bg-slate-900 shadow-xl min-h-[620px] flex flex-col justify-end p-4 sm:p-6">
        
        {/* Background Roblox Game Canvas Simulation */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900 opacity-95 pointer-events-none" />
        
        {/* In-game HUD element showing current KDID room */}
        <div className="absolute top-4 start-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-white text-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-emerald-400 font-mono">
            {currentRoom.kdidCode} ({currentRoom.activePlayers}/52)
          </span>
          <span className="text-white/60">·</span>
          <span>Kurdish Xosh Experience</span>
        </div>

        {/* Floating Bubble Window */}
        {isBubbleOpen ? (
          <div className="relative z-20 w-full max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col h-[520px] overflow-hidden animate-bubble">
            
            {/* Window Header */}
            <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <img
                  src={
                    userProfile.robloxAvatarUrl ||
                    'https://www.roblox.com/headshot-thumbnail/image?userId=1&width=150&height=150&format=png'
                  }
                  alt={userProfile.robloxUsername}
                  className="w-8 h-8 rounded-xl object-cover border border-emerald-400/50 bg-white"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://www.roblox.com/headshot-thumbnail/image?userId=1&width=150&height=150&format=png';
                  }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {userProfile.robloxDisplayName || userProfile.robloxUsername}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      {currentRoom.kdidCode} ({currentRoom.activePlayers}/52)
                    </span>
                    {userProfile.isOwnershipVerified && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-700 text-white font-bold">
                        Verified
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 block">
                    @{userProfile.robloxUsername} · {userProfile.appId}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={onOpenProfile}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
                  title={t.changeProfile}
                >
                  <User className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsBubbleOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
                  title={t.minimizeBubble}
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bubble Messages Feed (Zero Bots - Real Messages Only) */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {messages.length === 0 ? (
                <div className="text-center py-16 text-slate-400 text-xs space-y-2">
                  <MessageSquare className="w-9 h-9 mx-auto opacity-30 text-emerald-600" />
                  <p className="font-medium text-slate-600">{t.noMessagesInRoom}</p>
                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                    {t.zeroBotsNotice}
                  </p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isBlocked = moderationSettings.blockedUsers.includes(msg.senderRobloxUsername);
                  if (isBlocked) {
                    return (
                      <div key={msg.id} className="text-center py-1 text-[11px] text-slate-400 italic">
                        User blocked (@{msg.senderRobloxUsername})
                      </div>
                    );
                  }

                  const isSelf = msg.senderAppId === userProfile.appId || msg.isSelf;

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2.5 group ${isSelf ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {/* Sender Official Roblox Headshot Avatar */}
                      <img
                        src={
                          msg.senderRobloxAvatar ||
                          'https://www.roblox.com/headshot-thumbnail/image?userId=1&width=150&height=150&format=png'
                        }
                        alt={msg.senderRobloxUsername}
                        className="w-8 h-8 rounded-xl object-cover bg-white border border-slate-200 shadow-xs shrink-0"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            'https://www.roblox.com/headshot-thumbnail/image?userId=1&width=150&height=150&format=png';
                        }}
                      />

                      {/* Bubble content */}
                      <div className={`max-w-[78%] flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}>
                        
                        {/* Header: Roblox Username & verification tag */}
                        <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px]">
                          <span className="font-bold text-slate-900">
                            {msg.senderRobloxDisplayName || msg.senderRobloxUsername}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            @{msg.senderRobloxUsername}
                          </span>
                          
                          {msg.isOwnershipVerified && (
                            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded border border-emerald-200">
                              ✓ Verified
                            </span>
                          )}

                          {!isSelf && (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 ms-1">
                              <button
                                onClick={() =>
                                  onOpenReportModal(msg.id, msg.senderRobloxUsername, msg.senderAppId)
                                }
                                className="p-0.5 text-slate-400 hover:text-rose-600 rounded"
                                title={t.reportUserBtn}
                              >
                                <Flag className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => onBlockUser(msg.senderRobloxUsername)}
                                className="p-0.5 text-slate-400 hover:text-slate-700 rounded"
                                title={t.blockUserBtn}
                              >
                                <UserX className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Rounded Message Bubble */}
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                            isSelf
                              ? 'bg-emerald-600 text-white rounded-br-xs'
                              : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs'
                          }`}
                          dir={msg.lang === 'ckb' || msg.lang === 'ar' ? 'rtl' : 'ltr'}
                        >
                          <p className="break-words">{msg.text}</p>
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-1 mt-0.5 px-1 text-[10px] text-slate-400">
                          <span>{msg.timestamp}</span>
                          {msg.filtered && (
                            <span className="text-amber-600 font-medium">· Filtered</span>
                          )}
                          {isSelf && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Greetings Chips */}
            <div className="px-3 py-1.5 bg-slate-100 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {quickPhrases.map((phrase, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(phrase.text)}
                  className="px-2.5 py-0.5 rounded-full text-[11px] bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 whitespace-nowrap shrink-0 transition-colors"
                >
                  {phrase.text}
                </button>
              ))}
            </div>

            {/* Message Input Bar */}
            <div className="p-2.5 bg-white border-t border-slate-200 shrink-0">
              {rateLimitError && (
                <div className="px-3 py-1 mb-1.5 text-xs text-rose-600 bg-rose-50 rounded-lg flex items-center gap-1 font-medium">
                  <AlertTriangle className="w-3 h-3 shrink-0" />
                  <span>{rateLimitError}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    userProfile.robloxUsername
                      ? t.typeMessagePlaceholder
                      : 'Please connect your Roblox username first...'
                  }
                  maxLength={280}
                  className="flex-1 px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none placeholder:text-slate-400"
                />

                <span className="text-[10px] text-slate-400 font-mono px-1 hidden sm:inline">
                  {inputText.length}/280
                </span>

                <button
                  onClick={() => handleSendMessage()}
                  disabled={isSending || !inputText.trim()}
                  className="h-9 px-4 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-40 transition-all flex items-center gap-1 shadow-xs"
                >
                  {isSending ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                  )}
                  <span>{t.sendBtn}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Minimized Bubble */
          <div className="relative z-20 flex justify-end">
            <button
              onClick={() => setIsBubbleOpen(true)}
              className="p-3 rounded-full bg-emerald-600 text-white shadow-2xl hover:bg-emerald-500 active:scale-95 transition-all flex items-center gap-2 border-2 border-white group"
              title={t.expandBubble}
            >
              <img
                src={
                  userProfile.robloxAvatarUrl ||
                  'https://www.roblox.com/headshot-thumbnail/image?userId=1&width=150&height=150&format=png'
                }
                alt={userProfile.robloxUsername}
                className="w-7 h-7 rounded-full object-cover border border-white bg-white"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://www.roblox.com/headshot-thumbnail/image?userId=1&width=150&height=150&format=png';
                }}
              />
              <span className="text-xs font-bold font-mono pe-1">
                {currentRoom.kdidCode} ({currentRoom.activePlayers}/52)
              </span>
              <MessageSquare className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Fallback Notice */}
      <div className="mt-4 p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800 block mb-0.5">
            {language === 'ckb' ? 'پارێزراوی و شێوازی بڵق:' : language === 'ar' ? 'الخصوصية والنافذة العائمة:' : 'Overlay Privacy & Zero-Bots Standard:'}
          </span>
          {t.overlayNotSupportedNotice}
        </div>
      </div>
    </div>
  );
};
