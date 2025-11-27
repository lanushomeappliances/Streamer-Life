export enum GamePhase {
  IDLE = 'IDLE',
  SETUP = 'SETUP',
  STREAMING = 'STREAMING',
  BURNOUT = 'BURNOUT',
  EVENT = 'EVENT',
  INTRO = 'INTRO'
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  UPGRADES = 'UPGRADES',
  ANALYTICS = 'ANALYTICS',
  COMMUNITY = 'COMMUNITY',
  UPDATES = 'UPDATES',
  SETTINGS = 'SETTINGS'
}

export interface Equipment {
  id: string;
  name: string;
  type: 'camera' | 'mic' | 'pc' | 'lighting';
  level: number;
  cost: number;
  effect: string;
  statBonus: number; // Multiplier for quality
}

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  type: 'normal' | 'sub' | 'donation' | 'troll' | 'spon';
  amount?: number;
}

export interface Relationship {
  id: string;
  name: string;
  type: 'Friend' | 'Mod' | 'Family' | 'Brand';
  level: number; // 0-100
  avatar: string; // Emoji
}

export interface OtherStreamer {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  isLive: boolean;
  relationship: number; // 0-100
  niche: 'Gaming' | 'Chatting' | 'IRL';
}

export interface Sponsorship {
  id: string;
  name: string;
  offerAmount: number;
  duration: number; // Streams
  cpmBonus: number; // Multiplier
}

export interface StatChanges {
  money?: number;
  followers?: number;
  energy?: number;
  mood?: number;
  xp?: number;
  relationshipId?: string;
  relationshipChange?: number;
  sponsorship?: Sponsorship;
}

export interface DialogueOption {
  text: string;
  outcomeText: string;
  changes: StatChanges;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  npcName: string;
  npcAvatar?: string;
  isSponsorship?: boolean;
  isEducational?: boolean;
  options: DialogueOption[];
}

export type StreamCategoryType = 'GAMING' | 'CHATTING' | 'IRL';

export interface StreamCategory {
  id: StreamCategoryType;
  name: string;
  description: string;
  videoUrl: string;
  energyCostMod: number;
  moodCostMod: number;
  viewMod: number;
  moneyMod: number;
}

export interface StreamConfig {
  title: string;
  category: StreamCategoryType;
}

export interface GameState {
  day: number;
  money: number;
  followers: number;
  subscribers: number;
  totalViews: number;
  energy: number; // 0-100
  mood: number; // 0-100
  xp: number;
  level: number;
  relationships: Relationship[];
  otherStreamers: OtherStreamer[];
  activeSponsorship: Sponsorship | null;
  sponsorshipStreamsLeft: number;
  equipment: {
    camera: number;
    mic: number;
    pc: number;
    lighting: number;
  };
  gameHistory: {
    day: number;
    views: number;
    followersGained: number;
    moneyEarned: number;
  }[];
}

export interface UpdateLog {
  version: string;
  date: string;
  title: string;
  changes: string[];
}