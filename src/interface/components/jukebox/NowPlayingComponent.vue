<template>

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
export default class NowPlayingComponent extends Vue {
  data() {
    return {
      data: Store.GetInstance()
    };
  }

  Close(): void {
    Store.GetInstance().commands_open = false;
  }
}
</script>