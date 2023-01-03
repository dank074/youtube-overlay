<template>
  <div class="SlotMachine" v-draggable="draggableValue">
      <div class="box_head" :ref="handleId"><div class="box_cross" v-on:click="close"></div> Slot Machine </div>
    <div class="SlotMachine-reels">
      <div class="SlotMachine-shadow"></div>
      <div class="SlotMachine-payline"></div>
      <SlotReelComponent ref="reel1" :reel="1" v-on:stopped="reelStopped"></SlotReelComponent>
      <SlotReelComponent ref="reel2" :reel="2" v-on:stopped="reelStopped"></SlotReelComponent>
      <SlotReelComponent ref="reel3" :reel="3" v-on:stopped="reelStopped"></SlotReelComponent>
    </div>
    <div class="SlotMachine-stats">
      <div class="SlotMachine-stat is-credit">
        <div class="SlotMachine-statTitle">Credits</div>
        <div class="SlotMachine-statValue">{{session.credits}}</div>
      </div>
      <div class="SlotMachine-stat is-win">
        <div class="SlotMachine-statTitle">Won</div>
        <div class="SlotMachine-statValue">{{won}}</div>
      </div>
    </div>
    <div class="SlotMachine-actions">
      <div style="color:white;align-self:center;margin: 10px;font-size:15px;font-weight:bold;">Bet</div>
      <input type="text" style="width:100px" v-model="bet" />
      <button
        class="SlotMachine-button is-spin"
        :disabled="slotmachine.isSpinning"
        v-on:mousedown="spin()"
      >Play</button>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import SlotReelComponent from "./SlotReelComponent.vue";
import CommunicationManager from "@/communication/CommunicationManager";
import RequestSpinSlotMachineComposer from "@/communication/outgoing/general/RequestSpinSlotMachineComposer";
import RequestCreditsComposer from "@/communication/outgoing/general/RequestCreditsComposer";
import { Draggable } from 'draggable-vue-directive';
import App from '@/App';
import { State } from 'vuex-class';
import { SessionState, SlotMachineState } from '@/store/types';
import Vue from 'vue';

@Component({
  components: {
    SlotReelComponent
  },
  directives: {
      Draggable
  }
})
export default class SlotMachineComponent extends Vue {
  public bet: number = 1;
  public won: number = 0;
  @State('slotmachine') slotmachine!: SlotMachineState;
  @State('session') session!: SessionState;

  data() {
    return {
      handleId: "drag-slots",
      draggableValue: {
        handle: undefined
      }
    };
  }

  mounted() {
    App.interfaceManager.bus.$on("results", () => {
      this.onResults();
    });
    this.$data.draggableValue.handle = this.$refs[this.$data.handleId];
  }

  onResults(): void {
    (this.$refs.reel1 as SlotReelComponent).run();
  }

  reelStopped(reel: number): void {
      console.log(reel);
    if (reel == 1) {
      (this.$refs.reel2 as SlotReelComponent).run();
    } else if (reel == 2) {
      (this.$refs.reel3 as SlotReelComponent).run();
    } else {
      this.checkWin();
    }
  }

  spin(): void {
    if (this.bet == 0) {
      return;
    }
    if (
      this.session.credits > 0 &&
      this.slotmachine.results.length == 0 &&
      !this.slotmachine.isSpinning
    ) {
      this.won = 0;
      let itemId = this.slotmachine.itemId;
      App.communicationManager.sendMessage(
        new RequestSpinSlotMachineComposer(itemId, this.bet)
      );
    }
  }

  checkWin(): void {
    if (this.slotmachine.results.length === 3) {
      if (this.slotmachine.won) {
        let payout = this.slotmachine.payout;
        if ( payout > 100) {
          let audio = this.slotmachine.audio.get("bigwin");
          if (audio) audio.play();
        } else {
          let audio = this.slotmachine.audio.get("win");
          if (audio) audio.play();
        }
        App.communicationManager.sendMessage(new RequestCreditsComposer());
        this.won = this.slotmachine.payout;
      } else {
        console.log("lost");
      }
    }
    this.$store.commit('slotmachine/setResults', []);
    this.$store.commit('slotmachine/setSpinning', false);
    this.$store.commit('slotmachine/setWon', false);
  }

  close(): void {
    this.$store.commit('slotmachine/setOpen', false);
  }
}
</script>

<style lang="scss">
.SlotMachine {
  border-radius: 5px;
  position: absolute;
  top: 25%;
  left: 40%;
  z-index: 1000;
}
.SlotMachine-reels {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
}
.SlotMachine-shadow {
  border-radius: 4px 4px 0 0;
  pointer-events: none;
  z-index: 99;
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-box-shadow: inset 0 25px 30px -5px rgba(0, 0, 0, 0.1),
    inset 0 5px 10px -2px rgba(0, 0, 0, 0.2),
    inset 0 -25px 30px -5px rgba(0, 0, 0, 0.1),
    inset 0 -5px 10px -2px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 25px 30px -5px rgba(0, 0, 0, 0.1),
    inset 0 5px 10px -2px rgba(0, 0, 0, 0.2),
    inset 0 -25px 30px -5px rgba(0, 0, 0, 0.1),
    inset 0 -5px 10px -2px rgba(0, 0, 0, 0.2);
}
.SlotMachine-payline {
  position: absolute;
  top: 104.994px;
  height: 1px;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
}
.SlotMachine-stats {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  background: #000;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 10px 0;
  background-color: #367897;
    border: solid 2px #408caf;
    color: white;
}
.SlotMachine-stat {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  margin-right: 10px;
  margin-left: 10px;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}
.SlotMachine-statTitle {
  font-size: 12px;
  color: white;
}
.SlotMachine-statValue {
  padding: 5px 10px;
  background: rgba(1, 2, 31, 0.2);
  border-radius: 2px;
  font-size: 25px;
  text-align: right;
  text-shadow: 0 0 4px rgb(4, 4, 4);
}
.SlotMachine-statSub {
  font-size: 9px;
  color: rgb(50, 50, 50);
  text-align: right;
}
.SlotMachine-actions {
  padding: 20px 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  background: rgb(20, 20, 20);
  border-radius: 0 0 4px 4px;
}
.SlotMachine-button {
  font-size: 17px;
  font-weight: bold;
  padding: 14px 12px;
  margin-left: 20px;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 2px 2px rgb(0, 0, 0);
  box-shadow: 0 1px 2px 2px rgb(0, 0, 0);
}
.SlotMachine-button:focus {
  outline: none;
}
.SlotMachine-button:active {
  -webkit-box-shadow: 0 0 2px 1px rgb(0, 0, 0);
  box-shadow: 0 0 2px 1px rgb(0, 0, 0);
}

.SlotMachine-button.is-spin {
  background: rgba(0, 255, 0, 0.4);
  border: 1px solid rgba(0, 255, 0, 0.4);
}
.SlotMachine-button.is-spin:hover {
  background: rgba(0, 255, 0, 0.43);
}
.SlotMachine-button.is-spin:active {
  background: rgba(0, 255, 0, 0.46);
}

.SlotMachine-button.is-win {
  background: rgba(255, 0, 0, 0.4);
  border: 1px solid rgba(255, 0, 0, 0.5);
}
.SlotMachine-button.is-win.has-win {
  background: rgba(255, 0, 0, 0.99);
}
.SlotMachine-button.is-win:hover {
  background: rgba(255, 0, 0, 0.65);
}
.SlotMachine-button.is-win:active {
  background: rgba(255, 0, 0, 0.7);
}
</style>