import React, { useState } from 'react';
import { STREAM_CATEGORIES } from '../constants';
import { StreamConfig, StreamCategoryType } from '../types';
import { Video, MessageCircle, MapPin, Play } from 'lucide-react';

interface StreamSetupProps {
  onStart: (config: StreamConfig) => void;
  onCancel: () => void;
}

export const StreamSetup: React.FC<StreamSetupProps> = ({ onStart, onCancel }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<StreamCategoryType>('GAMING');

  const getIcon = (type: StreamCategoryType) => {
    switch(type) {
      case 'GAMING': return <Video size={24} />;
      case 'CHATTING': return <MessageCircle size={24} />;
      case 'IRL': return <MapPin size={24} />;
    }
  };

  const selectedCategory = STREAM_CATEGORIES.find(c => c.id === category);

  const handleStart = () => {
    onStart({
      title: title || `Chillin' on Stream`,
      category
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 w-full max-w-2xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-purple-900/50 to-slate-900">
          <h2 className="text-2xl font-black text-white">Stream Setup</h2>
          <p className="text-slate-400 text-sm">Configure your broadcast before going live.</p>
        </div>

        <div className="p-6 space-y-8 overflow-y-auto max-h-[70vh]">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Stream Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Road to Diamond! | !socials"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-300 uppercase tracking-wider">Content Type</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {STREAM_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                    category === cat.id 
                      ? 'bg-purple-900/20 border-purple-500 scale-[1.02] shadow-lg shadow-purple-900/20' 
                      : 'bg-slate-800 border-slate-700 hover:border-slate-500 hover:bg-slate-750'
                  }`}
                >
                  <div className={`mb-3 ${category === cat.id ? 'text-purple-400' : 'text-slate-400'}`}>
                    {getIcon(cat.id)}
                  </div>
                  <div className="font-bold text-white mb-1">{cat.name}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{cat.description}</div>
                  
                  {category === cat.id && (
                    <div className="absolute top-3 right-3 w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50 animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Preview */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
             <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Estimated Impact</h4>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                   <span className="block text-slate-400 text-xs">Energy Cost</span>
                   <span className={`font-mono font-bold ${selectedCategory!.energyCostMod > 1 ? 'text-red-400' : 'text-green-400'}`}>
                     {selectedCategory?.energyCostMod}x
                   </span>
                </div>
                <div>
                   <span className="block text-slate-400 text-xs">Mood Cost</span>
                   <span className={`font-mono font-bold ${selectedCategory!.moodCostMod > 1 ? 'text-red-400' : 'text-green-400'}`}>
                     {selectedCategory?.moodCostMod}x
                   </span>
                </div>
                <div>
                   <span className="block text-slate-400 text-xs">View Growth</span>
                   <span className="font-mono font-bold text-blue-400">{selectedCategory?.viewMod}x</span>
                </div>
                <div>
                   <span className="block text-slate-400 text-xs">Earnings</span>
                   <span className="font-mono font-bold text-green-400">{selectedCategory?.moneyMod}x</span>
                </div>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 flex justify-between items-center bg-slate-900">
           <button 
             onClick={onCancel}
             className="px-6 py-3 font-bold text-slate-400 hover:text-white transition-colors"
           >
             Cancel
           </button>
           <button 
             onClick={handleStart}
             className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-purple-900/50 transition-all hover:scale-105"
           >
             <Play fill="currentColor" size={18} /> GO LIVE
           </button>
        </div>
      </div>
    </div>
  );
};