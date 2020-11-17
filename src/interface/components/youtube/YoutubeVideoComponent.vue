<template>
    <div class="box_body" style="border: none;background-color: #000;" v-if="!youtubeplayer.editMode && youtubeplayer.open">
        <iframe width="560" height="315" :src="getVideoUrl()" frameborder="0" allowfullscreen allow="autoplay"></iframe>
    </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { State } from 'vuex-class';
import Vue from 'vue';
import { YoutubePlayerState } from '@/store/types';

@Component
export default class YoutubeVideoComponent extends Vue {
    @State('youtubeplayer') youtubeplayer!: YoutubePlayerState;

    getVideoUrl(): string {
        return "https://www.youtube.com/embed/" + this.youtubeplayer.videoId + "?autoplay=1"
    }
}
</script>