import React from 'react';
import { Language, KDIDRoom, ServerSystemStats } from '../types';
import { translations } from '../locales/i18n';
import {
  MessageSquare,
  Smartphone,
  ShieldCheck,
  Download,
  Github,
  Globe2,
  Users,
  Server,
  Layers,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Gamepad2,
  Compass,
  Cpu,
  AlertTriangle
} from 'lucide-react';
import bannerImg from '../assets/images/kurdish_xosh_banner_1792064897965.jpg';
import logoImg from '../assets/images/xosh_chat_logo_1792064902329.jpg';

interface KurdishXoshWebProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentRoom: KDIDRoom;
  activeRooms: KDIDRoom[];
  serverStats?: ServerSystemStats;
  onOpenMobileApp: () => void;
  onOpenKDIDRooms: () => void;
  onOpenDownload: () => void;
  onOpenGithub: () => void;
  onOpenProdGuide: () => void;
  onOpenProfile: () => void;
  onOpenPermissions: () => void;
}

export const KurdishXoshWeb: React.FC<KurdishXoshWebProps> = ({
  language,
  setLanguage,
  currentRoom,
  activeRooms,
  serverStats,
  onOpenMobileApp,
  onOpenKDIDRooms,
  onOpenDownload,
  onOpenGithub,
  onOpenProdGuide,
  onOpenProfile,
  onOpenPermissions,
}) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-950 text-white">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 relative z-10">
          
          {/* Top Bar inside Hero */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-emerald-800/40">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Xosh Chat Logo"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-2xl object-cover border border-emerald-400/40 shadow-lg"
              />
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight block">
                  {t.webHeroTitle}
                </span>
                <span className="text-xs font-medium text-emerald-400 block">
                  Roblox Kurdish Xosh · 10,000 Servers System
                </span>
              </div>
            </div>

            {/* Language & Actions */}
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 bg-black/40 backdrop-blur-md rounded-xl text-xs font-semibold border border-white/10">
                <button
                  onClick={() => setLanguage('ckb')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    language === 'ckb' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  کوردی (سۆرانی)
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    language === 'en' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('ar')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    language === 'ar' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  العربية
                </button>
              </div>

              <button
                onClick={onOpenProdGuide}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-200 bg-emerald-800/60 hover:bg-emerald-700/80 border border-emerald-600/40 transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.productionGuide}</span>
              </button>
            </div>
          </div>

          {/* Main Hero Split Grid */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>{t.serverCapacitySpec}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {language === 'ckb' ? (
                  <>
                    سیستەمی سێرڤەرەکانی <span className="text-emerald-400">کوردیش خۆش</span> و چاتی بڵقی
                  </>
                ) : language === 'ar' ? (
                  <>
                    نظام خوادم <span className="text-emerald-400">كوردیش خوش</span> والدردشة الفقاعية
                  </>
                ) : (
                  <>
                    Kurdish Xosh <span className="text-emerald-400">10,000 Servers System</span> & Chat
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {t.webHeroSubtitle}
              </p>

              {/* Server Code Callout Pill with (X/52) format */}
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                    {t.currentRoomLabel}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-2xl font-black font-mono text-white tracking-wider">
                      {currentRoom.kdidCode}
                    </span>
                    <span className="text-sm font-mono font-bold px-2.5 py-0.5 rounded-lg bg-emerald-500/30 text-emerald-300 border border-emerald-400/30">
                      {currentRoom.kdidCode} ({currentRoom.activePlayers}/52)
                    </span>
                  </div>
                  <span className="text-xs text-slate-300 block mt-1">
                    {currentRoom.name} · {t.serverFormatExplainer}
                  </span>
                </div>

                <button
                  onClick={onOpenKDIDRooms}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>{t.webExploreRoomsCta}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                
                {/* Launch Mobile App Simulation */}
                <button
                  onClick={onOpenMobileApp}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-400/20 active:scale-98 transition-all flex items-center gap-2"
                >
                  <Smartphone className="w-4 h-4 text-slate-950" />
                  <span>{t.openMobileAppCta}</span>
                </button>

                {/* Download Xosh Chat Button */}
                <button
                  onClick={onOpenDownload}
                  className="px-5 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>{t.download}</span>
                </button>

                {/* View on GitHub */}
                <button
                  onClick={onOpenGithub}
                  className="px-4 py-3.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </button>
              </div>
            </div>

            {/* Right Graphic Preview (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl bg-slate-900 group">
                <img
                  src={bannerImg}
                  alt="Kurdish Xosh Roblox Citadel"
                  referrerPolicy="no-referrer"
                  className="w-full h-84 object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                
                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Floating Chat Bubble Mockup on the banner */}
                <div className="absolute bottom-4 start-4 end-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md text-slate-900 shadow-xl border border-white/80">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-900 font-mono">
                        {currentRoom.kdidCode} ({currentRoom.activePlayers}/52)
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {t.zeroBotsBadge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://www.roblox.com/headshot-thumbnail/image?userId=156&width=150&height=150&format=png"
                      alt="Builderman"
                      className="w-8 h-8 rounded-xl object-cover bg-white border border-slate-200 shrink-0"
                    />
                    <div className="text-xs text-slate-700 leading-snug">
                      <span className="font-bold text-emerald-800">Builderman (@Builderman):</span>{' '}
                      {language === 'ckb'
                        ? `بەخێربێن بۆ سێرڤەری ${currentRoom.kdidCode} (${currentRoom.activePlayers}/52)!`
                        : language === 'ar'
                        ? `أهلاً بكم في خادم ${currentRoom.kdidCode} (${currentRoom.activePlayers}/52)!`
                        : `Welcome to server ${currentRoom.kdidCode} (${currentRoom.activePlayers}/52)!`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Detailed Server System Specifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              {t.whatIsXoshChatTitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t.webExplanationTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              {t.webExplanationText}
            </p>
          </div>

          {/* 3 Pillars Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            
            {/* Pillar 1: Up to 10,000 servers */}
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100 hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {t.featureKdidTitle}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {t.featureKdidDesc}
              </p>
            </div>

            {/* Pillar 2: 52 Players Cap */}
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100 hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                52 Players Max / Server
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                When a server reaches capacity (52/52), the backend automatically blocks overfilling and provides an open server.
              </p>
            </div>

            {/* Pillar 3: Real Roblox Avatars & Zero Bots */}
            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100 hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {t.featureSafetyTitle}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {t.featureSafetyDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Active KDID Servers Explorer with (X/52) Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
              {language === 'ckb' ? 'سێرڤەرەکانی ناو یاری' : language === 'ar' ? 'الخوادم المتاحة' : 'In-Game Servers'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              {t.activeRoomsList} ({activeRooms.length} / 10,000 Active)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenKDIDRooms}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
            >
              <span>{t.enterKdidCodeLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeRooms.map((room) => {
            const isSelected = room.kdidCode === currentRoom.kdidCode;
            const isFull = room.activePlayers >= 52 || room.isFull;

            return (
              <div
                key={room.kdidCode}
                className={`p-6 rounded-3xl border transition-all ${
                  isFull
                    ? 'bg-slate-50 border-slate-200 opacity-80'
                    : isSelected
                    ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-white border-slate-200 hover:border-emerald-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-extrabold font-mono text-emerald-800 px-3 py-1 bg-emerald-50 rounded-xl border border-emerald-200/60">
                    {room.kdidCode}
                  </span>
                  
                  {/* (X/52) Player Count Badge */}
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 ${
                      isFull
                        ? 'bg-rose-100 text-rose-800'
                        : room.activePlayers > 40
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{room.kdidCode} ({room.activePlayers}/52)</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {room.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {room.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Place ID: {room.robloxPlaceId}
                  </span>
                  
                  {isFull ? (
                    <span className="text-xs font-bold text-rose-700">
                      {t.serverFullBadge}
                    </span>
                  ) : (
                    <button
                      onClick={onOpenMobileApp}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
                    >
                      {language === 'ckb' ? 'چوونە ژوور' : language === 'ar' ? 'دخول الخادم' : 'Join'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Compliance Guarantee */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs sm:text-sm text-emerald-950 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-emerald-900">
              Roblox Creator Hub Policy & Server Integrity:
            </span>{' '}
            {language === 'ckb'
              ? 'کوردیش خۆش بە تەواوی ڕێز لە یاساکانی ڕۆبڵۆکس دەگرێت. سێرڤەرەکان تا ١٠،٠٠٠ ژوور و ٥٢ یاریزان بە شێوازی یاسایی پشتیوانی دەکرێن بەبێ دەستکاری نایاسایی ڕۆبڵۆکس.'
              : language === 'ar'
              ? 'يتوافق التطبيق قانونياً مع قواعد منصة روبلوكس، مع دعم 10,000 خادم وسعة 52 لاعباً دون أي برامج روبوت أو تحايل خارجي.'
              : 'Xosh Chat strictly respects Roblox Creator Hub guidelines. Up to 10,000 servers (52 players max each) are supported authoritatively without unauthorized process memory access.'}
          </div>
        </div>
      </section>

    </div>
  );
};
