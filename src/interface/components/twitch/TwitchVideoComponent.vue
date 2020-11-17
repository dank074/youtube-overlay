<template>
  <div
    class="box_body"
    style="border: none;background-color: #000;"
    v-if="twitchplayer.open"
  >
    <iframe
      :src="getVideoUrl()"
      height="315"
      width="560"
      frameborder="0"
      scrolling="false"
      allowfullscreen="true"
    ></iframe>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { State } from 'vuex-class';
import Vue from 'vue';
import { TwitchPlayerState } from '@/store/types';

@Component
export default class TwitchVideoComponent extends Vue {
  @State('twitchplayer') twitchplayer!: TwitchPlayerState;

  getVideoUrl(): string {
    return "https://player.twitch.tv/?channel=" + this.twitchplayer.channel + "&parent=" + window.location.hostname + "&autoplay=true&muted=false"
  }
}
</script>