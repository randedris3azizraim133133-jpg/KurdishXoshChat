import React, { useState } from 'react';
import { Language, KDIDRoom, ServerSystemStats } from '../types';
import { translations } from '../locales/i18n';
import { api } from '../services/api';
import {
  Server,
  Users,
  Plus,
  Check,
  X,
  Radio,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Compass,
  Layers
} from 'lucide-react';

interface KDIDRoomsModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  activeRooms: KDIDRoom[];
  currentRoom: KDIDRoom;
  serverStats?: ServerSystemStats;
  onSelectRoom: (room: KDIDRoom) => void;
  onJoinByCode: (code: string) => Promise<void>;
  onServerCreated: (newRoom: KDIDRoom) => void;
}

export const KDIDRoomsModal: React.FC<KDIDRoomsModalProps> = ({
  language,
  isOpen,
  onClose,
  activeRooms,
  currentRoom,
  serverStats,
  onSelectRoom,
  onJoinByCode,
  onServerCreated,
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  const [inputCode, setInputCode] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isFindingAvailable, setIsFindingAvailable] = useState<boolean>(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputCode.trim().toUpperCase();
    if (!clean) {
      setErrorMsg('Please enter a server ID.');
      return;
    }

    if (!/^KDID-\d{4,5}$/.test(clean)) {
      setErrorMsg('Server ID must be in format KDID-0001 through KDID-10000.');
      return;
    }

    const num = parseInt(clean.replace('KDID-', ''), 10);
    if (num < 1 || num > 10000) {
      setErrorMsg('Server number must be between 1 and 10,000.');
      return;
    }

    setIsJoining(true);
    setErrorMsg('');

    try {
      await onJoinByCode(clean);
      onClose();
    } catch (err: any) {
      if (err.code === 'SERVER_FULL') {
        setErrorMsg(`${clean} is full (52/52 players). Please use Quick Join or select an open server.`);
      } else {
        setErrorMsg(err.message || 'Failed to join server');
      }
    } finally {
      setIsJoining(false);
    }
  };

  const handleCreateAutoServer = async () => {
    setIsCreating(true);
    setErrorMsg('');

    try {
      const newRoom = await api.createRoom();
      onServerCreated(newRoom);
      await onJoinByCode(newRoom.kdidCode);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to allocate new server');
    } finally {
      setIsCreating(false);
    }
  };

  const handleQuickJoinAvailable = async () => {
    setIsFindingAvailable(true);
    setErrorMsg('');

    try {
      const openRoom = await api.findAvailableRoom();
      await onJoinByCode(openRoom.kdidCode);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || t.allServersFullError);
    } finally {
      setIsFindingAvailable(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{t.kdidRoomsTitle}</h3>
              <p className="text-xs text-slate-300 mt-0.5">{t.serverCapacitySpec}</p>
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

        {/* Server System Stats Bar */}
        <div className="p-3 bg-emerald-950 text-white text-xs flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800/60">
          <div className="flex items-center gap-3">
            <span className="font-mono text-emerald-300 font-bold">
              Active Servers: {activeRooms.length} / 10,000 Max
            </span>
            <span className="text-emerald-500">·</span>
            <span className="text-slate-200">
              Capacity: 52 Players / Server
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuickJoinAvailable}
              disabled={isFindingAvailable}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1 transition-colors"
            >
              {isFindingAvailable ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Compass className="w-3 h-3" />}
              <span>{t.findAvailableServerBtn}</span>
            </button>

            <button
              onClick={handleCreateAutoServer}
              disabled={isCreating || activeRooms.length >= 10000}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-300 font-bold text-[11px] flex items-center gap-1 transition-colors"
              title={t.autoAssignServerDesc}
            >
              {isCreating ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
              <span>{t.createRoomBtn}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Join Specific Server Code Form */}
          <form onSubmit={handleJoin} className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <label className="text-xs font-bold text-emerald-950 uppercase tracking-wider block mb-2">
              {t.enterKdidCodeLabel}
            </label>
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value.toUpperCase());
                  setErrorMsg('');
                }}
                placeholder="KDID-0001, KDID-1824..."
                maxLength={10}
                className="flex-1 h-11 px-4 rounded-xl border border-emerald-300 bg-white font-mono text-base font-bold text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
              <button
                type="submit"
                disabled={isJoining}
                className="h-11 px-6 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                {isJoining ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Radio className="w-4 h-4" />
                )}
                <span>{t.joinRoomBtn}</span>
              </button>
            </div>
            
            {errorMsg ? (
              <div className="mt-2.5 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickJoinAvailable}
                  className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[10px] whitespace-nowrap hover:bg-rose-700"
                >
                  Join Available
                </button>
              </div>
            ) : (
              <span className="text-[11px] text-emerald-800 mt-1.5 block">
                {t.serverFormatExplainer}
              </span>
            )}
          </form>

          {/* Active Servers List with (X/52) Occupancy */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                {t.activeRoomsList}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Sorted by server ID
              </span>
            </div>

            <div className="space-y-3">
              {activeRooms.map((room) => {
                const isSelected = room.kdidCode === currentRoom.kdidCode;
                const isFull = room.activePlayers >= 52 || room.isFull;

                return (
                  <div
                    key={room.kdidCode}
                    onClick={() => {
                      if (!isFull) {
                        onSelectRoom(room);
                        onClose();
                      }
                    }}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      isFull
                        ? 'bg-slate-50 border-slate-200 opacity-75 cursor-not-allowed'
                        : isSelected
                        ? 'bg-emerald-50/80 border-emerald-500 ring-1 ring-emerald-500/30 cursor-pointer'
                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                        <Server className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          {/* Server ID & (X/52) Display */}
                          <span className="text-sm font-extrabold font-mono text-emerald-800">
                            {room.kdidCode}
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {room.name}
                          </span>
                          {room.isOfficial && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                              Official
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          {room.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* Occupancy Badge (X/52) */}
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 ${
                          isFull
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : room.activePlayers > 40
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>{room.kdidCode} ({room.activePlayers}/52)</span>
                      </span>

                      {isSelected ? (
                        <span className="p-1.5 rounded-full bg-emerald-600 text-white">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      ) : isFull ? (
                        <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-rose-700 bg-rose-50">
                          {t.serverFullBadge}
                        </span>
                      ) : (
                        <button className="px-3 py-1 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors">
                          Join
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Capacity Policy Notice */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-1">
            <span className="font-bold text-slate-900 block">
              Kurdish Xosh Server Architecture (Enforced by Backend):
            </span>
            <p>
              • Max Global Limit: 10,000 servers total (KDID-0001 through KDID-10000).<br />
              • Max Server Limit: 52 real players per server.<br />
              • Duplicate server IDs are strictly prevented, and full servers redirect to open instances automatically.
            </p>
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
