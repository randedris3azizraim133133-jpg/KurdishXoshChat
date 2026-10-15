import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../locales/i18n';
import {
  Download,
  Smartphone,
  Monitor,
  Globe,
  Terminal,
  Check,
  Copy,
  ExternalLink,
  X,
  AlertCircle,
  PackageCheck
} from 'lucide-react';

interface DownloadModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onOpenGithub: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  language,
  isOpen,
  onClose,
  onOpenGithub,
}) => {
  if (!isOpen) return null;

  const t = translations[language];
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copySnippet = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{t.downloadModalTitle}</h3>
              <p className="text-xs text-slate-300 mt-0.5">{t.downloadModalDesc}</p>
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
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Honest Status Note */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 leading-relaxed">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">
                {language === 'ckb' ? 'ئاگاداری دۆخی بڵاوکردنەوەی پڕۆژە:' : language === 'ar' ? 'حالة التوزيع والنشر الرسمية:' : 'Open Source Release Status Notice:'}
              </span>
              {language === 'ckb'
                ? 'پڕۆژەکە بە کۆدی سەرچاوەکراوە لە قۆناغی بڵاوکردنەوەدایە. لێرە دەتوانیت ڕاستەوخۆ وەک PWA دایمەزرێنیت یان بەپێی فەرمانەکانی خوارەوە پاکێجی ویندۆز و ئەندرۆید دروستبکەیت.'
                : language === 'ar'
                ? 'التطبيق متاح حالياً كتطبيق ويب تقدمي (PWA) قابل للتثبيت المباشر، ومفتوح المصدر للتجميع على ويندوز وأندرويد.'
                : 'Xosh Chat is ready to be published to your GitHub organization. You can install it immediately as an offline PWA or compile native binaries for Windows & Android using the commands below.'}
            </div>
          </div>

          {/* Option 1: Progressive Web App (PWA) */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{t.pwaOptionTitle}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {language === 'ckb' ? 'دەستبەجێ بەردەستە' : language === 'ar' ? 'متاح فوراً' : 'Instant Install'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.pwaOptionDesc}</p>
                
                <div className="mt-3 p-3 rounded-xl bg-slate-50 text-xs text-slate-700 font-medium">
                  {language === 'ckb'
                    ? 'لە وێبگەڕەکەت کرتە لە مینیۆی (Three dots) بکە پاشان هەڵبژێرە "Install Xosh Chat" یان "Add to Home Screen".'
                    : language === 'ar'
                    ? 'من قائمة المتصفح، اختر "تثبيت Xosh Chat" أو "إضافة إلى الشاشة الرئيسية".'
                    : 'From your browser address bar/menu, click "Install Xosh Chat" or "Add to Home Screen".'}
                </div>
              </div>
            </div>
          </div>

          {/* Option 2: Windows Desktop Build */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                <Monitor className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">{t.windowsOptionTitle}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.windowsOptionDesc}</p>

                <div className="mt-3 relative">
                  <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono overflow-x-auto">
                    <code>npx @electron-forge/cli import && npm run make</code>
                  </pre>
                  <button
                    onClick={() => copySnippet('npx @electron-forge/cli import && npm run make', 1)}
                    className="absolute end-2 top-2 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-medium flex items-center gap-1 transition-colors"
                  >
                    {copiedIndex === 1 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIndex === 1 ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Option 3: Android APK (Capacitor) */}
          <div className="p-5 rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">{t.androidOptionTitle}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.androidOptionDesc}</p>

                <div className="mt-3 relative">
                  <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono overflow-x-auto">
                    <code>npm i @capacitor/core @capacitor/android && npx cap init "Xosh Chat" com.kurdishxosh.chat</code>
                  </pre>
                  <button
                    onClick={() => copySnippet('npm i @capacitor/core @capacitor/android && npx cap init "Xosh Chat" com.kurdishxosh.chat', 2)}
                    className="absolute end-2 top-2 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-medium flex items-center gap-1 transition-colors"
                  >
                    {copiedIndex === 2 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIndex === 2 ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenGithub();
            }}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
          >
            <span>{t.githubRepoTitle}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

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
