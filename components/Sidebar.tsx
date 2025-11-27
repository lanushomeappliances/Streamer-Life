import React from 'react';
import { View } from '../types';
import { LayoutDashboard, ShoppingBag, BarChart2, BookOpen, Globe } from 'lucide-react';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  isStreaming: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isStreaming }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: View.UPGRADES, label: 'Shop & Gear', icon: <ShoppingBag size={20} /> },
    { id: View.COMMUNITY, label: 'Community', icon: <Globe size={20} /> },
    { id: View.ANALYTICS, label: 'Analytics', icon: <BarChart2 size={20} /> },
    { id: View.UPDATES, label: 'Updates', icon: <BookOpen size={20} /> },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 h-screen sticky top-0">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent italic">
          SL26
        </h1>
        <p className="text-xs text-slate-400 mt-1">Dev by Vesni</p>
      </div>

      <nav className="flex-1 py-6 space-y-2 px-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            disabled={isStreaming && item.id !== View.DASHBOARD}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              currentView === item.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            } ${isStreaming && item.id !== View.DASHBOARD ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {item.icon}
            <span className="font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Current Version</p>
          <p className="font-mono text-xs text-green-400">v1.4.1 (Beta)</p>
        </div>
      </div>
    </div>
  );
};