import React, { useState, useEffect, useCallback } from 'react';
import { GameState, GamePhase, View, Equipment, DialogueOption, GameEvent, StreamConfig, OtherStreamer } from './types';
import { INITIAL_STATE, ENERGY_COST_PER_TICK, MOOD_COST_PER_TICK, MAX_STATS, RANDOM_EVENTS, SPONSORSHIP_EVENTS, EDUCATIONAL_EVENTS, STREAM_CATEGORIES } from './constants';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { StreamView } from './components/StreamView';
import { Upgrades } from './components/Upgrades';
import { Analytics } from './components/Analytics';
import { Updates } from './components/Updates';
import { Community } from './components/Community';
import { Intro } from './components/Intro';
import { DialogueModal } from './components/DialogueModal';
import { StreamSetup } from './components/StreamSetup';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  // --- State ---
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [phase, setPhase] = useState<GamePhase>(GamePhase.INTRO); // Start with Intro
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Event System State
  const [currentEvent, setCurrentEvent] = useState<GameEvent | null>(null);

  // Streaming State
  const [streamConfig, setStreamConfig] = useState<StreamConfig>({ title: '', category: 'GAMING' });
  const [elapsedStreamTime, setElapsedStreamTime] = useState(0); // in simulated minutes
  const [sessionEarnings, setSessionEarnings] = useState(0);
  const [sessionFollowers, setSessionFollowers] = useState(0);
  const [sessionViews, setSessionViews] = useState(0);

  // --- Game Loop (Streaming) ---
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (phase === GamePhase.STREAMING) {
      interval = setInterval(() => {
        setElapsedStreamTime(prev => prev + 1);

        // Get Category Modifiers
        const cat = STREAM_CATEGORIES.find(c => c.id === streamConfig.category) || STREAM_CATEGORIES[0];

        // Stats Decay with Modifiers
        setGameState(prev => {
           const energyDecay = ENERGY_COST_PER_TICK * cat.energyCostMod * (1 + Math.random() * 0.2);
           const moodDecay = MOOD_COST_PER_TICK * cat.moodCostMod * (1 + Math.random() * 0.2);
           
           const newEnergy = Math.max(0, prev.energy - energyDecay);
           const newMood = Math.max(0, prev.mood - moodDecay);
           
           if (newEnergy <= 0 || newMood <= 0) {
             // Force end stream if burnout
             handleEndStream(true);
           }

           return {
             ...prev,
             energy: newEnergy,
             mood: newMood
           };
        });

        // Gain Resources Calculation
        // Factor 1: Equipment Quality
        const qualityMultiplier = 
            (gameState.equipment.camera * 0.4) + 
            (gameState.equipment.mic * 0.3) + 
            (gameState.equipment.pc * 0.2) + 
            (gameState.equipment.lighting * 0.1);
        
        // Factor 2: Base Fanbase
        const baseViewerCount = Math.max(5, Math.floor(gameState.followers * 0.05));
        
        // Factor 3: Random Hype & Category & Sponsorship
        const hype = Math.random() * 2;
        const sponBonus = gameState.activeSponsorship ? 1.2 : 1.0;
        const catViewBonus = cat.viewMod;

        const currentViewers = Math.floor(baseViewerCount * qualityMultiplier * hype * sponBonus * catViewBonus);
        
        // Accumulate logic
        setSessionViews(prev => Math.floor((currentViewers + prev) / 2)); // Rolling averageish for view count
        
        // Followers gain probability
        if (Math.random() > 0.6) {
             setSessionFollowers(prev => prev + Math.floor(Math.random() * qualityMultiplier * 2 * cat.viewMod));
        }

        // Money: Ads (Viewers) + Subs/Donations (Random)
        let cpm = 0.5 * cat.moneyMod;
        if (gameState.activeSponsorship) cpm *= gameState.activeSponsorship.cpmBonus;

        const adRevenue = (currentViewers / 1000) * cpm; 
        let donation = 0;
        if (Math.random() > 0.95) donation = Math.floor(Math.random() * 5 * cat.moneyMod) + 1;
        
        setSessionEarnings(prev => prev + adRevenue + donation);

      }, 100); // 100ms real time = 1 min game time (fast paced)
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, gameState.equipment, gameState.followers, gameState.activeSponsorship, streamConfig]);

  // --- Actions ---

  const handleOpenSetup = () => {
    if (gameState.energy < 10 || gameState.mood < 10) return;
    setPhase(GamePhase.SETUP);
  };

  const handleStartStream = (config: StreamConfig) => {
    setStreamConfig(config);
    setPhase(GamePhase.STREAMING);
    setElapsedStreamTime(0);
    setSessionEarnings(0);
    setSessionFollowers(0);
    setSessionViews(0);
    setIsMobileMenuOpen(false);
  };

  // Process interactions from StreamView (e.g. Player triggers a donation or sends a message)
  const handleStreamAction = (action: { type: 'DONATION' | 'MESSAGE', amount?: number }) => {
     if (action.type === 'DONATION' && action.amount) {
         // Add to earnings
         setSessionEarnings(prev => prev + action.amount!);
         // Boost hype/followers slightly due to "Donation Hype"
         setSessionFollowers(prev => prev + Math.floor(action.amount! * 0.5));
     } else if (action.type === 'MESSAGE') {
         // Chatting increases engagement/retention
         setGameState(prev => ({
             ...prev,
             mood: Math.min(MAX_STATS, prev.mood + 0.5) // Chatting boosts mood slightly
         }));
     }
  };

  const handleCancelSetup = () => {
    setPhase(GamePhase.IDLE);
  };

  const handleEndStream = useCallback((forced: boolean = false) => {
    setPhase(GamePhase.IDLE);
    setCurrentView(View.DASHBOARD);
    
    setGameState(prev => {
        const totalMoney = prev.money + sessionEarnings;
        const totalFollowers = prev.followers + sessionFollowers;
        
        // Handle Sponsorship Progress
        let newSponStreamsLeft = prev.sponsorshipStreamsLeft;
        let activeSpon = prev.activeSponsorship;
        
        if (activeSpon) {
            newSponStreamsLeft = Math.max(0, newSponStreamsLeft - 1);
            if (newSponStreamsLeft === 0) {
                activeSpon = null; // Contract fulfilled
                // Could trigger a "Contract Complete" notification here
            }
        }

        // Add History Log
        const historyEntry = {
            day: prev.day,
            views: sessionViews, // Max/Avg views from session
            followersGained: sessionFollowers,
            moneyEarned: sessionEarnings
        };

        return {
            ...prev,
            money: totalMoney,
            followers: totalFollowers,
            activeSponsorship: activeSpon,
            sponsorshipStreamsLeft: newSponStreamsLeft,
            totalViews: prev.totalViews + sessionViews,
            gameHistory: [...prev.gameHistory, historyEntry]
        };
    });

    if (forced) {
        alert("STREAM ENDED: You collapsed from exhaustion! Take better care of yourself.");
    }

    // Chance for Post-Stream Event (30%)
    setTimeout(() => {
        // Higher chance for Educational events early on
        if (Math.random() > 0.7) triggerRandomEvent();
    }, 1000);
    
  }, [sessionEarnings, sessionFollowers, sessionViews]);


  const handleRest = () => {
    setGameState(prev => ({
        ...prev,
        day: prev.day + 1,
        energy: MAX_STATS,
        mood: MAX_STATS,
    }));
    setIsMobileMenuOpen(false);
    
    // Chance for Night Event (50%)
    if (Math.random() > 0.5) triggerRandomEvent();
  };

  const triggerRandomEvent = () => {
      // 1. Check for Educational Event (low level or high random)
      if (Math.random() > 0.8) {
         const eduEvent = EDUCATIONAL_EVENTS[Math.floor(Math.random() * EDUCATIONAL_EVENTS.length)];
         setCurrentEvent(eduEvent);
         return;
      }

      // 2. Check for Sponsorship
      const isSpon = Math.random() > 0.7 && !gameState.activeSponsorship;
      
      const pool = isSpon ? SPONSORSHIP_EVENTS : RANDOM_EVENTS;
      const evt = pool[Math.floor(Math.random() * pool.length)];
      setCurrentEvent(evt);
  };

  const handleEventOption = (option: DialogueOption) => {
      setGameState(prev => {
          let newState = { ...prev };
          const chg = option.changes;

          if (chg.money) newState.money += chg.money;
          if (chg.followers) newState.followers += chg.followers;
          if (chg.energy) newState.energy = Math.min(MAX_STATS, Math.max(0, newState.energy + chg.energy));
          if (chg.mood) newState.mood = Math.min(MAX_STATS, Math.max(0, newState.mood + chg.mood));
          if (chg.xp) newState.xp += chg.xp;

          if (chg.relationshipId && chg.relationshipChange) {
              newState.relationships = newState.relationships.map(r => 
                  r.id === chg.relationshipId 
                  ? { ...r, level: Math.min(100, Math.max(0, r.level + chg.relationshipChange!)) }
                  : r
              );
          }

          if (chg.sponsorship) {
              newState.activeSponsorship = chg.sponsorship;
              newState.sponsorshipStreamsLeft = chg.sponsorship.duration;
          }

          return newState;
      });
      setCurrentEvent(null);
  };

  // Community Actions
  const handleCommunityDonation = (amount: number) => {
      if (gameState.money >= amount) {
          setGameState(prev => ({ ...prev, money: prev.money - amount }));
          alert(`You donated $${amount}! You gained some reputation (hidden stat).`);
      }
  };

  const handleCommunityCollab = (partner: OtherStreamer) => {
      if (gameState.energy < 20) {
          alert("Too tired to collab right now!");
          return;
      }
      
      // Calculate success chance based on existing relationship and follower count similarity
      const followerRatio = Math.min(1, gameState.followers / (partner.followers || 1));
      const successChance = 0.3 + (partner.relationship / 200) + (followerRatio * 0.2);
      
      const success = Math.random() < successChance;

      if (success) {
          // Success: Boost stats and relationship
          setGameState(prev => {
              const updatedStreamers = prev.otherStreamers.map(s => 
                  s.id === partner.id 
                  ? { ...s, relationship: Math.min(100, s.relationship + 10) }
                  : s
              );

              return {
                  ...prev,
                  otherStreamers: updatedStreamers,
                  energy: prev.energy - 20,
                  followers: prev.followers + Math.floor(partner.followers * 0.02),
                  mood: prev.mood + 5
              };
          });
          alert(`Collab with ${partner.name} was a hit! You gained followers and they like you more.`);
      } else {
          // Fail: Cost energy and slight relationship hit
           setGameState(prev => {
              const updatedStreamers = prev.otherStreamers.map(s => 
                  s.id === partner.id 
                  ? { ...s, relationship: Math.max(0, s.relationship - 5) }
                  : s
              );

              return {
                ...prev,
                otherStreamers: updatedStreamers,
                energy: prev.energy - 10,
                mood: prev.mood - 10
              };
           });
          alert(`${partner.name} declined. "Maybe when you're bigger," they said.`);
      }
  };


  const buyEquipment = (item: Equipment) => {
    if (gameState.money >= item.cost) {
        setGameState(prev => ({
            ...prev,
            money: prev.money - item.cost,
            equipment: {
                ...prev.equipment,
                [item.type]: item.level
            }
        }));
    }
  };

  // --- Render Helpers ---

  if (phase === GamePhase.INTRO) {
      return <Intro onComplete={() => setPhase(GamePhase.IDLE)} />;
  }

  const renderContent = () => {
    if (phase === GamePhase.STREAMING) {
        return (
            <StreamView 
                gameState={gameState} 
                streamConfig={streamConfig}
                elapsedTime={elapsedStreamTime} 
                onEndStream={() => handleEndStream(false)}
                currentViewers={sessionViews} 
                onStreamAction={handleStreamAction}
            />
        );
    }

    switch (currentView) {
        case View.DASHBOARD:
            return <Dashboard gameState={gameState} startStream={handleOpenSetup} rest={handleRest} />;
        case View.UPGRADES:
            return <Upgrades gameState={gameState} buyEquipment={buyEquipment} />;
        case View.ANALYTICS:
            return <Analytics gameState={gameState} />;
        case View.COMMUNITY:
            return <Community gameState={gameState} onDonation={handleCommunityDonation} onCollab={handleCommunityCollab} />;
        case View.UPDATES:
            return <Updates />;
        default:
            return <Dashboard gameState={gameState} startStream={handleOpenSetup} rest={handleRest} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-200 font-sans overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 w-full bg-slate-900 border-b border-slate-800 z-50 px-4 py-3 flex justify-between items-center">
             <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">SL26</span>
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X /> : <Menu />}
             </button>
        </div>

        {/* Mobile Navigation Menu Overlay */}
        {isMobileMenuOpen && (
             <div className="fixed inset-0 bg-slate-900 z-40 pt-16 px-6 md:hidden animate-fade-in">
                <nav className="flex flex-col gap-4">
                    <button onClick={() => { setCurrentView(View.DASHBOARD); setIsMobileMenuOpen(false); }} className="p-4 bg-slate-800 rounded-xl font-bold">Dashboard</button>
                    <button onClick={() => { setCurrentView(View.UPGRADES); setIsMobileMenuOpen(false); }} className="p-4 bg-slate-800 rounded-xl font-bold">Shop</button>
                    <button onClick={() => { setCurrentView(View.COMMUNITY); setIsMobileMenuOpen(false); }} className="p-4 bg-slate-800 rounded-xl font-bold">Community</button>
                    <button onClick={() => { setCurrentView(View.ANALYTICS); setIsMobileMenuOpen(false); }} className="p-4 bg-slate-800 rounded-xl font-bold">Analytics</button>
                    <button onClick={() => { setCurrentView(View.UPDATES); setIsMobileMenuOpen(false); }} className="p-4 bg-slate-800 rounded-xl font-bold">Updates</button>
                </nav>
             </div>
        )}

        <Sidebar currentView={currentView} setView={setCurrentView} isStreaming={phase === GamePhase.STREAMING} />
        
        <main className="flex-1 h-screen overflow-y-auto pt-16 md:pt-0 relative">
            {renderContent()}
        </main>

        {/* Event Modal Overlay */}
        {currentEvent && (
            <DialogueModal event={currentEvent} onOptionSelect={handleEventOption} />
        )}

        {/* Stream Setup Modal Overlay */}
        {phase === GamePhase.SETUP && (
            <StreamSetup onStart={handleStartStream} onCancel={handleCancelSetup} />
        )}
    </div>
  );
};

export default App;