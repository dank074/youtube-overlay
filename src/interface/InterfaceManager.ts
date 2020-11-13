import store from '@/store/Store';
import Vue from 'vue'
import App from './App.vue'

export default class InterfaceManager {
    private _container?: Vue;
    private _bus: Vue;

    constructor() {
        this._bus = new Vue();

        Vue.config.productionTip = false
        Vue.config.devtools = true
    }

    public initInterface(): void {
        this._container = new Vue({
            store,
            render: h => h(App)
        }).$mount("#app");
        this.container.$store.commit('slotmachine/initAudio');
    }

    public get container() : Vue {
        return this._container!;
    }

    public get bus() : Vue {
        return this._bus;
    }
}