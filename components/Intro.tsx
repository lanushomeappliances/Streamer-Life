import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

interface IntroProps {
  onComplete: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden font-mono">
      {/* Background Glitch Effect */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://media.giphy.com/media/xT9IgusfDcqpPFzjdS/giphy.gif')] bg-cover bg-center pointer-events-none"></div>
      
      <div className="z-10 text-center space-y-6">
        <div className={`transition-all duration-700 transform ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
           <h1 className="text-6xl md:text-8xl font-black italic bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 tracking-tighter drop-shadow-2xl">
             SL26
           </h1>
           <p className="text-slate-400 text-sm tracking-[0.5em] uppercase mt-2">Simulation Loaded</p>
        </div>

        <div className={`space-y-2 transition-all duration-700 delay-300 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 text-green-400 justify-center">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>System: ONLINE</span>
          </div>
          <div className="flex items-center gap-2 text-blue-400 justify-center">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></span>
            <span>Network: SECURE</span>
          </div>
        </div>

        <div className={`pt-8 transition-all duration-500 delay-500 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <button 
            onClick={onComplete}
            className="group relative px-8 py-4 bg-white text-black font-black text-xl uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all duration-300"
          >
            <span className="absolute inset-0 w-full h-full border-2 border-white transform translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></span>
            <div className="relative flex items-center gap-3">
              <Play fill="currentColor" size={24} />
              Start Career
            </div>
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-8 text-slate-600 text-xs">
        v1.3.0 | Created by Vesni
      </div>
    </div>
  );
};