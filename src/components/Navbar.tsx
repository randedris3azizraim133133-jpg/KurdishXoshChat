import React from 'react';
import { Language, UserProfile } from '../types';
import { translations } from '../locales/i18n';
import {
  Globe,
  Smartphone,
  Server,
  ShieldCheck,
  BookOpen,
  User,
  Settings as SettingsIcon,
  Download
} from 'lucide-react';
import logoImg from '../assets/images/xosh_chat_logo_1792064902329.jpg';

interface NavbarProps {
  currentTab: 'web' | 'app' | 'safety';
  setCurrentTab: (tab: 'web' | 'app' | 'safety') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  userProfile: UserProfile;
  currentRoomCode: string;
  onOpenKDIDRooms: () => void;
  onOpenProfile: () => void;
  onOpenDownload: () => void;
  onOpenProdGuide: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  userProfile,
  currentRoomCode,
  onOpenKDIDRooms,
  onOpenProfile,
  onOpenDownload,
  onOpenProdGuide,
  onOpenSettings,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Brand wordmark & logo */}
        <button
          onClick={() => setCurrentTab('web')}
          className="flex items-center gap-2.5 text-left shrink-0 hover:opacity-90 transition-opacity focus:outline-none"
        >
          <img
            src={logoImg}
            alt="Xosh Chat Logo"
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-xl object-cover shadow-xs border border-emerald-100"
          />
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap leading-tight">
              {t.appName}
            </span>
            <span className="text-[11px] font-medium text-emerald-700 whitespace-nowrap hidden sm:inline">
              Kurdish Xosh Companion
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-600">
          <button
            onClick={() => setCurrentTab('web')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              currentTab === 'web'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>{t.kurdishXoshWeb}</span>
          </button>

          <button
            onClick={() => setCurrentTab('app')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              currentTab === 'app'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{t.xoshChatApp}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
              {currentRoomCode}
            </span>
          </button>

          <button
            onClick={onOpenKDIDRooms}
            className="px-3 py-1.5 rounded-lg whitespace-nowrap hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Server className="w-4 h-4" />
            <span>{t.kdidRooms}</span>
          </button>

          <button
            onClick={() => setCurrentTab('safety')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              currentTab === 'safety'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.safety}</span>
          </button>

          <button
            onClick={onOpenProdGuide}
            className="px-3 py-1.5 rounded-lg whitespace-nowrap hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-emerald-700 font-bold"
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.productionGuide}</span>
          </button>
        </nav>

        {/* Zone 3: Language Selector & User Profile Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Language Selector */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setLanguage('ckb')}
              className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap ${
                language === 'ckb' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Kurdish Sorani (RTL)"
            >
              کوردی
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap ${
                language === 'en' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="English (LTR)"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap ${
                language === 'ar' ? 'bg-white text-emerald-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Arabic (RTL)"
            >
              عربي
            </button>
          </div>

          {/* User Profile Button displaying verified Roblox avatar */}
          <button
            onClick={onOpenProfile}
            className="p-1.5 pe-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center gap-2"
            title={t.profile}
          >
            <img
              src={
                userProfile.robloxAvatarUrl ||
                'https://www.roblox.com/headshot-thumbnail/image?userId=1&width=150&height=150&format=png'
              }
              alt={userProfile.robloxUsername || 'Roblox User'}
              className="w-6 h-6 rounded-md object-cover bg-white border border-emerald-300"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://www.roblox.com/headshot-thumbnail/image?userId=1&width=150&height=150&format=png';
              }}
            />
            <span className="text-xs font-bold text-slate-800 hidden lg:inline max-w-[110px] truncate">
              {userProfile.robloxDisplayName || userProfile.robloxUsername || 'Set Roblox User'}
            </span>
          </button>

          {/* Quick Settings Icon */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title={t.settings}
            aria-label={t.settings}
          >
            <SettingsIcon className="w-4 h-4" />
          </button>

          {/* Primary CTA */}
          {currentTab === 'web' ? (
            <button
              onClick={() => setCurrentTab('app')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-xs"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{t.xoshChatApp}</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentTab('web')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-xs"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{t.kurdishXoshWeb}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
