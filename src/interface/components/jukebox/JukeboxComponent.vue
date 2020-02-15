<template>
    <div v-show="data.jukebox.open" class="box" style="width: 500px;left: 200px;top: 200px;z-index: 1000;height:400px;" v-draggable="draggableValue">
    <div class="box_head" :ref="handleId">
      <div class="box_cross" v-on:click="Close"></div>Jukebox
    </div>
    <div class="box_body">
      <ul class="playlist-list">
          <h1>Playlist</h1>
        <li v-for="(song,index) in data.jukebox.playlist" :key="index">
            {{ song.name }}
            <span class="artist">{{song.channel}}</span>
        </li>
      </ul>
      <ul class="yt-results" v-if="searchResults != null">
          <h2>Add Music</h2>
            <input v-model="searchKeyword" type="text" size="32" value="" class="box_input" style="width:200px;margin-top:5px;">
            <button type="button" class="box_button" v-on:click="Search" style="width:100px;">Search</button>
            <li class="results-container" v-for="n in searchResults.length" :key="n">
                <img :src="searchResults[n-1].snippet.thumbnails.default.url">
                <span class="results-stat">{{ searchResults[n-1].snippet.title }}</span>
                <button type="button" class="ant-btn ant-btn-primary" v-on:click="ClickOnItem(n-1)">Add</button>
            </li>
        </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Draggable } from "draggable-vue-directive";
import Store from "@/store/Store";
import Logger from "@/utils/Logger";
import Constants from "@/utils/Constants";
import axios from 'axios';
import Song from "@/store/models/Song";

@Component({
  directives: {
    Draggable
  }
})
export default class JukeboxComponent extends Vue {
    searchKeyword: string = "";
    searchResults: any = [];
    
    data() {
        return {
            data: Store.GetInstance(),
            handleId: "drag-jukebox",
            draggableValue: {
                handle: undefined
            }
        };
    }

    mounted() {
      this.$data.draggableValue.handle = this.$refs[this.$data.handleId];
    }

    Search(): void {
        if(this.searchKeyword == "")
            return;
        axios.get(Constants.getYoutubeApiUrl() + this.searchKeyword).then((response:any) => {
            this.searchResults = response.data.items.filter((res: any)  => {return res.id.kind.includes("youtube#video")})
        }).catch((error: string) => {
            Logger.Log(error);
        });
    }

    ClickOnItem(index: number): void {
        if(this.searchResults[index].id.videoId != undefined) {
            Store.GetInstance().jukebox.playlist.push(new Song(this.searchResults[index].snippet.title, this.searchResults[index].id.videoId, this.searchResults[index].snippet.channelTitle))
        }
    }

  Close(): void {
    Store.GetInstance().jukebox.open = false;
  }
}
</script>

<style lang="scss" scoped>
$gray: #ccc;
$mobile-bp : 600px;

.playlist-list { 
    overflow-y: scroll;
    border: 1px solid $gray;
    border-left: none;
    height: 100%;
    list-style: none;
	padding: 0;
	font-family: Avenir, "Avenir Next", "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif;
	font-size: 14px;
	line-height: .95;
	color: #565D64;
    display: inline-block;
    margin: 0;
    width:49%;
    @media (max-width: $mobile-bp) {
    border: 1px solid $gray;
    border-top: 0;
    float:left;
  } 
	li {
	margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #222;
	padding: 0;
	cursor: pointer;
	padding: 20px 10px;
	background: #ffffff;
	border-bottom: 1px solid $gray;
	&:last-child {
		border-bottom: 0;
	}
	&:hover {
		background-color: #3498db;
		color: #ffffff;
	}
	&.active {
		background-color: #CCDADE;
		color: #565D64;
	}
    span {
      pointer-events: none;
    }
    .artist {
      display:block;
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
    background: rgba(0,0,255,0.4);
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
  .plyr__progress, .plyr__time, [data-plyr="mute"], .plyr__volume {
    display: none !important
  }
}

.playlist {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  box-shadow: 0 2px 3px 2px rgba(0,0,0,0.3);
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
  content: '';
  display: inline-block;
  height: 100vh;
  vertical-align: middle;
  margin-right: -0.25em; /* Adjusts for spacing */
}

main {
  width:80%;
  margin: 0 auto;
}

.yt-results {
    list-style-type:none;
    overflow-y: scroll;
    width:50%;
    float:right;
    height:100%;
    margin: 0;
    padding: 0;
    .results-container {
        display:flex;
        flex-direction: column;
        //border: 1px solid;
        //background: #ffffff;
        cursor: pointer;
        text-align: center;
        .results-stat {
            display:flex;
            flex-direction:column;
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