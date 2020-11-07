<template>
    <div style="border: none;background-color: #000;display:none;">
        <div id="jukebox-player"> </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Store from '@/store/Store';
import YouTubePlayer from 'youtube-player';
import CommunicationManager from '../../../communication/CommunicationManager';
import SongEndedComposer from '../../../communication/outgoing/jukebox/SongEndedComposer';
import App from '@/App';

@Component
export default class JukeboxYoutubeComponent extends Vue {
    player: any = undefined;
    currentState: number = -1;
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
            console.log('jukebox-player ready.');
        });
        this.player.on('stateChange',  (event:any) => {
            this.currentState = event.data;
            if (event.data == 0) {
                this.onVideoEnd();
            }
        });

        App.interfaceManager.bus.$on("play", (playing: boolean) => {
            this.onPlayStop(playing);
        });

        App.interfaceManager.bus.$on("next", () => {
            this.onPlayNext();
        });

        App.interfaceManager.bus.$on("prev", () => {
            this.onPlayPrev();
        });

        App.interfaceManager.bus.$on("playSong", (index: number) => {
            this.playSong(index);
        });

        App.interfaceManager.bus.$on("removeSong", (index:number) => {
            this.onRemoveSong(index);
        });
    }

    playSong(index: number) {
        if(index < Store.GetInstance().jukebox.playlist.length) {
            Store.GetInstance().jukebox.currentIndex = index;
            this.player.loadVideoById(Store.GetInstance().jukebox.playlist[index].videoId);
            this.player.playVideo();
            Store.GetInstance().jukebox.playing = true;
        }
    }

    onPlayStop(playing: boolean) {
        if(!playing) {
            this.player.stopVideo();
            Store.GetInstance().jukebox.playing = false;
        } else {
            this.playSong(Store.GetInstance().jukebox.currentIndex);
            Store.GetInstance().jukebox.playing = true;
        }
    }

    onPlayPrev() {
        if(Store.GetInstance().jukebox.currentIndex > 0) {
            Store.GetInstance().jukebox.currentIndex--;
        } 
        this.playSong(Store.GetInstance().jukebox.currentIndex);
    }

    onPlayNext() {
        if(Store.GetInstance().jukebox.currentIndex < Store.GetInstance().jukebox.playlist.length - 1) {
            Store.GetInstance().jukebox.currentIndex++;
        }
        else {
            Store.GetInstance().jukebox.currentIndex = 0;
        }
        this.playSong(Store.GetInstance().jukebox.currentIndex);
    }

    onRemoveSong(index: number) {
        Store.GetInstance().jukebox.playlist.splice(index, 1);        
        if(Store.GetInstance().jukebox.playlist.length == 0) {
            this.player.stopVideo();
        }
        if(index == Store.GetInstance().jukebox.currentIndex) {
            if(index > Store.GetInstance().jukebox.playlist.length - 1 && Store.GetInstance().jukebox.playlist.length > 0) {
                Store.GetInstance().jukebox.currentIndex = Store.GetInstance().jukebox.playlist.length - 1;
            }
            if(Store.GetInstance().jukebox.playlist.length > 0) {
                this.playSong(Store.GetInstance().jukebox.currentIndex);
            }
        }
        else if(index < Store.GetInstance().jukebox.currentIndex && Store.GetInstance().jukebox.currentIndex > 0) {
            Store.GetInstance().jukebox.currentIndex--;
        }
    }

    onVideoEnd() {
        App.communicationManager.sendMessage(new SongEndedComposer());
        this.onPlayNext();
    }
}
</script>