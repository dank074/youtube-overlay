<template>
  <div class="box" style="width: 500px;left: 200px;top: 200px;z-index: 1000;height:400px;" v-draggable="draggableValue">
    <div class="box_head" :ref="handleId">
      <div class="box_cross" v-on:click="close"></div>Jukebox
    </div>
    <div class="box_body">
      <ul class="playlist-list">
        <h1 style="display: inline-block;">Playlist</h1>
        <img src="~@/assets/prev.png" v-on:click="playPrev()" class="controls">
        <img v-if="!jukebox.playing" src="~@/assets/play.png" v-on:click="playStop()" class="controls">
        <img v-if="jukebox.playing" src="~@/assets/pause.png" v-on:click="playStop()" class="controls">
        <img src="~@/assets/skip.png" v-on:click="playNext()" class="controls">
        <li v-for="(song,index) in jukebox.playlist" :key="index" v-bind:class="{ active: index == jukebox.currentIndex }">
          {{ song.name }}
          <span class="artist">{{song.channel}} <img src="~@/assets/minus.png" v-on:click="removeSong(index)" class="controls"></span>
        </li>
      </ul>
      <ul class="yt-results" v-if="searchResults != null">
        <h2>Add Music</h2>
        <input type="radio" v-model="mode" value="1">Video URL
        <input type="radio" v-model="mode" value="2">Search keyword
        <input v-if="mode == 1" v-model="videoid" type="text" size="32" value="" placeholder="https://www.youtube.com/watch?v=KJFKSDJF" class="box_input">
        <input v-if="mode == 1" v-model="name" type="text" size="32" value="" placeholder="Song name" class="box_input">
        <button v-if="mode == 1" type="button" class="box_button" v-on:click="submitUrl">Add</button>
        <input v-if="mode == 2" v-model="searchKeyword" type="text" size="32" class="box_input"/>
        <button v-if="mode == 2" type="button" class="box_button" v-on:click="search">Search</button>
        <li class="results-container" v-for="n in searchResults.length" :key="n">
          <img :src="searchResults[n-1].snippet.thumbnails.default.url" />
          <span class="results-stat">{{ searchResults[n-1].snippet.title }}</span>
          <button type="button" class="ant-btn ant-btn-primary" v-on:click="addSong(n-1)">Add</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { State } from 'vuex-class';
import { Draggable } from "draggable-vue-directive";
import Logger from "@/utils/Logger";
import Constants from "@/utils/Constants";
import axios from "axios";
import Song from "@/store/models/Song";
import JukeboxYoutubeComponent from "./JukeboxYoutubeComponent.vue";
import CommunicationManager from '../../../communication/CommunicationManager';
import AddSongComposer from '@/communication/outgoing/jukebox/AddSongComposer';
import RemoveSongComposer from '@/communication/outgoing/jukebox/RemoveSongComposer';
import PreviousSongComposer from '@/communication/outgoing/jukebox/PreviousSongComposer';
import NextSongComposer from '@/communication/outgoing/jukebox/NextSongComposer';
import PlayStopComposer from '@/communication/outgoing/jukebox/PlayStopComposer';
import RegexUtility from '@/utils/RegexUtility';
import App from '@/App';
import { JukeboxState } from '@/store/types';
import Vue from 'vue';

@Component({
  directives: {
    Draggable
  }
})
export default class JukeboxComponent extends Vue {
  searchKeyword: string = "";
  searchResults: any = [];
  mode: number = 1;
  videoid: string = "";
  name: string = "";
  @State('jukebox') jukebox!: JukeboxState;

  data() {
    return {
      handleId: "drag-jukebox",
      draggableValue: {
        handle: undefined
      }
    };
  }

  mounted() {
    this.$data.draggableValue.handle = this.$refs[this.$data.handleId];
  }

  search(): void {
    if (this.searchKeyword == "") return;
    axios
      .get(Constants.getYoutubeApiUrl() + this.searchKeyword)
      .then((response: any) => {
        this.searchResults = response.data.items.filter((res: any) => {
          return res.id.kind.includes("youtube#video");
        });
      })
      .catch((error: string) => {
        Logger.Log(error);
      });
  }

  submitUrl(): void {
    if(this.videoid == "" || this.name == "") {
      alert("Fill out all form fields"); return;
    }
    let id = RegexUtility.getVideoIdFromYoutubeURL(this.videoid);
    if(id != "") {
      this.videoid = id;
      App.communicationManager.sendMessage(new AddSongComposer(new Song(
        this.name,
        this.videoid,
        "unknown"
      )));
    }
    else {
      alert("Invalid youtube url")
    }
  }

  playStop() {
    App.communicationManager.sendMessage(new PlayStopComposer(!this.jukebox.playing));
  }

  playNext() {
    App.communicationManager.sendMessage(new NextSongComposer(this.jukebox.currentIndex));
  }

