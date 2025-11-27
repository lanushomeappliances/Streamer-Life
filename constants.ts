import { UpdateLog, Equipment, GameEvent, Relationship, StreamCategory, OtherStreamer } from './types';

export const INITIAL_RELATIONSHIPS: Relationship[] = [
  { id: 'rel_mom', name: 'Mom', type: 'Family', level: 80, avatar: '👩' },
  { id: 'rel_bestie', name: 'Alex (Bestie)', type: 'Friend', level: 60, avatar: '🧑‍💻' },
  { id: 'rel_mod', name: 'NightBot_Human', type: 'Mod', level: 40, avatar: '🛡️' },
];

export const MOCK_STREAMERS: OtherStreamer[] = [
  { id: 'st_1', name: 'NinjaTuna', avatar: '🐟', followers: 1500000, isLive: true, relationship: 10, niche: 'Gaming' },
  { id: 'st_2', name: 'CozyTea', avatar: '🍵', followers: 890000, isLive: false, relationship: 30, niche: 'Chatting' },
  { id: 'st_3', name: 'SpeedRacer', avatar: '🏎️', followers: 450000, isLive: true, relationship: 0, niche: 'Gaming' },
  { id: 'st_4', name: 'TravelBug', avatar: '✈️', followers: 320000, isLive: false, relationship: 5, niche: 'IRL' },
  { id: 'st_5', name: 'CodeWizard', avatar: '🧙‍♂️', followers: 120000, isLive: true, relationship: 0, niche: 'Chatting' },
  { id: 'st_6', name: 'FitnessFreak', avatar: '💪', followers: 98000, isLive: false, relationship: 0, niche: 'IRL' },
];

export const INITIAL_STATE = {
  day: 1,
  money: 100,
  followers: 10,
  subscribers: 0,
  totalViews: 0,
  energy: 100,
  mood: 100,
  xp: 0,
  level: 1,
  relationships: INITIAL_RELATIONSHIPS,
  otherStreamers: MOCK_STREAMERS,
  activeSponsorship: null,
  sponsorshipStreamsLeft: 0,
  equipment: {
    camera: 1,
    mic: 1,
    pc: 1,
    lighting: 1,
  },
  gameHistory: [],
};

export const MAX_STATS = 100;
export const ENERGY_COST_PER_TICK = 0.5;
export const MOOD_COST_PER_TICK = 0.3;

export const EQUIPMENT_LIST: Equipment[] = [
  { id: 'cam_1', name: 'Webcam 720p', type: 'camera', level: 1, cost: 0, effect: 'Basic quality', statBonus: 1 },
  { id: 'cam_2', name: 'HD Webcam 1080p', type: 'camera', level: 2, cost: 500, effect: '+20% View Growth', statBonus: 1.2 },
  { id: 'cam_3', name: 'DSLR Setup', type: 'camera', level: 3, cost: 2000, effect: '+50% View Growth', statBonus: 1.5 },
  
  { id: 'mic_1', name: 'Headset Mic', type: 'mic', level: 1, cost: 0, effect: 'Noisy audio', statBonus: 1 },
  { id: 'mic_2', name: 'USB Condenser', type: 'mic', level: 2, cost: 300, effect: '+15% Retention', statBonus: 1.15 },
  { id: 'mic_3', name: 'XLR Studio Mic', type: 'mic', level: 3, cost: 1200, effect: '+40% Retention', statBonus: 1.4 },

  { id: 'pc_1', name: 'Office Laptop', type: 'pc', level: 1, cost: 0, effect: 'Laggy streams', statBonus: 1 },
  { id: 'pc_2', name: 'Gaming Desktop', type: 'pc', level: 2, cost: 1500, effect: 'Stable 60fps', statBonus: 1.3 },
  { id: 'pc_3', name: 'Dual PC Setup', type: 'pc', level: 3, cost: 4000, effect: 'Pro Quality', statBonus: 1.6 },

  { id: 'light_1', name: 'Desk Lamp', type: 'lighting', level: 1, cost: 0, effect: 'Dark shadows', statBonus: 1 },
  { id: 'light_2', name: 'Ring Light', type: 'lighting', level: 2, cost: 150, effect: 'Better face lighting', statBonus: 1.1 },
  { id: 'light_3', name: 'Key Lights', type: 'lighting', level: 3, cost: 600, effect: 'Studio Look', statBonus: 1.25 },
];

