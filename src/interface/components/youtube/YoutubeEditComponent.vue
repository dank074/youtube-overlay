<template>
     <div class="box_body" v-show="youtubeplayer.editMode">
        <div class="box_form">
            <input type="radio" v-model="mode" value="1">Video URL
            <input type="radio" v-model="mode" value="2">Search keyword
            <input v-if="mode == 1" v-model="videoid" type="text" size="32" value="" :placeholder="'https://www.youtube.com/watch?v=' + youtubeplayer.videoId" class="box_input">
            <input v-if="mode == 2" v-model="searchKeyword" type="text" size="32" value="" class="box_input">
            <button v-if="mode == 2" type="button" class="box_button" v-on:click="search">Search</button>
            <ul class="yt-results" v-if="mode == 2 && searchResults">
                <li class="results-container" v-for="n in Math.min(10, searchResults.length)" :key="n" @click="clickOnItem(n-1)">
                    <img :src="searchResults[n-1].snippet.thumbnails.default.url" class="results-stat">
                    <span class="results-stat">{{ searchResults[n-1].snippet.title }}</span>
                </li>
            </ul>
			<button v-if="mode == 1" type="button" class="box_button" v-on:click="submitUrl">Edit</button>
        </div>
    </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import axios from 'axios';
import EditTVComposer from '@/communication/outgoing/general/EditTVComposer';
import Logger from '@/utils/Logger';
import Constants from '@/utils/Constants';
import RegexUtility from '../../../utils/RegexUtility';
import CommunicationManager from '../../../communication/CommunicationManager';
import App from '@/App';
import { State } from 'vuex-class';
import Vue from 'vue';
import { YoutubePlayerState } from '@/store/types';

@Component
export default class YoutubeEditComponent extends Vue {
    videoid: string = "";
    mode: number = 1;
    searchKeyword: string = "";
    searchResults: any = [];
    @State('youtubeplayer') youtubeplayer!: YoutubePlayerState;

   sendEdit(): void {
        if (this.videoid == "")
            return;
        App.communicationManager.sendMessage(new EditTVComposer(this.youtubeplayer.itemId, this.videoid));
        this.$store.commit('youtubeplayer/setOpen', false);
        this.videoid = "";
        this.searchKeyword = "";
        this.searchResults = null;
    }

    clickOnItem(index: number): void {
        if(this.searchResults[index].id.videoId != undefined)
            this.videoid = this.searchResults[index].id.videoId;
        this.sendEdit();
    }

    submitUrl(): void {
        let id = RegexUtility.getVideoIdFromYoutubeURL(this.videoid);
        if(id != "") {
            this.videoid = id;
            this.sendEdit();
        }
        else {
            alert("Invalid youtube url")
        }
    }

    search(): void {
        if(this.searchKeyword == "")
            return;
        axios.get(Constants.getYoutubeApiUrl() + this.searchKeyword).then((response:any) => {
            this.searchResults = response.data.items;
        }).catch((error: string) => {
            Logger.Log(error);
        });
    }
}
</script>

<style lang="scss" scoped>
.yt-results {
    list-style-type:none;
    overflow: scroll;
    max-height: 200px;
    max-width: 500px;

    .results-container {
        display:flex;
        flex-direction:row;
        border: 1px solid;
        background-color:#aba89a;
        &:hover {
            filter:brightness(80%);
        }
        &:active {
            filter:blur(0.5px);
        }
        cursor: pointer;
        .results-stat {
            display:flex;
            flex-direction:column;
        }
    }

    .selected-video {
        border: 1px solid red;
    }
}
</style>