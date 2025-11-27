import React from 'react';
import { GameEvent, DialogueOption } from '../types';
import { MessageSquare, Star, DollarSign, XCircle } from 'lucide-react';

interface DialogueModalProps {
  event: GameEvent;
  onOptionSelect: (option: DialogueOption) => void;
}

export const DialogueModal: React.FC<DialogueModalProps> = ({ event, onOptionSelect }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden transform transition-all">
        
        {/* Header */}
        <div className={`p-6 ${event.isSponsorship ? 'bg-gradient-to-r from-yellow-900/40 to-slate-900' : 'bg-gradient-to-r from-purple-900/40 to-slate-900'} border-b border-slate-700`}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-3xl shadow-lg">
              {event.npcAvatar}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                {event.isSponsorship ? 'Business Opportunity' : 'New Message'}
              </div>
              <h2 className="text-2xl font-black text-white">{event.npcName}</h2>
              <p className="text-slate-300 text-sm font-medium">{event.title}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 text-slate-200 leading-relaxed italic">
            "{event.description}"
          </div>

          <div className="space-y-3">
            {event.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => onOptionSelect(option)}
                className="w-full text-left group relative p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-purple-500 rounded-xl transition-all duration-200 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-white block group-hover:text-purple-300 transition-colors">
                    {option.text}
                  </span>
                  
                  {/* Preview Effects */}
                  <div className="flex flex-wrap gap-2 mt-2 text-xs">
                     {option.changes.money && (
                       <span className={option.changes.money > 0 ? 'text-green-400' : 'text-red-400'}>
                         {option.changes.money > 0 ? '+' : ''}{option.changes.money}$
                       </span>
                     )}
                     {option.changes.mood && (
                       <span className={option.changes.mood > 0 ? 'text-blue-400' : 'text-red-400'}>
                         {option.changes.mood > 0 ? '+' : ''}{option.changes.mood} Mood
                       </span>
                     )}
                     {option.changes.relationshipChange && (
                        <span className={option.changes.relationshipChange > 0 ? 'text-pink-400' : 'text-red-400'}>
                            {option.changes.relationshipChange > 0 ? '+' : ''}{option.changes.relationshipChange} Rel
                        </span>
                     )}
                  </div>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all text-purple-500">
                    <MessageSquare size={20} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};