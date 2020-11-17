<template>
  <div id="app">
    <YoutubeComponent v-if="youtubeplayer.open"/>
    <SlotMachineComponent v-if="slotmachine.open"/>
    <CommandsComponent v-if="commands.open"/>
    <JukeboxComponent v-if="jukebox.open"/>
    <JukeboxYoutubeComponent />
    <TwitchComponent v-if="twitchplayer.open"/>
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
import { State } from 'vuex-class';
import { CommandsState, JukeboxState, SlotMachineState, TwitchPlayerState, YoutubePlayerState } from '@/store/types';

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
export default class App extends Vue {
  @State('youtubeplayer') youtubeplayer!: YoutubePlayerState;
  @State('commands') commands!: CommandsState;
  @State('twitchplayer') twitchplayer!: TwitchPlayerState;
  @State('slotmachine') slotmachine!: SlotMachineState;
  @State('jukebox') jukebox!: JukeboxState;
}
</script>

<style lang="scss">
@import '../assets/app.scss';
</style>
