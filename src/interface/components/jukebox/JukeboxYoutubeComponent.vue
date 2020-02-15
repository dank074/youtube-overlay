<template>
    <div style="border: none;background-color: #000;display:none;">
        <div id="jukebox-player"> </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Store from '@/store/Store';
import YouTubePlayer from 'youtube-player';

@Component
export default class JukeboxYoutubeComponent extends Vue {
    player: any = undefined;
    stateNames = {
        '-1': 'unstarted',
        0: 'ended',
        1: 'playing',
        2: 'paused',
        3: 'buffering',
        5: 'video cued'
    };

    data() {
      return { 
          data: Store.GetInstance()
      }
    }

    mounted() {
        this.player = YouTubePlayer('jukebox-player');
        this.player.on('ready', ()=>  {
            console.log('Player1 is ready.');
        });
        this.player.on('stateChange', function (event:any) {
            if (event.data == 0) {
                console.log("ended video");
            }
        });
    }

    onPlaylist() {
        this.player.loadVideoById(Store.GetInstance().jukebox.playlist[0].videoId);
        this.player.playVideo();
    }

    onDisposePlaylist() {
        this.player.stopVideo();
    }
}
</script>