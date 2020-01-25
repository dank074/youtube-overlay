<template>
  <div class="Reel" v-bind:class="{'is-locked':data.slotMachine.isSpining}">
    <div class="Reel-inner">
      <img class="Reel-image" v-for="n in fruits.length" :key="n" :src="fruits[n-1].image" />      
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Store from "@/store/Store";

@Component({})
export default class SlotReelComponent extends Vue {
  public momentum: number = 0;
  public fruits = Store.GetInstance().slotMachine.items.slice(0);
  @Prop() reel!: number;

  data() {
    return {
      data: Store.GetInstance()
    };
  }

mounted () {
    this.$el.addEventListener("transitionend", this.animateEnd);
  }

  run(): void {
      this.fruits = Store.GetInstance().slotMachine.items.slice(0); // reset the items
      let temp = this.fruits[2];
      this.fruits[2] = Store.GetInstance().slotMachine.items[Store.GetInstance().slotMachine.results[this.reel - 1]];
      this.fruits[Store.GetInstance().slotMachine.results[this.reel - 1]] = temp;
      this.$forceUpdate();
      var min = 8;
      var max = 28;
      var momentum = Math.floor(Math.random() * (max - min + 1) + min);
      this.momentum = momentum;
      let audio = Store.GetInstance().slotMachine.audio.get("spin");
      if (audio) audio.play();
      this.animate();
  }

  animate(): void {
    this.$el.classList.add("move");
  }

  animateEnd(): void {
    this.$el.classList.remove("move");
    this.momentum = this.momentum - 1;
    if (this.momentum > 0) {
      setTimeout(this.animate, 10);
    } else {
      this.$emit('stopped', this.reel);
      let audio = Store.GetInstance().slotMachine.audio.get("spinEnd");
      if (audio) {
        audio.play();
      }
      let spinAudio = Store.GetInstance().slotMachine.audio.get("spin");
      if (spinAudio) {
        spinAudio.pause();
        spinAudio.currentTime = 0.3;
      }
    }
  }
}
</script>

<style>
.Reel {
  width: 90px;
  height: 209.97px;
  overflow: hidden;
  background-color: white;
}
.Reel.is-locked {
  /*   opacity: 0.8; */
  background: rgba(0, 0, 0, 0.1);
}
.Reel:not(:last-child) {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.Reel-inner {
  position: relative;
  top: -119.97px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.Reel.move .Reel-inner {
  -webkit-transition: margin-top 0.04s linear;
  transition: margin-top 0.04s linear;
  margin-top: 90px;
}
.Reel-image {
  width: 90px;
  width: 90px;
}
</style>