export const STREAM_CATEGORIES: StreamCategory[] = [
  { 
    id: 'GAMING', 
    name: 'Gaming', 
    description: 'High energy cost, but fast follower growth.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-at-night-4029-large.mp4',
    energyCostMod: 1.5,
    moodCostMod: 1.0,
    viewMod: 1.3,
    moneyMod: 1.0
  },
  { 
    id: 'CHATTING', 
    name: 'Just Chatting', 
    description: 'Connect with fans. Low energy, high mood cost.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-video-call-at-home-42407-large.mp4',
    energyCostMod: 0.8,
    moodCostMod: 1.5,
    viewMod: 1.0,
    moneyMod: 1.5 // Higher donation chance
  },
  { 
    id: 'IRL', 
    name: 'IRL Adventure', 
    description: 'High risk, high reward. Unpredictable.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-people-walking-in-a-busy-city-street-4395-large.mp4',
    energyCostMod: 1.2,
    moodCostMod: 1.2,
    viewMod: 1.5,
    moneyMod: 1.2
  }
];

export const CHAT_MESSAGES = [
  "PogChamp", "LUL", "Nice stream!", "Can you play Minecraft?", "Hello from Brazil!", 
  "First!", "Lag?", "OMG the play!", "Hi streamer", "Notice me pls", "Clip that!", 
  "What specs?", "Clean setup", "GG", "F in chat", "KEKW", "monkaS", "HYPE"
];

export const DONATION_MESSAGES = [
  "Love the stream, keep it up!",
  "Here is for a coffee.",
  "Your streams make my day better.",
  "Check out my mixtape?",
  "Happy birthday!",
  "Rent money gone, worth it.",
];

export const RANDOM_EVENTS: GameEvent[] = [
  {
    id: 'evt_mom_call',
    title: 'Incoming Call',
    description: 'Your mom is calling to ask why you haven\'t visited lately.',
    npcName: 'Mom',
    npcAvatar: '👩',
    options: [
      { 
        text: 'Pick up and chat', 
        outcomeText: 'You talked for an hour. She\'s happy, but you\'re tired.', 
        changes: { mood: 10, energy: -20, relationshipId: 'rel_mom', relationshipChange: 15 } 
      },
      { 
        text: 'Ignore it', 
        outcomeText: 'She left a sad voicemail.', 
        changes: { mood: -10, relationshipId: 'rel_mom', relationshipChange: -15 } 
      }
    ]
  },
  {
    id: 'evt_mod_drama',
    title: 'Mod Drama',
    description: 'Your head mod is fighting with a long-time viewer in the Discord.',
    npcName: 'NightBot_Human',
    npcAvatar: '🛡️',
    options: [
      { 
        text: 'Back the Mod', 
        outcomeText: 'Mod feels supported. Viewer banned.', 
        changes: { relationshipId: 'rel_mod', relationshipChange: 20, followers: -5 } 
      },
      { 
        text: 'Stay Neutral', 
        outcomeText: 'They both got mad at your indecision.', 
        changes: { relationshipId: 'rel_mod', relationshipChange: -10, mood: -10 } 
      }
    ]
  },
  {
    id: 'evt_bestie_collab',
    title: 'Collab Request',
    description: 'Alex wants to stream together tonight.',
    npcName: 'Alex',
    npcAvatar: '🧑‍💻',
    options: [
      { 
        text: 'Let\'s do it!', 
        outcomeText: 'Great stream! Shared some viewers.', 
        changes: { relationshipId: 'rel_bestie', relationshipChange: 15, followers: 50, energy: -15 } 
      },
      { 
        text: 'Too busy', 
        outcomeText: 'Alex understands, but is disappointed.', 
        changes: { relationshipId: 'rel_bestie', relationshipChange: -5 } 
      }
    ]
  }
];

export const EDUCATIONAL_EVENTS: GameEvent[] = [
    {
        id: 'edu_burnout',
        title: 'Real Talk: Burnout',
        description: 'Did you know? 45% of content creators report suffering from severe burnout. It is not just being tired; it is emotional exhaustion.',
        npcName: 'Vesni (Dev)',
        npcAvatar: '🎓',
        isEducational: true,
        options: [
            {
                text: 'Thanks for the tip',
                outcomeText: 'You took a moment to breathe.',
                changes: { mood: 5 }
            }
        ]
    },
    {
        id: 'edu_taxes',
        title: 'Real Talk: Taxes',
        description: 'Reminder: Donation income is taxable! Always save ~30% of your earnings for tax season.',
        npcName: 'Accountant',
        npcAvatar: '📊',
        isEducational: true,
        options: [
            {
                text: 'Good to know',
                outcomeText: 'You noted this in your budget.',
                changes: { xp: 10 }
            }
        ]
    }
];

