<template>
    <div class="box" :style="centerBox" v-draggable="draggableValue">
        <div class="box_head" :ref="handleId">
            <div class="box_cross" v-on:click="close"></div>
                    Twitch Video
        </div>  
        <TwitchVideoComponent/>
	</div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Draggable } from 'draggable-vue-directive';
import TwitchVideoComponent from './TwitchVideoComponent.vue';
import { State } from 'vuex-class';
import Vue from 'vue';
import { TwitchPlayerState } from '@/store/types';

@Component({
    components: {
        TwitchVideoComponent
    },
    directives: {
    Draggable,
  }
})
export default class TwitchComponent extends Vue {
  @State('twitchplayer') twitchplayer!: TwitchPlayerState;
  
    data() {
      return { 
          handleId: "drag-twitch",
          draggableValue: {
            handle: undefined
          }
      }
    }

    mounted() {
      this.$data.draggableValue.handle = this.$refs[this.$data.handleId];
    }

    close(): void {
      this.$store.commit('twitchplayer/setOpen', false);
    }

    centerBox(): any {
      let Width: number = 560;
      let cWi: number = ((window.innerWidth || (document != null && document.documentElement != null && document.documentElement.clientWidth) || document.body.clientWidth) / 2) - (Width / 2);
      let cHe: number = Math.floor((((window.innerHeight || (document != null && document.documentElement != null && document.documentElement.clientHeight) || document.body.clientHeight) / 2) / 100) * 60);

      return { left: cWi + "px", top: cHe + "px" };
    }
}
</script>