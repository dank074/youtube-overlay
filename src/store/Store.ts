import { RootState } from './types';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { session } from './modules/session';
import { commands } from './modules/commands';
import { jukebox } from './modules/jukebox';
import { slotmachine } from './modules/slotmachine';
import { youtubeplayer } from './modules/youtubeplayer';
import { twitchplayer } from './modules/twitchplayer';

Vue.use(Vuex);

const store: StoreOptions<RootState>  = {
    state: {
        connected: false    
    },

    modules: {
        session,
        commands,
        jukebox,
        slotmachine,
        youtubeplayer,
        twitchplayer
    },

    mutations: {
        setConnected(state: any, val: boolean)  {
            state.connected = val;
        }
    }
};

export default new Vuex.Store<RootState>(store);