<template>
  <div
    class="box_body"
    style="border: none;background-color: #000;"
    v-if="data.twitch.open == true"
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
import { Component, Prop, Vue } from "vue-property-decorator";
import Store from "@/store/Store";

@Component
export default class TwitchVideoComponent extends Vue {
  data() {
    return {
      data: Store.GetInstance()
    };
  }

  getVideoUrl(): string {
    return "https://player.twitch.tv/?channel=" + Store.GetInstance().twitch.channel + "&parent=" + window.location.hostname + "&autoplay=true&muted=false"
  }
}
</script>