  playPrev() {
    App.communicationManager.sendMessage(new PreviousSongComposer(this.jukebox.currentIndex))
  }

  removeSong(index: number) {
    App.communicationManager.sendMessage(new RemoveSongComposer(index));
  }

  addSong(index: number): void {
    if (this.searchResults[index].id.videoId != undefined) {
     App.communicationManager.sendMessage(new AddSongComposer(new Song(
          this.searchResults[index].snippet.title,
          this.searchResults[index].id.videoId,
          this.searchResults[index].snippet.channelTitle
        )));
    }
  }

  close(): void {
    this.$store.commit('jukebox/setOpen', false);
  }
}
</script>

<style lang="scss" scoped>
$gray: #ccc;
$mobile-bp: 600px;

h1 {
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    color: #565d64;
}
h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    color: black;
}
.playlist-list {
  overflow-y: scroll;
  border: 1px solid $gray;
  border-left: none;
  height: 100%;
  list-style: none;
  padding: 0;
  font-family: Avenir, "Avenir Next", "Helvetica Neue", "Segoe UI", Helvetica,
    Arial, sans-serif;
  font-size: 14px;
  line-height: 0.95;
  color: #565d64;
  display: inline-block;
  margin: 0;
  width: 49%;
  @media (max-width: $mobile-bp) {
    border: 1px solid $gray;
    border-top: 0;
    float: left;
  }
  li {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #222;
    padding: 0;
    padding: 20px 10px;
    background: #ffffff;
    border-bottom: 1px solid $gray;
    &:last-child {
      border-bottom: 0;
    }
    //&:hover {
    //  background-color: #3498db;
    //  color: #ffffff;
    //}
    &.active {
      background-color: #3498db;
      color: #ffffff;
    }
    .artist {
      display: block;
      font-weight: normal;
      margin-top: 5px;
      color: #666;
      font-size: 18px;
    }
  }
}

.plyr {
  display: inline-block;
  .plyr__controls {
    background-size: cover !important;
    height: 342px;
    width: 342px;
    background: rgba(0, 0, 255, 0.4);
    display: inline-block;
    border: 1px solid $gray;
    border-right: 0;
    @media (max-width: $mobile-bp) {
      border: 1px solid $gray;
    }
    .plyr__time--current {
      color: #999;
    }
    [data-plyr="play"] {
      display: block;
      margin: 140px auto 0;
      svg {
        fill: white;
      }
    }
    [data-plyr="pause"] {
      margin: 140px auto 0;
      svg {
        fill: #999;
      }
      &:hover {
        svg {
          fill: white;
        }
      }
    }
    .plyr__progress {
      position: relative;
      bottom: -115px;
      margin: 0;
    }
    .plyr__time {
      position: relative;
      bottom: -115px;
    }

    [data-plyr="mute"] {
      position: relative;
      bottom: -115px;
      fill: #ccc;
    }

    .plyr__volume {
      display: inline-block;
      position: relative;
      bottom: -115px;
      max-width: 55px;
    }
  }
}

.plyr--playing {
  [data-plyr="play"] {
    display: none !important;
  }
  [data-plyr="pause"] {
    display: block !important;
    // margin-top: -32px !important;
  }
}

.plyr--stopped {
  .plyr__progress,
  .plyr__time,
  [data-plyr="mute"],
  .plyr__volume {
    display: none !important;
  }
}

.playlist {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  box-shadow: 0 2px 3px 2px rgba(0, 0, 0, 0.3);
  @media (max-width: $mobile-bp) {
    width: auto;
  }
}

section {
  width: 100%;
  @media (max-width: $mobile-bp) {
    width: 342px;
    margin: 0 auto;
  }
}

section:before {
  content: "";
  display: inline-block;
  height: 100vh;
  vertical-align: middle;
  margin-right: -0.25em; /* Adjusts for spacing */
}

main {
  width: 80%;
  margin: 0 auto;
}

.controls {
  cursor:pointer;
  margin-left: 10px;
  &:hover {
    opacity: 0.8;
  }
}

.yt-results {
  list-style-type: none;
  overflow-y: scroll;
  width: 50%;
  float: right;
  height: 100%;
  margin: 0;
  padding: 0;
  .results-container {
    display: flex;
    flex-direction: column;
    //border: 1px solid;
    //background: #ffffff;
    cursor: pointer;
    text-align: center;
    .results-stat {
      display: flex;
      flex-direction: column;
      color: black;
    }
    img {
      width: 120px;
      height: 90px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .selected-video {
    border: 1px solid red;
  }
}
.ant-btn-primary {
  color: #fff;
  background-color: #108ee9;
  border-color: #108ee9;
  margin-bottom: 0;
  font-weight: 500;
  text-align: center;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.15;
  padding: 0 15px;
  font-size: 12px;
  border-radius: 4px;
  height: 28px;
}
.ant-btn-primary:hover {
  color: #fff;
  background-color: #49a9ee;
  border-color: #49a9ee;
}
</style>