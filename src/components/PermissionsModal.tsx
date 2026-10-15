import React from 'react';
import { Language, PermissionSettings } from '../types';
import { translations } from '../locales/i18n';
import {
  ShieldCheck,
  Bell,
  Layers,
  KeyRound,
  EyeOff,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface PermissionsModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  permissionSettings: PermissionSettings;
  setPermissionSettings: React.Dispatch<React.SetStateAction<PermissionSettings>>;
  onComplete: () => void;
}

export const PermissionsModal: React.FC<PermissionsModalProps> = ({
  language,
  isOpen,
  onClose,
  permissionSettings,
  setPermissionSettings,
  onComplete,
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{t.welcomeTitle}</h3>
              <p className="text-xs text-emerald-300 font-medium">{t.welcomeSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-6 end-6 text-slate-400 hover:text-white transition-colors"
            title={t.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {t.welcomeExplainer}
          </p>

          <div className="space-y-4">
            
            {/* Permission 1: Notifications */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {t.permissionNotificationTitle}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {t.permissionNotificationDesc}
                  </p>
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
                className="w-5 h-5 mt-1 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer shrink-0"
              />
            </div>

            {/* Permission 2: Optional Floating Overlay */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {t.permissionOverlayTitle}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {t.permissionOverlayDesc}
                  </p>
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
                className="w-5 h-5 mt-1 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer shrink-0"
              />
            </div>

            {/* Permission 3: Session Linking Transparency */}
            <div className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50/70">
              <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {t.permissionRobloxTitle}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {t.permissionRobloxDesc}
                </p>
              </div>
            </div>

            {/* Privacy & Anti-Surveillance Guarantee */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 flex items-start gap-3 text-xs leading-relaxed">
              <EyeOff className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-900 block mb-0.5">
                  {language === 'ckb' ? 'بەڵێنی فەرمی پارێزراوی:' : language === 'ar' ? 'ضمانة الخصوصية التامة:' : 'Privacy & Trust Commitment:'}
                </span>
                {language === 'ckb'
                  ? 'ئەم بەرنامەیە هەرگیز دەستکاری دۆسیە، پەنجەرەی ئەپەکانی تر، یان شاشەی ئامێرەکەت ناکات.'
                  : language === 'ar'
                  ? 'لا يطلب التطبيق إذن إمكانية الوصول (Accessibility) أو مراقبة الشاشة أو قراءة بيانات التطبيقات الأخرى.'
                  : 'Xosh Chat never monitors other application windows, reads private files, or requests unnecessary Accessibility permissions.'}
              </div>
            </div>

          </div>
        </div>

        {/* Footer with Explicit Continue CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {language === 'ckb' ? 'دەتوانیت لە هەر کاتێکدا بیگۆڕیت' : language === 'ar' ? 'يمكنك التعديل في أي وقت' : 'Adjustable anytime in Settings'}
          </span>
          <button
            onClick={() => {
              onComplete();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>{t.continueBtn}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
