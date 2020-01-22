<template>
  <div id="app">
    <YoutubeComponent/>
    <MentionComponent/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import YoutubeComponent from './components/youtube/YoutubeComponent.vue';
import MentionComponent from './components/MentionComponent.vue';

@Component({
  components: {
    YoutubeComponent,
    MentionComponent
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  overflow: hidden;
  font-family: Ubuntu, sans-serif, "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma;
  background-color: #0e151c;
  font-size: 12px;
  margin: 0;
  padding: 0;
  user-select: none;
}
</style>