export const SPONSORSHIP_EVENTS: GameEvent[] = [
  {
    id: 'spon_energy_drink',
    title: 'Sponsorship Offer',
    description: 'Bolt Energy wants you to drink their "Radioactive Blue" flavor on stream.',
    npcName: 'Bolt Energy Rep',
    npcAvatar: '⚡',
    isSponsorship: true,
    options: [
      {
        text: 'Accept Deal ($500)',
        outcomeText: 'You signed the contract. Cash in hand, but you have to shill it.',
        changes: { 
          money: 500, 
          sponsorship: { id: 'spon_bolt', name: 'Bolt Energy', offerAmount: 500, duration: 3, cpmBonus: 1.5 } 
        }
      },
      {
        text: 'Reject',
        outcomeText: 'You kept your integrity.',
        changes: { mood: 5 }
      }
    ]
  },
  {
    id: 'spon_vpn',
    title: 'Sponsorship Offer',
    description: 'SecureNet VPN wants a 60-second ad read mid-stream.',
    npcName: 'SecureNet',
    npcAvatar: '🔒',
    isSponsorship: true,
    options: [
      {
        text: 'Accept Deal ($1200)',
        outcomeText: 'Big money! Viewers might find it annoying though.',
        changes: { 
          money: 1200, 
          sponsorship: { id: 'spon_vpn', name: 'SecureNet VPN', offerAmount: 1200, duration: 5, cpmBonus: 2.0 } 
        }
      },
      {
        text: 'Reject',
        outcomeText: 'Passed on the offer.',
        changes: {}
      }
    ]
  }
];

export const UPDATE_LOGS: UpdateLog[] = [
  {
    version: "v1.4.1",
    date: "Nov 13, 2023",
    title: "Community & Leaderboards",
    changes: [
      "Added Community Hub: Discover other streamers.",
      "Global Leaderboards: Compete for the top spot.",
      "Social Actions: Donate or request collabs with NPCs.",
      "Bug Fixes: Fixed dashboard layout issues."
    ]
  },
  {
    version: "v1.4.0",
    date: "Nov 12, 2023",
    title: "Content & Contracts",
    changes: [
      "Stream Content System: Choose between Gaming, Just Chatting, or IRL.",
      "Dynamic Backgrounds: Video changes based on your content type.",
      "Full Sponsorship System: Manage contracts and track obligations.",
      "Educational Popups: 'Real Talk' events teaching creator economy basics.",
      "UI Polish: New pre-stream setup screen."
    ]
  },
  {
    version: "v1.3.0",
    date: "Nov 05, 2023",
    title: "Relationships & Business",
    changes: [
      "New Dialogue System: Interact with Mom, Mods, and Friends.",
      "Sponsorships: Get paid to sell out!",
      "New Intro Screen: Added a cool startup sequence.",
      "Stream Upgrade: Background video is now live.",
      "UI Polish: Improved dashboard and event modals."
    ]
  },
  {
    version: "v1.2.0",
    date: "Oct 26, 2023",
    title: "The Social Update",
    changes: [
      "Added Multiplayer Social Features (Mockup).",
      "New Donation System: Viewers can now donate varying amounts.",
      "Relationship System: Backend prep for NPC interactions.",
      "Fixed bug where energy didn't deplete during 24h streams."
    ]
  },
  {
    version: "v1.1.5",
    date: "Oct 10, 2023",
    title: "Equipment Overhaul",
    changes: [
      "Added 3 new tiers of Lighting equipment.",
      "Rebalanced PC cost scaling.",
      "Introduced 'Stability' stat for better retention.",
      "UI Polish: Dark mode contrast improvements."
    ]
  },
  {
    version: "v1.0.0",
    date: "Sept 15, 2023",
    title: "Initial Launch",
    changes: [
      "Core Game Loop: Stream -> Sleep -> Upgrade.",
      "Basic Analytics Dashboard.",
      "Burnout mechanics implemented.",
      "Shop system for Camera, Mic, and PC."
    ]
  }
];