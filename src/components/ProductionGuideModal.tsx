import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../locales/i18n';
import {
  BookOpen,
  Github,
  Smartphone,
  ShieldCheck,
  Terminal,
  Check,
  Copy,
  Layers,
  Globe,
  ExternalLink,
  X,
  Lock,
  Cpu
} from 'lucide-react';

interface ProductionGuideModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductionGuideModal: React.FC<ProductionGuideModalProps> = ({
  language,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyCode = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSnippet(id);
      setTimeout(() => setCopiedSnippet(null), 2000);
    } catch {
      setCopiedSnippet(id);
      setTimeout(() => setCopiedSnippet(null), 2000);
    }
  };

  const ghPagesCommands = `# Step 1: Install gh-pages dependency
npm install gh-pages --save-dev

# Step 2: In vite.config.ts, set the base path to your GitHub repository name:
# export default defineConfig({ base: '/kurdish-xosh-web/', ... })

# Step 3: Add deploy scripts to package.json:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Step 4: Run the deploy command to publish instantly to GitHub Pages:
npm run deploy`;

  const androidPermissionsXml = `<!-- AndroidManifest.xml (Capacitor / Native Android) -->
<!-- 1. Floating Chat Bubble Overlay Permission -->
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />

<!-- 2. Notifications for Game Session Invites -->
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

<!-- 3. Network Access for KDID Room WebSocket / REST Sync -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- 4. Optional Foreground Service for Overlay Lifecycle -->
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_SPECIAL_USE" />`;

  const robloxOpenCloudSnippet = `-- Kurdish Xosh In-Game Script (ServerScriptService)
-- Compliant with Roblox TextChatService and Open Cloud standards

local TextChatService = game:GetService("TextChatService")
local HttpService = game:GetService("HttpService")

-- Unique KDID server code generated per place instance
local currentKDID = "KDID-1824"

-- Display KDID room code on player HUD inside game
local function showKDIDToPlayer(player)
    -- Display currentKDID on ScreenGui so players can enter it in Xosh Chat
end

-- Filter outgoing messages using Roblox TextChatService
local function broadcastCompliantMessage(senderPlayer, messageText)
    local filteredTextResult = TextChatService:FilterStringAsync(messageText, senderPlayer.UserId)
    -- Broadcast to in-game chat and sync with companion backend
end`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{t.prodGuideTitle}</h3>
              <p className="text-xs text-slate-300 mt-0.5">{t.prodGuideSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
            title={t.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-8 text-xs text-slate-700">
          
          {/* Section 1: GitHub Pages */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>{t.githubPagesStepTitle}</span>
              </h4>
              <button
                onClick={() => copyCode(ghPagesCommands, 'ghpages')}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                {copiedSnippet === 'ghpages' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'ghpages' ? 'Copied' : 'Copy Commands'}</span>
              </button>
            </div>
            
            <p className="text-slate-600 leading-relaxed">
              {language === 'ckb'
                ? 'دەتوانیت ماڵپەڕی Kurdish Xosh Web بە خۆڕایی لەسەر GitHub Pages بڵاوبکەیتەوە بەبێ پێویستی بە سێرڤەری گرانبەها:'
                : language === 'ar'
                ? 'يمكنك نشر الموقع مجاناً على GitHub Pages بالخطوات التالية:'
                : 'Publish the web portal to GitHub Pages for free with these commands:'}
            </p>

            <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-300 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
              <code>{ghPagesCommands}</code>
            </pre>
          </div>

          {/* Section 2: Android Permissions */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>{t.androidPermsStepTitle}</span>
              </h4>
              <button
                onClick={() => copyCode(androidPermissionsXml, 'android')}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                {copiedSnippet === 'android' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'android' ? 'Copied' : 'Copy Manifest'}</span>
              </button>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {language === 'ckb'
                ? 'بۆ دەرکەوتنی بڵقی چات بە شێوەی Floating لەسەر ئەندرۆید لە کاتی یاری ڕۆبڵۆکسدا، ئەپەکە لە AndroidManifest.xml پێویستی بەم مۆڵەتانەیە:'
                : language === 'ar'
                ? 'لإظهار فقاعة الدردشة العائمة فوق شاشة روبلوكس في أندرويد، يتطلب ملف AndroidManifest.xml الأذونات التالية:'
                : 'To display floating chat bubbles over other apps on Android without crashing or being rejected by Google Play:'}
            </p>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 leading-relaxed">
              <span className="font-bold block mb-0.5">Google Play Store Compliance:</span>
              Always request <code className="font-mono text-amber-950 bg-amber-100 px-1 rounded">SYSTEM_ALERT_WINDOW</code> through an explicit runtime intent dialog where the user approves "Display over other apps". If denied, fall back to in-app chat.
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
              <code>{androidPermissionsXml}</code>
            </pre>
          </div>

          {/* Section 3: Roblox Compliance */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t.robloxComplianceStepTitle}</span>
              </h4>
              <button
                onClick={() => copyCode(robloxOpenCloudSnippet, 'roblox')}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                {copiedSnippet === 'roblox' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'roblox' ? 'Copied' : 'Copy Script'}</span>
              </button>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {language === 'ckb'
                ? 'یاسای سەرەکی: نابێت بە هیچ جۆرێک فلتەری دەقی ڕۆبڵۆکس پێشێل بکرێت. ئەم کۆدە لە ناو Roblox Studio جێبەجێ دەکرێت:'
                : language === 'ar'
                ? 'القاعدة الذهبية: عدم تجاوز نظام التصفية في روبلوكس واستخدام TextChatService الرسمية:'
                : 'Never bypass Roblox communication boundaries. Integrate officially using server-side TextChatService and Open Cloud MessagingService:'}
            </p>

            <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-300 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
              <code>{robloxOpenCloudSnippet}</code>
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
