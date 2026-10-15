import React from 'react';
import { Language, PermissionSettings } from '../types';
import { translations } from '../locales/i18n';
import {
  Settings,
  Globe2,
  Bell,
  Layers,
  RotateCcw,
  Trash2,
  X,
  Check,
  ShieldCheck,
  Volume2
} from 'lucide-react';

interface SettingsModalProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  isOpen: boolean;
  onClose: () => void;
  permissionSettings: PermissionSettings;
  setPermissionSettings: React.Dispatch<React.SetStateAction<PermissionSettings>>;
  onResetOnboarding: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  language,
  setLanguage,
  isOpen,
  onClose,
  permissionSettings,
  setPermissionSettings,
  onResetOnboarding,
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center border border-slate-700">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{t.settings}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Xosh Chat Preferences</p>
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
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          
          {/* Section 1: Language */}
          <div>
            <label className="text-xs font-bold text-slate-900 block mb-2 flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ckb' ? 'زمانی ئەپڵیکەیشن (Language)' : language === 'ar' ? 'لغة التطبيق' : 'Application Language'}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setLanguage('ckb')}
                className={`p-3 rounded-xl border text-center font-bold transition-all ${
                  language === 'ckb'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="block text-sm">کوردی</span>
                <span className="text-[10px] text-slate-500 font-normal">سۆرانی (RTL)</span>
              </button>

              <button
                onClick={() => setLanguage('en')}
                className={`p-3 rounded-xl border text-center font-bold transition-all ${
                  language === 'en'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="block text-sm">English</span>
                <span className="text-[10px] text-slate-500 font-normal">LTR</span>
              </button>

              <button
                onClick={() => setLanguage('ar')}
                className={`p-3 rounded-xl border text-center font-bold transition-all ${
                  language === 'ar'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="block text-sm">العربية</span>
                <span className="text-[10px] text-slate-500 font-normal">RTL</span>
              </button>
            </div>
          </div>

          {/* Section 2: Overlay & Permissions Management */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-900 block">
              {language === 'ckb' ? 'مۆڵەتەکان و شێوازی دەرکەوتن' : language === 'ar' ? 'الأذونات والعرض' : 'Display & Permissions'}
            </span>

            {/* Overlay toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">
                    {t.permissionOverlayTitle}
                  </span>
                  <span className="text-slate-500 text-[11px] block">
                    {language === 'ckb' ? 'دەتوانیت لە هەر کاتێکدا ناچالاکی بکەیت.' : language === 'ar' ? 'يمكنك تعطيله في أي وقت.' : 'Lightweight floating bubble toggle.'}
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={permissionSettings.overlay}
                onChange={(e) =>
                  setPermissionSettings((prev) => ({
                    ...prev,
                    overlay: e.target.checked,
                  }))
                }
                className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
            </div>

            {/* Notifications toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">
                    {t.permissionNotificationTitle}
                  </span>
                  <span className="text-slate-500 text-[11px] block">
                    {language === 'ckb' ? 'ئاگادارکردنەوەی هاوڕێیان لە سێرڤەر.' : language === 'ar' ? 'تنبيهات الخادم والرسائل.' : 'Alert on friend invites & chat.'}
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={permissionSettings.notifications}
                onChange={(e) =>
                  setPermissionSettings((prev) => ({
                    ...prev,
                    notifications: e.target.checked,
                  }))
                }
                className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Section 3: Reset Actions */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                onResetOnboarding();
                onClose();
              }}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>{language === 'ckb' ? 'دووبارەکردنەوەی شاشەی بەخێرهاتن' : language === 'ar' ? 'إعادة عرض شاشة الترحيب' : 'Replay Welcome & Permissions Setup'}</span>
              </div>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
