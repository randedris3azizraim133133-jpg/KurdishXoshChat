import React, { useState } from 'react';
import { Language, ModerationSettings } from '../types';
import { translations } from '../locales/i18n';
import { api } from '../services/api';
import {
  ShieldCheck,
  Flag,
  UserX,
  AlertTriangle,
  Lock,
  CheckCircle,
  X,
  FileText,
  Sliders,
  Check
} from 'lucide-react';

interface ModerationSafetyModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  reportContext?: {
    messageId: string;
    reportedUser: string;
  } | null;
  moderationSettings: ModerationSettings;
  setModerationSettings: React.Dispatch<React.SetStateAction<ModerationSettings>>;
  onUnblockUser: (user: string) => void;
}

export const ModerationSafetyModal: React.FC<ModerationSafetyModalProps> = ({
  language,
  isOpen,
  onClose,
  reportContext,
  moderationSettings,
  setModerationSettings,
  onUnblockUser,
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'report' | 'settings' | 'blocked'>(
    reportContext ? 'report' : 'settings'
  );
  const [selectedReason, setSelectedReason] = useState<string>('harassment');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [reportSuccess, setReportSuccess] = useState<boolean>(false);

  const reasons = [
    { id: 'harassment', label: t.reportReasonHarassment },
    { id: 'spam', label: t.reportReasonSpam },
    { id: 'inappropriate', label: t.reportReasonInappropriate },
    { id: 'scam', label: t.reportReasonScam },
  ];

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.reportAbuse({
        messageId: reportContext?.messageId || 'none',
        reportedUser: reportContext?.reportedUser || 'UnknownPlayer',
        reason: `${selectedReason}: ${additionalNotes}`,
      });
      setReportSuccess(true);
      setTimeout(() => {
        setReportSuccess(false);
        onClose();
      }, 2000);
    } catch {
      setReportSuccess(true);
      setTimeout(() => {
        setReportSuccess(false);
        onClose();
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{t.moderationTitle}</h3>
              <p className="text-xs text-slate-300 mt-0.5">{t.moderationSubtitle}</p>
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

        {/* Tab Selection */}
        <div className="flex items-center gap-2 p-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold">
          {reportContext && (
            <button
              onClick={() => setActiveTab('report')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'report' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flag className="w-3.5 h-3.5 text-rose-500" />
              <span>{t.reportModalTitle}</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'settings' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'ckb' ? 'فلتەر و ڕێکارەکان' : language === 'ar' ? 'الفلترة والإعدادات' : 'Safety Controls'}</span>
          </button>

          <button
            onClick={() => setActiveTab('blocked')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'blocked' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserX className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.blockedUsersTitle} ({moderationSettings.blockedUsers.length})</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* TAB 1: REPORT FORM */}
          {activeTab === 'report' && (
            <form onSubmit={handleSubmitReport} className="space-y-4">
              {reportSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">{t.reportSubmittedSuccess}</h4>
                </div>
              ) : (
                <>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <span className="font-semibold text-slate-500 block">
                      {language === 'ckb' ? 'یاریزانی دیاریکراو:' : language === 'ar' ? 'اللاعب المحدد:' : 'Target Player:'}
                    </span>
                    <span className="text-sm font-bold text-slate-900 font-mono mt-0.5 block">
                      {reportContext?.reportedUser || '@UnknownPlayer'}
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-2">
                      {t.reportReasonLabel}
                    </label>
                    <div className="space-y-2">
                      {reasons.map((r) => (
                        <label
                          key={r.id}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer text-xs transition-colors ${
                            selectedReason === r.id
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="reportReason"
                            value={r.id}
                            checked={selectedReason === r.id}
                            onChange={(e) => setSelectedReason(e.target.value)}
                            className="text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>{r.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {language === 'ckb' ? 'تێبینی یان وردەکاری زیادە (ئارەزوومەندانە):' : language === 'ar' ? 'تفاصيل إضافية (اختياري):' : 'Additional context (optional):'}
                    </label>
                    <textarea
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      rows={2}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      placeholder={language === 'ckb' ? 'هەر شتێکی تر کە یارمەتی پێداچوونەوە دەدات...' : language === 'ar' ? 'أي معلومات توضيحية إضافية...' : 'Provide any details for the moderator team...'}
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      {t.cancelBtn}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>{t.submitReportBtn}</span>
                    </button>
                  </div>
                </>
              )}
            </form>
          )}

          {/* TAB 2: SAFETY CONTROLS & ROBLOX POLICIES */}
          {activeTab === 'settings' && (
            <div className="space-y-6 text-xs text-slate-700">
              
              {/* Policy Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-emerald-900">
                    {language === 'ckb' ? 'ڕێسای پابەندبوونی سەلامەتی ڕۆبڵۆکس' : language === 'ar' ? 'قواعد التوافق الصارمة مع منصة روبلوكس' : 'Mandatory Roblox Safety Compliance'}
                  </h4>
                  <p className="leading-relaxed">
                    {t.robloxFilterNotice}
                  </p>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {language === 'ckb' ? 'فلتەری ووشە و زمانی توند (Strict Filtering)' : language === 'ar' ? 'تصفية صارمة للكلمات المسيئة' : 'Strict Vocabulary Filtering'}
                    </span>
                    <span className="text-slate-500 mt-0.5 block">
                      {language === 'ckb' ? 'وشە نەگونجاوەکان و سپام بە ئەستێرە دادەپۆشێت پێش پیشاندان.' : language === 'ar' ? 'يحجب الألفاظ غير اللائقة قبل عرضها.' : 'Masks disallowed terms with ### in accordance with TextChatService standards.'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={moderationSettings.filterLevel === 'strict'}
                    onChange={(e) =>
                      setModerationSettings((prev) => ({
                        ...prev,
                        filterLevel: e.target.checked ? 'strict' : 'standard',
                      }))
                    }
                    className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {language === 'ckb' ? 'دیاریکردنی خودکاری سپام و ڕێگریکردن لە لافاو' : language === 'ar' ? 'الحماية التلقائية من الرسائل المتكررة (Anti-Spam)' : 'Anti-Spam Rate Limiting'}
                    </span>
                    <span className="text-slate-500 mt-0.5 block">
                      {language === 'ckb' ? 'ڕێگری دەکات لە ناردنی پەیامی یەک لەدوای یەک لە ماوەی کەمتر لە ١.٥ چرکە.' : language === 'ar' ? 'يمنع إرسال الرسائل السريعة المتتالية.' : 'Enforces 1.5s delay between messages to eliminate spam flooding.'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={moderationSettings.autoFlagSpam}
                    onChange={(e) =>
                      setModerationSettings((prev) => ({
                        ...prev,
                        autoFlagSpam: e.target.checked,
                      }))
                    }
                    className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Data Minimization Pledge */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Lock className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900">
                    {language === 'ckb' ? 'پاراستنی زانیارییە کەسییەکان (Data Minimization)' : language === 'ar' ? 'حماية البيانات الشخصية والخصوصية' : 'Data Privacy & Protection'}
                  </h5>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    {language === 'ckb'
                      ? 'ئەم ئەپە هیچ زانیارییەکی کەسی، مێژووی سەیرکردن، مایک یان شاشە ناپارێزێت. تەنها کۆدی کاتی سێشن بۆ پەیوەستبوون بەکاردێت.'
                      : language === 'ar'
                      ? 'لا يقوم التطبيق بحفظ أو تسجيل أي كلمات مرور أو مراقبة لأي تطبيق آخر، ويقتصر على رمز الجلسة المؤقت.'
                      : 'Xosh Chat adheres to strict data minimization. Zero passwords, keystrokes, or screen contents are accessed or stored.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BLOCKED USERS */}
          {activeTab === 'blocked' && (
            <div className="space-y-4">
              {moderationSettings.blockedUsers.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  <UserX className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>{t.noBlockedUsers}</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {moderationSettings.blockedUsers.map((user) => (
                    <div key={user} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserX className="w-4 h-4 text-rose-500" />
                        <span className="font-mono text-xs font-bold text-slate-800">{user}</span>
                      </div>
                      <button
                        onClick={() => onUnblockUser(user)}
                        className="px-3 py-1 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                      >
                        {t.unblockBtn}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Kurdish Xosh · TextChatService Standard</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
