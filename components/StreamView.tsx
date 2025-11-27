import React, { useEffect, useRef, useState } from 'react';
import { GameState, ChatMessage, StreamConfig, StreamCategoryType } from '../types';
import { CHAT_MESSAGES, DONATION_MESSAGES, STREAM_CATEGORIES } from '../constants';
import { Users, Zap, MessageSquare, Send, DollarSign } from 'lucide-react';

interface StreamViewProps {
  gameState: GameState;
  streamConfig: StreamConfig;
  elapsedTime: number; // in mock minutes
  onEndStream: () => void;
  currentViewers: number;
  onStreamAction: (action: { type: 'DONATION' | 'MESSAGE', amount?: number }) => void;
}

export const StreamView: React.FC<StreamViewProps> = ({ gameState, streamConfig, elapsedTime, onEndStream, currentViewers, onStreamAction }) => {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  // Chat Input State
  const [inputText, setInputText] = useState('');
  const [isDonationMode, setIsDonationMode] = useState(false);
  const [donationAmount, setDonationAmount] = useState('10');

  // Get video URL based on category
  const activeCategory = STREAM_CATEGORIES.find(c => c.id === streamConfig.category);
  const videoUrl = activeCategory?.videoUrl || STREAM_CATEGORIES[0].videoUrl;

  // Generate random chat
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        const isDonation = Math.random() > 0.95;
        // Small chance for sponsor message if active
        const isSponMessage = gameState.activeSponsorship && Math.random() > 0.9;
        
        let msg: ChatMessage;

        if (isSponMessage && gameState.activeSponsorship) {
             msg = {
                id: Math.random().toString(36).substr(2, 9),
                user: gameState.activeSponsorship.name,
                type: 'spon',
                text: "Check out the link in bio! #ad",
             };
        } else {
            msg = {
                id: Math.random().toString(36).substr(2, 9),
                user: `user_${Math.floor(Math.random() * 9999)}`,
                type: isDonation ? 'donation' : 'normal',
                text: isDonation 
                    ? DONATION_MESSAGES[Math.floor(Math.random() * DONATION_MESSAGES.length)]
                    : CHAT_MESSAGES[Math.floor(Math.random() * CHAT_MESSAGES.length)],
                amount: isDonation ? Math.floor(Math.random() * 50) + 1 : 0
            };
        }

        setChat(prev => [...prev.slice(-20), msg]); // Keep last 20 messages
      }
    }, 800);

    return () => clearInterval(interval);
  }, [gameState.activeSponsorship]);

  // Auto scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chat]);

  const formatTime = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = Math.floor(mins % 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const amount = isDonationMode ? parseFloat(donationAmount) : 0;
    
    // Validate donation
    if (isDonationMode && (isNaN(amount) || amount <= 0)) {
        alert("Please enter a valid donation amount!");
        return;
    }

    const newMessage: ChatMessage = {
        id: Date.now().toString(),
        user: 'YOU (Broadcaster)',
        text: inputText,
        type: isDonationMode ? 'donation' : 'normal',
        amount: amount
    };

    setChat(prev => [...prev.slice(-20), newMessage]);
    setInputText('');

    if (isDonationMode) {
        onStreamAction({ type: 'DONATION', amount: amount });
        setIsDonationMode(false); // Reset after send
    } else {
        onStreamAction({ type: 'MESSAGE' });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full p-6 animate-fade-in">
      {/* Stream Preview Area */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-700 group">
          {/* Simulated Gameplay Video */}
          {!videoError ? (
             <video 
                key={videoUrl} // Key forces reload on change
                ref={videoRef}
                autoPlay 
                muted 
                loop 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                src={videoUrl}
                onError={() => setVideoError(true)}
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-slate-900 flex items-center justify-center">
                 <div className="text-center">
                    <div className="text-4xl mb-2">🎮</div>
                    <div className="text-slate-500 font-mono text-sm">Signal Lost (Video Failed)</div>
                    <div className="text-xs text-slate-600 mt-1">Simulating visual feed...</div>
                 </div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

          {/* Overlay UI */}
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-bold animate-pulse flex items-center gap-2 z-10">
            <span className="w-2 h-2 bg-white rounded-full"></span> LIVE
          </div>
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur text-white px-3 py-1 rounded text-sm font-mono flex items-center gap-2 border border-white/10 z-10">
            <Users size={14} /> {currentViewers.toLocaleString()}
          </div>
          <div className="absolute bottom-4 left-4 flex flex-col z-10">
             <div className="text-white font-bold text-shadow-lg text-lg truncate max-w-md">{streamConfig.title}</div>
             <div className="flex items-center gap-2">
                 <div className="bg-purple-600 px-2 py-0.5 rounded text-xs font-bold text-white uppercase">{activeCategory?.name}</div>
                 <div className="bg-black/60 backdrop-blur text-white px-3 py-1 rounded text-xs font-mono border border-white/10">
                   {formatTime(elapsedTime)}
                 </div>
             </div>
          </div>

          {/* Active Sponsorship Overlay */}
          {gameState.activeSponsorship && (
            <div className="absolute top-16 right-4 bg-yellow-500/90 text-black px-3 py-2 rounded-lg text-xs font-bold border border-yellow-400 z-10 flex flex-col shadow-lg animate-bounce-slow max-w-[150px]">
               <div className="uppercase text-[10px] opacity-70 mb-1">Sponsored by</div>
               <div className="truncate w-full">{gameState.activeSponsorship.name}</div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl border border-slate-700 transition-colors text-left group">
            <Zap className="text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-semibold text-slate-200">Hype Chat</div>
            <div className="text-xs text-slate-500">Costs 5 Energy</div>
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 p-4 rounded-xl border border-slate-700 transition-colors text-left group">
            <MessageSquare className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-semibold text-slate-200">Ask Question</div>
            <div className="text-xs text-slate-500">Boosts Engagement</div>
          </button>
           <button 
             onClick={onEndStream}
             className="bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/50 p-4 rounded-xl border border-red-500/30 transition-all text-left group col-span-2 flex items-center justify-between"
           >
             <div>
                <div className="text-sm font-bold text-red-400">End Stream</div>
                <div className="text-xs text-red-300/50">Save progress & finish</div>
             </div>
             <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold shadow-lg shadow-red-500/20">
                STOP
             </div>
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-full lg:w-96 bg-slate-900 rounded-xl border border-slate-800 flex flex-col h-[600px] lg:h-auto shadow-xl">
        <div className="p-4 border-b border-slate-800 font-bold flex justify-between items-center bg-slate-800/50 rounded-t-xl">
          <span>Stream Chat</span>
          <span className="text-xs text-slate-400">Slow Mode: Off</span>
        </div>
        
        <div 
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm relative"
        >
           <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-slate-900 to-transparent z-10 pointer-events-none"></div>
          {chat.map((msg) => (
            <div key={msg.id} className={`break-words ${
                msg.type === 'donation' ? 'bg-green-900/20 border border-green-500/30 p-2 rounded' : 
                msg.type === 'spon' ? 'bg-yellow-900/20 border border-yellow-500/30 p-2 rounded' : ''
            }`}>
              <span className={`font-bold mr-2 ${
                msg.type === 'sub' ? 'text-purple-400' : 
                msg.type === 'donation' ? 'text-green-400' : 
                msg.type === 'spon' ? 'text-yellow-400' : 
                msg.user.includes('YOU') ? 'text-blue-400' : 'text-slate-400'
              }`}>
                {msg.user}:
              </span>
              <span className="text-slate-200">
                {msg.type === 'donation' && <span className="font-bold block text-green-300">${msg.amount} </span>}
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* Active Chat Input */}
        <div className="p-3 border-t border-slate-800 bg-slate-800/30 flex flex-col gap-2">
          {/* Donation Mode Toggle */}
          {isDonationMode && (
              <div className="flex items-center gap-2 bg-green-900/20 p-2 rounded border border-green-500/20 animate-fade-in">
                  <span className="text-xs font-bold text-green-400 uppercase">Amount:</span>
                  <div className="relative flex-1">
                      <span className="absolute left-2 top-1.5 text-slate-400 text-sm">$</span>
                      <input 
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 pl-5 text-sm text-white"
                      />
                  </div>
              </div>
          )}

          <div className="flex gap-2">
              <button 
                onClick={() => setIsDonationMode(!isDonationMode)}
                className={`p-2 rounded transition-colors ${isDonationMode ? 'bg-green-600 text-white shadow-lg shadow-green-900/50' : 'bg-slate-800 text-slate-400 hover:text-green-400'}`}
                title="Send Donation"
              >
                  <DollarSign size={20} />
              </button>
              
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isDonationMode ? "Enter donation message..." : "Say something to chat..."}
                className={`flex-1 bg-slate-950 border rounded px-3 py-2 text-sm text-white focus:outline-none transition-colors ${isDonationMode ? 'border-green-500/50 focus:border-green-500' : 'border-slate-700 focus:border-purple-500'}`}
              />
              
              <button 
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className={`p-2 rounded transition-colors ${inputText.trim() ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
              >
                  <Send size={18} />
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};