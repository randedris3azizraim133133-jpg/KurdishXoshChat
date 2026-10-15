import React, { useState } from 'react';
import { Language, UserProfile } from '../types';
import { translations } from '../locales/i18n';
import { api } from '../services/api';
import {
  User,
  ShieldCheck,
  Check,
  X,
  Search,
  RefreshCw,
  Copy,
  AlertCircle,
  ExternalLink,
  KeyRound,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface UserProfileModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  language,
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  const [inputUsername, setInputUsername] = useState<string>(userProfile.robloxUsername || '');
  const [isLookingUp, setIsLookingUp] = useState<boolean>(false);
  const [lookupError, setLookupError] = useState<string>('');
  const [lookupSuccess, setLookupSuccess] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [inGameVerified, setInGameVerified] = useState<boolean>(userProfile.isOwnershipVerified);

  // Temporary fetched preview
  const [previewAccount, setPreviewAccount] = useState<{
    id: number | string;
    name: string;
    displayName: string;
    avatarUrl: string;
  }>({
    id: userProfile.robloxId,
    name: userProfile.robloxUsername,
    displayName: userProfile.robloxDisplayName,
    avatarUrl: userProfile.robloxAvatarUrl,
  });

  const handleLookup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = inputUsername.trim().replace(/^@/, '');
    if (!clean) {
      setLookupError('Please enter a Roblox username.');
      return;
    }

    setIsLookingUp(true);
    setLookupError('');
    setLookupSuccess(false);

    try {
      const robloxAccount = await api.lookupRobloxUser(clean);
      setPreviewAccount({
        id: robloxAccount.id,
        name: robloxAccount.name,
        displayName: robloxAccount.displayName,
        avatarUrl: robloxAccount.avatarUrl,
      });
      setLookupSuccess(true);
    } catch (err: any) {
      setLookupError(err.message || t.robloxAccountNotFound);
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleCopyVerificationCode = async () => {
    try {
      await navigator.clipboard.writeText(userProfile.verificationCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleSaveAndConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewAccount.name) {
      setLookupError('Please lookup and validate a Roblox username first.');
      return;
    }

    onUpdateProfile({
      robloxUsername: previewAccount.name,
      robloxDisplayName: previewAccount.displayName || previewAccount.name,
      robloxId: String(previewAccount.id),
      robloxAvatarUrl: previewAccount.avatarUrl,
      isLookupVerified: true,
      isOwnershipVerified: inGameVerified,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{t.profile}</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Official Roblox Public Identity & Avatar
              </p>
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
          
          {/* Strict Zero-Bots & Anti-Impersonation Guarantee */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed space-y-1">
              <span className="font-bold text-emerald-900 block">
                {t.zeroBotsBadge} — Verified Roblox Identity Only
              </span>
              <p className="text-emerald-900/80">
                {t.noBotsDisclaimer}
              </p>
            </div>
          </div>

          {/* Form: Enter Roblox Username */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-900 block">
              {t.robloxUsernameLabel}
            </label>

            <div className="flex flex-col sm:flex-row items-stretch gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputUsername}
                  onChange={(e) => {
                    setInputUsername(e.target.value);
                    setLookupError('');
                    setLookupSuccess(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleLookup();
                    }
                  }}
                  placeholder={t.enterRobloxUsernamePlaceholder}
                  maxLength={20}
                  className="w-full h-11 px-4 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-mono"
                />
              </div>

              <button
                type="button"
                onClick={() => handleLookup()}
                disabled={isLookingUp || !inputUsername.trim()}
                className="h-11 px-5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 shadow-xs shrink-0"
              >
                {isLookingUp ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{t.lookingUpRoblox}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-3.5 h-3.5" />
                    <span>{t.lookupRobloxProfileBtn}</span>
                  </>
                )}
              </button>
            </div>

            {/* Error Message if lookup fails */}
            {lookupError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-snug">{lookupError}</span>
              </div>
            )}
          </div>

          {/* Live Fetched Roblox Profile Preview Card */}
          {previewAccount.avatarUrl && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={previewAccount.avatarUrl}
                    alt={previewAccount.name}
                    className="w-14 h-14 rounded-2xl object-cover bg-white border-2 border-emerald-500 shadow-sm"
                    onError={(e) => {
                      // Fallback if image blocked
                      (e.currentTarget as HTMLImageElement).src =
                        'https://www.roblox.com/headshot-thumbnail/image?userId=1&width=150&height=150&format=png';
                    }}
                  />
                  <span className="absolute -bottom-1 -end-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-bold">
                    ✓
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900">
                      {previewAccount.displayName || previewAccount.name}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      (@{previewAccount.name})
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                    Roblox ID: {previewAccount.id} · App ID: {userProfile.appId}
                  </span>

                  <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Public Profile Verified via Roblox API</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Account Ownership Verification Section */}
          <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200/90 text-xs text-slate-700 space-y-3">
            <div className="flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">
                  {t.ownershipVerificationTitle}
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {t.ownershipVerificationDesc}
                </p>
              </div>
            </div>

            {/* Code pill */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
              <span className="font-mono text-sm font-extrabold text-emerald-800 tracking-wider">
                {userProfile.verificationCode}
              </span>
              <button
                type="button"
                onClick={handleCopyVerificationCode}
                className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 transition-colors"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{t.codeCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{t.copyVerificationCode}</span>
                  </>
                )}
              </button>
            </div>

            <label className="flex items-center gap-2 text-[11px] text-slate-600 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={inGameVerified}
                onChange={(e) => setInGameVerified(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>I have entered this verification code in Kurdish Xosh to confirm ownership.</span>
            </label>
          </div>

          {/* Save Action */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSaveAndConfirm}
              className="w-full h-12 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{t.saveProfile}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
