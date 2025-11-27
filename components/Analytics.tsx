import React from 'react';
import { GameState } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

interface AnalyticsProps {
  gameState: GameState;
}

export const Analytics: React.FC<AnalyticsProps> = ({ gameState }) => {
  const data = gameState.gameHistory;

  if (data.length === 0) {
    return (
        <div className="p-10 flex flex-col items-center justify-center h-full text-slate-500">
            <h2 className="text-2xl font-bold mb-2">No Data Available</h2>
            <p>Stream at least once to see your performance metrics.</p>
        </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-white">Channel Analytics</h2>
        <p className="text-slate-400">Deep dive into your channel's performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* View Growth */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-6">Views per Stream</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="day" stroke="#94a3b8" label={{ value: 'Day', position: 'insideBottomRight', offset: -5 }} />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
                        <Bar dataKey="views" fill="#8884d8" name="Views" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Financials */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-6">Revenue History</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="day" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
                        <Line type="monotone" dataKey="moneyEarned" stroke="#10b981" strokeWidth={3} name="Earnings ($)" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Follower Growth */}
         <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-6">Follower Net Growth</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f472b6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#f472b6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="day" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
                        <Area type="monotone" dataKey="followersGained" stroke="#f472b6" fillOpacity={1} fill="url(#colorFollowers)" name="New Followers" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};