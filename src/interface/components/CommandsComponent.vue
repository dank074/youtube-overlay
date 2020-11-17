<template>
  <div class="box" style="width: 340px;left: 200px;top: 200px;z-index: 1000;" v-draggable="draggableValue">
    <div class="box_head" :ref="handleId">
      <div class="box_cross" v-on:click="close"></div>Commands
    </div>
    <div class="box_body">
      <input type="text" v-model="search" placeholder="Search.." style="margin:5px; width: 300px"/>
      <div class="commands-box">
        <table>
          <tr v-for="(command,index) in filteredList()" :key="index">
            <td>{{ command }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Draggable } from "draggable-vue-directive";
import { State } from 'vuex-class';
import { CommandsState } from '@/store/types';
import Vue from 'vue';

@Component({
  directives: {
    Draggable
  }
})
export default class CommandsComponent extends Vue {
  @State(state => state.commands) commands!: CommandsState;

  search: string = "";

  data() {
    return {
      handleId: "drag-commands",
      draggableValue: {
        handle: undefined
      }
    };
  }

  mounted() {
    this.$data.draggableValue.handle = this.$refs[this.$data.handleId];
  }

  filteredList(): string[] {
    return (this.commands.values).filter( command => {
      return command.toLowerCase().includes(this.search.toLowerCase());
    });
  }

  close(): void {
    this.$store.commit('commands/setOpen', false);
  }
}
</script>

<style scoped>
.commands-box {
    overflow:auto;
    height:200px;
    color: black;
    font-size: 15px;
}
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}
tr:nth-child(even) {
    background-color: #dddddd;
}
</style>