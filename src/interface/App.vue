<template>
  <div id="app">
    <YoutubeComponent />
    <SlotMachineComponent />
    <CommandsComponent />
    <JukeboxComponent />
    <JukeboxYoutubeComponent />
    <TwitchComponent />
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import YoutubeComponent from "./components/youtube/YoutubeComponent.vue";
import SlotMachineComponent from "./components/slot-machine/SlotMachineComponent.vue";
import CommandsComponent from "./components/CommandsComponent.vue";
import JukeboxComponent from "./components/jukebox/JukeboxComponent.vue";
import JukeboxYoutubeComponent from "./components/jukebox/JukeboxYoutubeComponent.vue";
import TwitchComponent from "./components/twitch/TwitchComponent.vue";
import Vue from "vue";

@Component({
  components: {
    YoutubeComponent,
    SlotMachineComponent,
    CommandsComponent,
    JukeboxComponent,
    JukeboxYoutubeComponent,
    TwitchComponent,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '../assets/app.scss';
</style>
