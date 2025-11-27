import React from 'react';
import { GameState } from '../types';
import { Play, Coffee, Battery, Smile, Users, TrendingUp, DollarSign, Heart, Zap } from 'lucide-react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  gameState: GameState;
  startStream: () => void;
  rest: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ gameState, startStream, rest }) => {
  const canStream = gameState.energy > 10 && gameState.mood > 10;
  
  // Prepare tiny chart data
  const chartData = gameState.gameHistory.slice(-5).map(h => ({
    name: `Day ${h.day}`,
    views: h.views
  }));

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 animate-fade-in pb-20">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-slate-900 rounded-3xl p-8 border border-slate-700 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 transform scale-150">
            <Zap size={150} />
        </div>
        <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
                Good Morning, Streamer! 👋
            </h1>
            <p className="text-purple-200 font-medium text-lg flex items-center gap-2">
                Day {gameState.day} <span className="w-1 h-1 bg-purple-400 rounded-full"></span> Level {gameState.level}
            </p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Money */}
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col justify-between shadow-lg hover:border-green-500/30 transition-colors">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
                <DollarSign size={16} /> <span className="text-sm font-bold uppercase tracking-wider">Balance</span>
            </div>
            <div className="text-2xl font-black text-green-400">${gameState.money.toLocaleString()}</div>
        </div>
        
        {/* Followers */}
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col justify-between shadow-lg hover:border-blue-500/30 transition-colors">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Users size={16} /> <span className="text-sm font-bold uppercase tracking-wider">Followers</span>
            </div>
            <div className="text-2xl font-black text-white">{gameState.followers.toLocaleString()}</div>
        </div>

        {/* Energy Bar */}
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col justify-between shadow-lg">
             <div className="flex items-center justify-between text-slate-400 mb-2">
                <div className="flex items-center gap-2">
                    <Battery size={16} /> <span className="text-sm font-bold uppercase tracking-wider">Energy</span>
                </div>
                <span className="text-xs font-mono">{Math.round(gameState.energy)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                    className={`h-full rounded-full transition-all duration-500 ${gameState.energy < 30 ? 'bg-red-500' : 'bg-blue-500'}`} 
                    style={{ width: `${gameState.energy}%` }}
                ></div>
            </div>
        </div>

        {/* Mood Bar */}
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex flex-col justify-between shadow-lg">
             <div className="flex items-center justify-between text-slate-400 mb-2">
                <div className="flex items-center gap-2">
                    <Smile size={16} /> <span className="text-sm font-bold uppercase tracking-wider">Health</span>
                </div>
                <span className="text-xs font-mono">{Math.round(gameState.mood)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                    className={`h-full rounded-full transition-all duration-500 ${gameState.mood < 30 ? 'bg-red-500' : 'bg-purple-500'}`} 
                    style={{ width: `${gameState.mood}%` }}
                ></div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Actions & Social */}
        <div className="lg:col-span-2 space-y-6">
             {/* Actions */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6">Today's Agenda</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                        onClick={startStream}
                        disabled={!canStream}
                        className={`p-6 rounded-xl border flex items-center gap-4 transition-all group ${
                            canStream 
                            ? 'bg-purple-600 border-purple-500 hover:bg-purple-500 hover:scale-[1.02] shadow-lg shadow-purple-900/50' 
                            : 'bg-slate-700 border-slate-600 opacity-50 cursor-not-allowed'
                        }`}
                    >
                        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                            <Play fill="white" className="text-white" size={28} />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-white text-lg">Setup Stream</div>
                            <div className="text-purple-200 text-sm">
                                {gameState.activeSponsorship 
                                    ? `Sponsored by ${gameState.activeSponsorship.name}`
                                    : 'Select game & go live!'
                                }
                            </div>
                        </div>
                    </button>

                    <button 
                        onClick={rest}
                        className="bg-slate-700 hover:bg-slate-600 border border-slate-600 p-6 rounded-xl flex items-center gap-4 transition-all group hover:scale-[1.02] shadow-lg"
                    >
                        <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Coffee className="text-yellow-400" size={28} />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-white text-lg">Rest & Sleep</div>
                            <div className="text-slate-400 text-sm">End day & restore energy</div>
                        </div>
                    </button>
                </div>
                
                {!canStream && (
                    <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm text-center font-medium animate-pulse">
                        ⚠️ You are exhausted! Get some sleep before you burn out completely.
                    </div>
                )}
            </div>
            
            {/* Relationships */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Heart size={20} className="text-pink-500" /> Relationships
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {gameState.relationships.map(rel => (
                        <div key={rel.id} className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex items-center gap-3 hover:border-slate-500 transition-colors">
                            <div className="text-3xl">{rel.avatar}</div>
                            <div className="flex-1">
                                <div className="text-sm font-bold text-white">{rel.name}</div>
                                <div className="text-xs text-slate-400 mb-1">{rel.type}</div>
                                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                    <div 
                                        className="bg-gradient-to-r from-pink-500 to-rose-400 h-1.5 rounded-full" 
                                        style={{ width: `${rel.level}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Right Column: Analytics & Sponsorships */}
        <div className="space-y-6">
            {/* Quick Analytics */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex flex-col h-[280px] shadow-xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-blue-400" /> Growth
                </h3>
                <div className="flex-1 min-h-[150px]">
                    {chartData.length > 1 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                                />
                                <Area type="monotone" dataKey="views" stroke="#8884d8" fillOpacity={1} fill="url(#colorViews)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500">
                             <TrendingUp size={48} className="mb-2 opacity-50" />
                             <p>No data yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Active Sponsorship */}
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl relative overflow-hidden">
                 {gameState.activeSponsorship ? (
                     <>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <h3 className="text-lg font-bold text-white">Active Contract</h3>
                                <p className="text-yellow-400 font-bold">{gameState.activeSponsorship.name}</p>
                            </div>
                            <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold border border-yellow-500/50">
                                ACTIVE
                            </div>
                        </div>
                        <div className="space-y-3 relative z-10">
                             <div className="flex justify-between text-sm">
                                 <span className="text-slate-400">Bonus CPM</span>
                                 <span className="text-white font-bold">+{((gameState.activeSponsorship.cpmBonus - 1) * 100).toFixed(0)}%</span>
                             </div>
                             <div className="flex justify-between text-sm">
                                 <span className="text-slate-400">Streams Left</span>
                                 <span className="text-white font-bold">{gameState.sponsorshipStreamsLeft}</span>
                             </div>
                             <div className="w-full bg-slate-700 rounded-full h-2">
                                 <div 
                                    className="bg-yellow-400 h-2 rounded-full"
                                    style={{ width: `${(1 - (gameState.sponsorshipStreamsLeft / gameState.activeSponsorship.duration)) * 100}%` }}
                                 ></div>
                             </div>
                        </div>
                        {/* Background Deco */}
                        <div className="absolute -bottom-4 -right-4 text-yellow-500/10 rotate-12">
                            <DollarSign size={100} />
                        </div>
                     </>
                 ) : (
                     <div className="text-center py-4">
                         <div className="w-12 h-12 rounded-full bg-slate-700 mx-auto flex items-center justify-center mb-2">
                             <DollarSign className="text-slate-500" />
                         </div>
                         <h3 className="font-bold text-slate-400">No Active Sponsorships</h3>
                         <p className="text-xs text-slate-500 mt-1">Wait for offers to arrive!</p>
                     </div>
                 )}
            </div>
        </div>
      </div>
    </div>
  );
};