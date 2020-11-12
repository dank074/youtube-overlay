import { Module, MutationTree } from 'vuex';
import { CommandsState, RootState } from './../types';

const state: CommandsState = {
  values: [],
  open: false
}

const namespaced: boolean = true;

const mutations: MutationTree<CommandsState> = {
  setCommands(state, commands: string[]) {
    state.values = commands;
  },
  setOpen(state, open: boolean) {
    state.open = open;
  }
}

export const commands: Module<CommandsState, RootState> = {
  namespaced,
  state,
  mutations
}