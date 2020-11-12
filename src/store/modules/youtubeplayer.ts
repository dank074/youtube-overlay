import { Module, MutationTree } from 'vuex';
import { YoutubePlayerState, RootState } from './../types';

const state: YoutubePlayerState = {
  open: false,
  editMode: false,
  videoId: "",
  itemId: 0
}

const namespaced: boolean = true;

const mutations: MutationTree<YoutubePlayerState> = {
  setOpen(state, open: boolean) {
    state.open = open;
  },
  setEditMode(state, editMode: boolean) {
    state.editMode = editMode;
  },
  setVideoId(state, videoId: string) {
    state.videoId = videoId;
  },
  setItemId(state, itemId: number) {
    state.itemId = itemId;
  }
}

export const youtubeplayer: Module<YoutubePlayerState, RootState> = {
  namespaced,
  state,
  mutations
}