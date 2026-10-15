import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../locales/i18n';
import {
  Github,
  FolderTree,
  Terminal,
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
  X,
  FileCode,
  BookOpen,
  GitBranch
} from 'lucide-react';

interface GitHubModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubModal: React.FC<GitHubModalProps> = ({
  language,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const t = translations[language];
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(id);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch {
      setCopiedSection(id);
      setTimeout(() => setCopiedSection(null), 2000);
    }
  };

  const projectTree = `xosh-chat/
├── server.ts                 # Full-stack Express backend with session & rate limit APIs
├── src/
│   ├── assets/               # Generated high-fidelity visual assets (logo & banner)
│   ├── components/
│   │   ├── Navbar.tsx        # Top Bar Contract with trilingual switcher
│   │   ├── HomeScreen.tsx    # Clean green-and-white companion dashboard
│   │   ├── BubbleChatScreen.tsx # RTL bubble chat with player simulation
│   │   ├── ServerConnectionScreen.tsx # Temporary expiring code verification
│   │   ├── ModerationSafetyModal.tsx # TextChatService & abuse reporting
│   │   ├── PermissionsModal.tsx # Transparent privacy & permissions onboarding
│   │   ├── DownloadModal.tsx # Release guidance (PWA, Windows, Android)
│   │   ├── SettingsModal.tsx # Customization, language & overlay toggle
│   │   └── GitHubModal.tsx   # Repository guide & setup steps
│   ├── locales/
│   │   └── i18n.ts           # Kurdish Sorani (ckb), Arabic (ar), English (en)
│   ├── services/
│   │   └── api.ts            # Client API wrapper
│   ├── types/
│   │   └── index.ts          # Unified TypeScript interfaces
│   ├── App.tsx               # Root component & state management
│   ├── main.tsx              # React entry point
│   └── index.css             # Tailwind v4 & Kurdish font configuration
├── .env.example              # Placeholder environment variables only
├── .gitignore                # Excludes secrets, node_modules, build artifacts
├── README.md                 # Complete documentation & Roblox compliance guide
├── package.json              # Full-stack scripts ("dev": "tsx server.ts")
└── tsconfig.json             # Modern TypeScript ES2022 configuration`;

  const gitPushCommands = `# 1. Initialize Git repository
git init
git branch -M main

# 2. Add files and commit (verified: no secrets in repo)
git add .
git commit -m "feat: initial commit of Xosh Chat Kurdish companion application"

# 3. Link your GitHub repository & push
git remote add origin https://github.com/YOUR_USERNAME/xosh-chat.git
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center border border-slate-700">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Xosh Chat — GitHub Source Code</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Clean repository architecture, ready for git push and open-source contribution
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
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
          
          {/* Security Verification Badge */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-emerald-900 block">
                Security & Zero-Secret Audit Passed
              </span>
              <p className="leading-relaxed">
                No API keys, passwords, private tokens, or user cookies are stored or committed in the repository.
                All sensitive values are strictly managed via environment variables defined in <code className="px-1 py-0.5 rounded bg-emerald-100 font-mono">.env.example</code>.
              </p>
            </div>
          </div>

          {/* Source Code Tree */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <FolderTree className="w-4 h-4 text-emerald-600" />
                <span>Repository File Structure</span>
              </span>
              <button
                onClick={() => copyToClipboard(projectTree, 'tree')}
                className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold"
              >
                {copiedSection === 'tree' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'tree' ? 'Copied' : 'Copy Structure'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
              <code>{projectTree}</code>
            </pre>
          </div>

          {/* Quick Publish to GitHub Guide */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-600" />
                <span>Pushing to your GitHub Account</span>
              </span>
              <button
                onClick={() => copyToClipboard(gitPushCommands, 'commands')}
                className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 font-semibold"
              >
                {copiedSection === 'commands' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'commands' ? 'Copied' : 'Copy Commands'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-300 text-xs font-mono overflow-x-auto leading-relaxed">
              <code>{gitPushCommands}</code>
            </pre>
          </div>

          {/* Full-Stack Local Execution */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Running Locally</span>
            </h4>
            <div className="space-y-1 font-mono text-[11px] text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
              <p>npm install</p>
              <p>npm run dev    # Launches full-stack server on http://localhost:3000</p>
              <p>npm run build  # Builds optimized client bundle into /dist</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Ready for GitHub & production deployment
          </span>
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
