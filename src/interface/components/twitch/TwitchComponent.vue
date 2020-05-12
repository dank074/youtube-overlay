<template>
    <div v-show="data.twitch.open" class="box" v-bind:style="CenterBox" v-draggable="draggableValue">
        <div class="box_head" :ref="handleId">
            <div class="box_cross" v-on:click="Close"></div>
                    Twitch Video
        </div>  
        <TwitchVideoComponent/>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Draggable } from 'draggable-vue-directive';
import Store from '@/store/Store';
import TwitchVideoComponent from './TwitchVideoComponent.vue';

@Component({
    components: {
        TwitchVideoComponent
    },
    directives: {
    Draggable,
  }
})
export default class TwitchComponent extends Vue {
    data() {
      return { 
          data: Store.GetInstance(),
          handleId: "drag-twitch",
          draggableValue: {
            handle: undefined
          }
      }
    }

    mounted() {
      this.$data.draggableValue.handle = this.$refs[this.$data.handleId];
    }

    Close (): void {
        Store.GetInstance().twitch.open = false;
    }

    CenterBox() {
            let Width: number = 560;
            let cWi: number = ((window.innerWidth || (document != null && document.documentElement != null && document.documentElement.clientWidth) || document.body.clientWidth) / 2) - (Width / 2);
            let cHe: number = Math.floor((((window.innerHeight || (document != null && document.documentElement != null && document.documentElement.clientHeight) || document.body.clientHeight) / 2) / 100) * 60);
      
            return { left: cWi + "px", top: cHe + "px" };
    }
}
</script>