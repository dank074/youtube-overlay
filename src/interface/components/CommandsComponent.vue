<template>
  <div v-if="data.commands_open" class="box" style="width: 340px;left: 200px;top: 200px;z-index: 1000;" v-draggable="draggableValue">
    <div class="box_head" :ref="handleId">
      <div class="box_cross" v-on:click="Close"></div>Commands
    </div>
    <div class="box_body">
      <input type="text" v-model="search" placeholder="Search.." style="margin:5px; width: 300px"/>
      <div class="commands-box">
        <table>
          <tr v-for="(command,index) in filteredList()" :key="index">
            <td>{{command}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Draggable } from "draggable-vue-directive";
import Store from "@/store/Store";

@Component({
  directives: {
    Draggable
  }
})
export default class CommandsComponent extends Vue {
  search: string = "";

  data() {
    return {
      data: Store.GetInstance(),
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
    return Store.GetInstance().commands.filter(command => {
      return command.toLowerCase().includes(this.search.toLowerCase());
    });
  }

  Close(): void {
    Store.GetInstance().commands_open = false;
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