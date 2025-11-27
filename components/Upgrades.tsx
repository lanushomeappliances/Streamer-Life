import React from 'react';
import { EQUIPMENT_LIST } from '../constants';
import { GameState, Equipment } from '../types';
import { ShoppingCart, Check, Lock, Star } from 'lucide-react';

interface UpgradesProps {
  gameState: GameState;
  buyEquipment: (item: Equipment) => void;
}

export const Upgrades: React.FC<UpgradesProps> = ({ gameState, buyEquipment }) => {
  // Helper to check if item is owned
  const isOwned = (item: Equipment) => {
    return gameState.equipment[item.type] >= item.level;
  };

  // Helper to check if item is unlockable (previous tier owned)
  const isUnlockable = (item: Equipment) => {
    if (item.level === 1) return true;
    return gameState.equipment[item.type] >= item.level - 1;
  };

  const getCategoryIcon = (type: string) => {
    switch(type) {
        case 'camera': return '📷';
        case 'mic': return '🎙️';
        case 'pc': return '💻';
        case 'lighting': return '💡';
        default: return '📦';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto animate-fade-in pb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h2 className="text-3xl font-black text-white">Equipment Shop</h2>
            <p className="text-slate-400">Invest in your setup to grow your audience faster.</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-lg">
            <span className="text-green-400 font-bold text-xl">${gameState.money.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EQUIPMENT_LIST.map((item) => {
            const owned = isOwned(item);
            const locked = !isUnlockable(item);
            const canAfford = gameState.money >= item.cost;

            return (
                <div key={item.id} className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                    owned 
                        ? 'bg-slate-900 border-purple-500/30 opacity-70' 
                        : locked
                            ? 'bg-slate-900 border-slate-800 opacity-50 grayscale'
                            : 'bg-slate-800 border-slate-700 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-900/20'
                }`}>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-2xl">
                            {getCategoryIcon(item.type)}
                        </div>
                        <div className="bg-slate-950 px-2 py-1 rounded text-xs font-mono text-slate-400 uppercase">
                            Level {item.level}
                        </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                    <p className="text-sm text-purple-400 mb-4 font-medium">{item.effect}</p>

                    {/* Footer / Action */}
                    <div className="mt-4 pt-4 border-t border-slate-700/50">
                        {owned ? (
                            <button disabled className="w-full py-2 bg-green-500/20 text-green-400 rounded-lg font-bold flex items-center justify-center gap-2 cursor-default">
                                <Check size={18} /> Owned
                            </button>
                        ) : locked ? (
                            <button disabled className="w-full py-2 bg-slate-800 text-slate-500 rounded-lg font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                                <Lock size={18} /> Locked
                            </button>
                        ) : (
                            <button 
                                onClick={() => buyEquipment(item)}
                                disabled={!canAfford}
                                className={`w-full py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                                    canAfford 
                                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/50' 
                                        : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                }`}
                            >
                                <ShoppingCart size={18} />
                                {canAfford ? `$${item.cost.toLocaleString()}` : 'Not Enough Cash'}
                            </button>
                        )}
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};