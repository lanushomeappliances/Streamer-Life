import React, { useState } from 'react';
import { GameState, OtherStreamer } from '../types';
import { Trophy, Globe, UserPlus, Heart, Video, DollarSign, Radio } from 'lucide-react';

interface CommunityProps {
  gameState: GameState;
  onDonation: (amount: number) => void;
  onCollab: (partner: OtherStreamer) => void;
}

export const Community: React.FC<CommunityProps> = ({ gameState, onDonation, onCollab }) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'discover'>('leaderboard');

  // Merge player into leaderboard
  const playerEntry = {
    id: 'player',
    name: 'YOU',
    avatar: '😎',
    followers: gameState.followers,
    isLive: false,
    relationship: 0,
    niche: 'Gaming',
    rank: 0
  };

  const allStreamers = [...gameState.otherStreamers, playerEntry].sort((a, b) => b.followers - a.followers);
  
  // Assign Ranks
  const rankedStreamers = allStreamers.map((s, index) => ({ ...s, rank: index + 1 }));

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-fade-in pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-white">Community Hub 🌍</h2>
            <p className="text-slate-400">Connect with other creators and climb the ranks.</p>
          </div>
          
          <div className="flex bg-slate-800 p-1 rounded-xl">
             <button 
               onClick={() => setActiveTab('leaderboard')}
               className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'leaderboard' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
             >
                Leaderboard
             </button>
             <button 
               onClick={() => setActiveTab('discover')}
               className={`px-6 py-2 rounded-lg font-bold transition-all ${activeTab === 'discover' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
             >
                Discover
             </button>
          </div>
      </div>

      {activeTab === 'leaderboard' && (
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
              <div className="grid grid-cols-12 bg-slate-900/50 p-4 font-bold text-slate-500 text-sm uppercase tracking-wider border-b border-slate-700">
                  <div className="col-span-2 text-center">Rank</div>
                  <div className="col-span-6">Streamer</div>
                  <div className="col-span-4 text-right">Followers</div>
              </div>
              <div className="divide-y divide-slate-700">
                  {rankedStreamers.map((s) => (
                      <div key={s.id} className={`grid grid-cols-12 p-4 items-center ${s.id === 'player' ? 'bg-purple-900/20 border-l-4 border-purple-500' : 'hover:bg-slate-700/50'}`}>
                          <div className="col-span-2 flex justify-center">
                              {s.rank === 1 ? <Trophy className="text-yellow-400" /> : 
                               s.rank === 2 ? <Trophy className="text-slate-400" /> :
                               s.rank === 3 ? <Trophy className="text-amber-700" /> :
                               <span className="font-mono font-bold text-slate-500">#{s.rank}</span>
                              }
                          </div>
                          <div className="col-span-6 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl">
                                  {s.avatar}
                              </div>
                              <div>
                                  <div className={`font-bold ${s.id === 'player' ? 'text-purple-400' : 'text-white'}`}>{s.name}</div>
                                  <div className="text-xs text-slate-500">{s.niche as string}</div>
                              </div>
                          </div>
                          <div className="col-span-4 text-right font-mono text-slate-300">
                              {s.followers.toLocaleString()}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {activeTab === 'discover' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameState.otherStreamers.map((s) => (
                  <div key={s.id} className="bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col shadow-lg hover:border-purple-500/50 transition-colors group">
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                              <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center text-3xl border-2 border-slate-600 group-hover:border-purple-500 transition-colors">
                                  {s.avatar}
                              </div>
                              <div>
                                  <h3 className="font-bold text-white text-lg">{s.name}</h3>
                                  <div className="flex items-center gap-2">
                                      <span className="text-xs bg-slate-900 px-2 py-0.5 rounded text-slate-400 border border-slate-700">{s.niche}</span>
                                      {s.isLive && (
                                          <span className="flex items-center gap-1 text-xs text-red-500 font-bold uppercase animate-pulse">
                                              <Radio size={10} /> Live
                                          </span>
                                      )}
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded-xl mb-6">
                          <div className="text-center flex-1 border-r border-slate-700">
                              <div className="text-xs text-slate-500 uppercase">Followers</div>
                              <div className="font-bold text-white">{s.followers >= 1000000 ? (s.followers/1000000).toFixed(1) + 'M' : (s.followers/1000).toFixed(1) + 'K'}</div>
                          </div>
                          <div className="text-center flex-1">
                              <div className="text-xs text-slate-500 uppercase">Relationship</div>
                              <div className={`font-bold ${s.relationship > 50 ? 'text-green-400' : 'text-slate-300'}`}>{s.relationship}/100</div>
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-auto">
                           <button 
                             onClick={() => onDonation(100)}
                             disabled={gameState.money < 100}
                             className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 border ${
                                 gameState.money >= 100 
                                 ? 'bg-slate-700 border-slate-600 hover:bg-green-900/20 hover:text-green-400 hover:border-green-500' 
                                 : 'bg-slate-800 border-slate-700 opacity-50 cursor-not-allowed'
                             }`}
                           >
                               <DollarSign size={16} /> Donate $100
                           </button>
                           
                           <button 
                             onClick={() => onCollab(s)}
                             className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50"
                           >
                               <UserPlus size={16} /> Collab
                           </button>
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
};