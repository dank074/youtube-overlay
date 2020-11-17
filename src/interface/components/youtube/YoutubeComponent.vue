<template>
    <div class="box" :style="centerBox" v-draggable="draggableValue">
        <div class="box_head" :ref="handleId">
            <div class="box_edit" v-if="youtubeplayer.itemId != 0" v-on:click="edit"></div>
            <div class="box_cross" v-on:click="close"></div>
                    Youtube Video
        </div>  
        <YoutubeVideoComponent/>
        <YoutubeEditComponent/>
	</div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Draggable } from 'draggable-vue-directive';
import YoutubeVideoComponent from './YoutubeVideoComponent.vue';
import YoutubeEditComponent from './YoutubeEditComponent.vue';
import { State } from 'vuex-class';
import Vue from 'vue';
import { YoutubePlayerState } from '@/store/types';

@Component({
    components: {
        YoutubeVideoComponent,
        YoutubeEditComponent
    },
    directives: {
    Draggable,
  }
})
export default class YoutubeComponent extends Vue {
    @State('youtubeplayer') youtubeplayer!: YoutubePlayerState;
    
    data() {
      return { 
          handleId: "drag-yt",
          draggableValue: {
            handle: undefined
          }
      }
    }

    mounted() {
      this.$data.draggableValue.handle = this.$refs[this.$data.handleId];
    }

    close(): void {
        this.$store.commit('youtubeplayer/setOpen', false);
    }

    edit(): void {
        this.$store.commit('youtubeplayer/setEditMode', true);
    }

    centerBox(): any {
        let Width: number = 560;
        let cWi: number = ((window.innerWidth || (document != null && document.documentElement != null && document.documentElement.clientWidth) || document.body.clientWidth) / 2) - (Width / 2);
        let cHe: number = Math.floor((((window.innerHeight || (document != null && document.documentElement != null && document.documentElement.clientHeight) || document.body.clientHeight) / 2) / 100) * 60);

        return { left: cWi + "px", top: cHe + "px" };
    }
}
</script>