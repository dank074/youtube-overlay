import { SessionState, RootState } from './../types';
import User from '../models/User';
import { Module, MutationTree } from 'vuex';

const state: SessionState = {
  user: new User(),
  credits: 0
}

const namespaced: boolean = true;

const mutations: MutationTree<SessionState> = {
  setUsername(state, val: string) {
    state.user.username = val;
  },
  setUser(state, val: User) {
    state.user = val;
  },
  setLook(state, val: string) {
    state.user.look = val;
  },
  setCredits(state, val: number) {
    state.credits = val;
  },
  setId(state, id: number) {
    state.user.id = id;
  }
}

export const session: Module<SessionState, RootState> = {
  namespaced,
  state,
  mutations 
}