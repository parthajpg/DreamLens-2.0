import React, { useState } from 'react';
import { X, Search, Trash2, Shield, Calendar, ArrowRight, BookOpen, Brain, Sparkles, AlertCircle } from 'lucide-react';
import { JournalEntry, DreamMode } from '../types';

interface JournalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entries: JournalEntry[];
  onDeleteEntry: (id: string) => void;
  onClearAll: () => void;
  onSelectEntry: (entry: JournalEntry, mode: DreamMode) => void;
}

export const JournalDrawer: React.FC<JournalDrawerProps> = ({
  isOpen,
  onClose,
  entries,
  onDeleteEntry,
  onClearAll,
  onSelectEntry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isOpen) return null;

  const filteredEntries = entries.filter((e) => {
    const q = searchQuery.toLowerCase();
    return (
      e.dreamText.toLowerCase().includes(q) ||
      (e.emotionalState && e.emotionalState.toLowerCase().includes(q)) ||
      (e.additionalContext && e.additionalContext.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden backdrop-blur-md bg-black/75 flex justify-end">
      
      {/* Drawer Panel */}
      <div className="w-full max-w-md bg-global-bg border-l border-global-border h-full flex flex-col shadow-editorial-float">
        
        {/* Header */}
        <div className="p-6 border-b border-global-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-mythology-copper" />
            <h2 className="text-lg font-serif-psych font-bold text-white tracking-wide">
              Private Dream Journal
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Privacy Assurance Banner */}
        <div className="p-4 mx-6 mt-4 rounded-md border border-white/10 bg-black/40 text-xs text-slate-300 flex items-start gap-2.5">
          <Shield className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
          <p className="leading-relaxed font-sans text-[11px]">
            <strong className="text-white">Strictly Device-Local:</strong> Your dreams and interpretations remain entirely on your personal device (browser localStorage). No server database, user tracking, or backend dream logging exists.
          </p>
        </div>

        {/* Search Bar */}
        <div className="p-6 pb-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your recorded dreams or emotions..."
              className="w-full bg-global-surface border border-global-border rounded-md pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-white/30"
            />
          </div>
        </div>

        {/* Entry List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30 text-mythology-copper" />
              <p className="text-xs font-mono">No recorded dreams in this browser.</p>
              <p className="text-[11px] text-slate-600 mt-1 font-sans">
                Interpret any dream and tap "Save to Device" to preserve it privately.
              </p>
            </div>
          ) : (
            filteredEntries.map((entry) => {
              const hasPsych = !!entry.interpretations.psychology;
              const hasMyth = !!entry.interpretations.mythology;

              return (
                <div
                  key={entry.id}
                  className="rounded-lg border border-global-border bg-global-surface/70 p-5 hover:border-white/20 transition-all group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {new Date(entry.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="text-slate-600 hover:text-rose-400 transition-colors p-1"
                      title="Delete this dream entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs font-serif text-slate-200 line-clamp-3 mb-3 leading-relaxed">
                    "{entry.dreamText}"
                  </p>

                  {entry.emotionalState && (
                    <div className="text-xs font-mono text-slate-400 mb-3">
                      {entry.emotionalState}
                    </div>
                  )}

                  {/* Available Interpretations to Revisit */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      {hasPsych && (
                        <button
                          onClick={() => onSelectEntry(entry, 'PSYCHOLOGY')}
                          className="flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-md bg-psychology-plum/60 border border-psychology-plumBorder text-psychology-silver hover:bg-psychology-plum"
                        >
                          <Brain className="w-3 h-3 text-psychology-sage" />
                          <span>Psychology</span>
                        </button>
                      )}
                      {hasMyth && (
                        <button
                          onClick={() => onSelectEntry(entry, 'HINDU_MYTHOLOGY')}
                          className="flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-md bg-mythology-card border border-mythology-copper/30 text-mythology-parchment hover:bg-[#2d1f14]"
                        >
                          <Sparkles className="w-3 h-3 text-mythology-copper" />
                          <span>Mythology</span>
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => onSelectEntry(entry, hasMyth ? 'HINDU_MYTHOLOGY' : 'PSYCHOLOGY')}
                      className="text-[11px] font-mono text-mythology-copperLight hover:text-white flex items-center gap-1"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Clear All History */}
        {entries.length > 0 && (
          <div className="p-4 border-t border-global-border bg-black/60">
            {confirmClear ? (
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-rose-400 flex items-center gap-1 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Erase all device entries?
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onClearAll();
                      setConfirmClear(false);
                    }}
                    className="text-xs bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-md font-mono"
                  >
                    Confirm Clear
                  </button>
                  <button
                    onClick={() => setConfirmClear(false)}
                    className="text-xs bg-white/10 text-slate-300 px-2.5 py-1.5 rounded-md font-mono"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="w-full text-center text-xs text-rose-400/80 hover:text-rose-300 py-1.5 font-mono flex items-center justify-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Local Journal History</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
