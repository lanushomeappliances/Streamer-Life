import React from 'react';
import { UPDATE_LOGS } from '../constants';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

export const Updates: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-white">Patch Notes 📘</h2>
        <p className="text-slate-400">Track the latest changes and features in Streamer Life (SL26).</p>
      </div>

      <div className="space-y-6">
        {UPDATE_LOGS.map((update, index) => (
          <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-purple-500/50 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-3">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg shadow-purple-900/50">
                        {update.version}
                    </span>
                    <h3 className="text-xl font-bold text-slate-100">{update.title}</h3>
                </div>
                <div className="flex items-center text-slate-500 text-sm gap-2">
                    <Calendar size={14} />
                    {update.date}
                </div>
            </div>
            
            <ul className="space-y-3">
                {update.changes.map((change, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                        <ArrowRight className="text-purple-400 mt-1 flex-shrink-0" size={16} />
                        <span>{change}</span>
                    </li>
                ))}
            </ul>

            {index === 0 && (
                <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center gap-2 text-yellow-400 text-sm font-semibold">
                    <Sparkles size={16} />
                    <span>Latest Release</span>
                </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-8 text-center mt-12">
        <h3 className="text-2xl font-bold text-white mb-2">Developed by Vesni</h3>
        <p className="text-slate-400 max-w-lg mx-auto">
            Stay tuned for upcoming features including Player Organizations, Agency Contracts, and the Competitive Tournament Arc.
        </p>
      </div>
    </div>
  );
};