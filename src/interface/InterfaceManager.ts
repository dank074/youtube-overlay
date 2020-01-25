import Vue from 'vue'
import App from './App.vue'

export default class InterfaceManager {
    public static Container: Vue;

    public static Init() {
        Vue.config.productionTip = false
        Vue.config.devtools = true
        InterfaceManager.Container = new Vue({
            render: h => h(App)
        }).$mount("#app");
    }
}