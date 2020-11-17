<template>
    <div style="border: none;background-color: #000;display:none;">
        <div id="jukebox-player"> </div>
    </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import YouTubePlayer from 'youtube-player';
import CommunicationManager from '../../../communication/CommunicationManager';
import SongEndedComposer from '../../../communication/outgoing/jukebox/SongEndedComposer';
import App from '@/App';
import { State } from 'vuex-class';
import Vue from 'vue';
import { JukeboxState } from '@/store/types';

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
    @State('jukebox') jukebox!: JukeboxState;

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
        if(index < this.jukebox.playlist.length) {
            this.$store.commit('jukebox/setCurrentIndex', index);
            this.player.loadVideoById(this.jukebox.playlist[index].videoId);
            this.player.playVideo();
            this.$store.commit('jukebox/setPlaying', true);
        }
    }

    onPlayStop(playing: boolean) {
        if(!playing) {
            this.player.stopVideo();
            this.$store.commit('jukebox/setPlaying', false);
        } else {
            this.playSong(this.jukebox.currentIndex);
            this.$store.commit('jukebox/setPlaying', true);
        }
    }

    onPlayPrev() {
        if(this.jukebox.currentIndex > 0) {
            this.$store.commit('jukebox/decrementIndex');
        } 
        this.playSong(this.jukebox.currentIndex);
    }

    onPlayNext() {
        if(this.jukebox.currentIndex < this.jukebox.playlist.length - 1) {
            this.$store.commit('jukebox/incrementIndex');
        }
        else {
            this.$store.commit('jukebox/setCurrentIndex', 0);
        }
        this.playSong(this.jukebox.currentIndex);
    }

    onRemoveSong(index: number) {
        this.$store.commit('jukebox/removeFromPlaylist', index);        
        if(this.jukebox.playlist.length == 0) {
            this.player.stopVideo();
        }
        if(index == this.jukebox.currentIndex) {
            if(index > this.jukebox.playlist.length - 1 && this.jukebox.playlist.length > 0) {
                this.$store.commit('jukebox/setCUrrentIndex', this.jukebox.playlist.length - 1);
            }
            if(this.jukebox.playlist.length > 0) {
                this.playSong(this.jukebox.currentIndex);
            }
        }
        else if(index < this.jukebox.currentIndex && this.jukebox.currentIndex > 0) {
            this.$store.commit('jukebox/decrementIndex');
        }
    }

    onVideoEnd() {
        App.communicationManager.sendMessage(new SongEndedComposer());
        this.onPlayNext();
    }
}
</script>