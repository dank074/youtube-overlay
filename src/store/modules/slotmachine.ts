import { SlotMachineState, RootState } from './../types';
import SlotItem from "../models/SlotItem";
import { Module, MutationTree } from 'vuex';

const state : SlotMachineState = {
  results: [],
  open: false,
  audio: new Map<String, HTMLAudioElement>(),
  isSpinning: false,
  won: false,
  items: [
    new SlotItem("Lemon", 3, "https://cdn4.iconfinder.com/data/icons/slot-machines/512/Lemon-512.png"), 
    new SlotItem("Melon", 8, "https://cdn4.iconfinder.com/data/icons/slot-machines/512/Watermelon-512.png"),
    new SlotItem("Grapes", 10, "https://cdn4.iconfinder.com/data/icons/slot-machines/512/Grapes-512.png"),
    new SlotItem("Cherry", 32, "https://cdn4.iconfinder.com/data/icons/slot-machines/512/Cherry-512.png"),
    new SlotItem("Bar", 64, "https://cdn4.iconfinder.com/data/icons/casino-games/512/bar-512.png")
  ],
  itemId: 0,
  payout: 0
}

const namespaced: boolean = true;

const mutations: MutationTree<SlotMachineState> = {
  initAudio(state) {
    state.audio.set("win", new Audio('https://freesound.org/data/previews/387/387232_1474204-lq.mp3'));
    state.audio.set("insertCoin", new Audio('https://freesound.org/data/previews/276/276091_5123851-lq.mp3'));
    state.audio.set("bigwin", new Audio('https://freesound.org/data/previews/270/270319_5123851-lq.mp3'));
    state.audio.set("spin", new Audio('https://freesound.org/data/previews/120/120373_824230-lq.mp3'));
    state.audio.set("spinEnd", new Audio('https://freesound.org/data/previews/145/145441_2615119-lq.mp3'));
    state.audio.set("lock", new Audio('https://freesound.org/data/previews/56/56246_91374-lq.mp3'));
  },
  setOpen(state, open: boolean) {
    state.open = open;
  },
  setSpinning(state, spinning: boolean) {
    state.isSpinning = spinning;
  },
  setWon(state, won: boolean) {
    state.won = won;
  },
  setResults(state, results: number[]) {
    state.results = results;
  },
  setItemId(state, itemId: number) {
    state.itemId = itemId;
  },
  setPayout(state, payout: number) {
    state.payout = payout;
  }
} 

export const slotmachine: Module<SlotMachineState, RootState> = {
  namespaced,
  state,
  mutations
}