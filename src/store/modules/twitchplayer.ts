import { Module, MutationTree } from 'vuex';
import { TwitchPlayerState, RootState } from './../types';

const state: TwitchPlayerState = {
  open: false,
  channel: ""
}

const namespaced: boolean = true;

const mutations: MutationTree<TwitchPlayerState> = {
  setOpen(state, open: boolean) {
    state.open = open;
  },
  setChannel(state, channel: string) {
    state.channel = channel;
  }
}

export const twitchplayer: Module<TwitchPlayerState, RootState> = {
  namespaced,
  state,
  mutations
}