import Song from './models/Song';
import SlotItem from './models/SlotItem'
import User from './models/User';

export interface RootState {
  connected: boolean;
}

export interface SlotMachineState {
  results: number[];
  open: boolean;
  audio: Map<String, HTMLAudioElement>;
  isSpinning: boolean;
  won: boolean;
  items: SlotItem[];
  itemId: number,
  payout: number
}

export interface CommandsState {
  values: string[];
  open: boolean;
}

export interface SessionState {
  user: User;
  credits: number;
}

export interface YoutubePlayerState {
  open: boolean;
  editMode: boolean;
  videoId: string;
  itemId: number;
}

export interface TwitchPlayerState {
  open: boolean;
  channel: string;
}

export interface JukeboxState {
  open: boolean;
  playing: boolean;
  playlist: Song[];
  currentIndex: number;
}