import { Module, MutationTree } from 'vuex';
import { JukeboxState, RootState } from './../types';
import Song from '@/store/models/Song';

const state: JukeboxState = {
  open: false,
  playing: false,
  playlist: [],
  currentIndex: 0
}

const namespaced: boolean = true;

const mutations: MutationTree<JukeboxState> = {
  setOpen(state, open: boolean) {
    state.open = open;
  },
  setPlaying(state, playing: boolean) {
    state.playing = playing;
  },
  setPlaylist(state, playlist: Song[]) {
    state.playlist = playlist;
  },
  addToPlaylist(state, song: Song) {
    state.playlist.push(song);
  },
  removeFromPlaylist(state, index: number) {
    state.playlist.splice(index, 1);
  },
  setCurrentIndex(state, index: number) {
    state.currentIndex = index;
  },
  incrementIndex(state) {
    state.currentIndex++;
  },
  decrementIndex(state) {
    state.currentIndex--;
  }
}

export const jukebox: Module<JukeboxState, RootState> = {
  namespaced,
  state,
  mutations
}