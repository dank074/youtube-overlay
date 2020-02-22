<template>
    <div class="box_body" style="border: none;background-color: #000;" v-if="data.youtubeVideo.open == true">
        <iframe width="560" height="315" :src="getVideoUrl()" frameborder="0" allowfullscreen allow="autoplay"></iframe>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Store from '@/store/Store';

@Component
export default class YoutubeVideoComponent extends Vue {
    data() {
      return { 
          data: Store.GetInstance()
      }
    }

    getVideoUrl(): string {
        return "https://www.youtube.com/embed/" + Store.GetInstance().youtubeVideo.videoId + "?autoplay=1"
    }
}
</script>