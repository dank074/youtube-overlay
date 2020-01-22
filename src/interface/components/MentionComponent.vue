<template>
    <div v-if="data.connected" v-show="data.mentions.length > 0" style="position: absolute; top: 0; left: 0;z-index: 1000;">
        <a class="btn btn-danger waves-effect waves-light" v-on:click="Close">Close all</a>
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false" v-for="n in data.mentions.length" :key="n">
      <div class="toast-header">
        <svg class="rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"
          focusable="false" role="img">
          <rect fill="#007aff" width="100%" height="100%" /></svg>
        <strong class="mr-auto">{{ data.mentions[data.mentions.length-n].sender }}</strong>
        <small class="text-muted">{{ CalculateElapsedTime(data.mentions[data.mentions.length-n].time) }}</small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true" @click="RemoveItem(data.mentions.length-n)">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        {{data.mentions[data.mentions.length-n].message}}
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Store from '@/store/Store';

@Component
export default class MentionComponent extends Vue {
    data() {
      return { 
          data: Store.GetInstance()
      }
    }

    Close (): void {
        Store.GetInstance().mentions = [];
    }

    RemoveItem(index: number): void {
        if(Store.GetInstance().mentions.length >= index + 1)
            Store.GetInstance().mentions.splice(index, 1);
    }

    CalculateElapsedTime(thenTimestamp: number): string {
        let seconds = (Date.now() - thenTimestamp) / 1000;
        if(seconds < 1)
            return `just now`;
        if(seconds < 60)
            return `${seconds} seconds ago`;
        return `${Math.floor(seconds/60)} minutes ago`
    }
}
</script>

<style lang="css">
.toast.show {
    display: block;
    opacity: 1;
}
.toast:not(:last-child) {
    margin-bottom: 0.75rem;
}
.toast {
    max-width: 350px;
    overflow: hidden;
    font-size: 0.875rem;
    background-color: rgba(255, 255, 255, 0.85);
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-radius: 0.25rem;
}
.fade {
    transition: opacity 0.15s linear;
}
.toast-header {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding: 0.25rem 0.75rem;
    color: #6c757d;
    background-color: rgba(255, 255, 255, 0.85);
    background-clip: padding-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.mr-2, .mx-2 {
    margin-right: 0.5rem !important;
}
.rounded {
    border-radius: 0.25rem !important;
}
svg {
    overflow: hidden;
    vertical-align: middle;
    width: 20;
    height: 20;
}
.mr-auto, .mx-auto {
    margin-right: auto !important;
}
strong {
    font-weight: 500;
}
.text-muted {
    color: #6c757d !important;
}
small, .small {
    font-size: 80%;
    font-weight: 400;
}
button:not(:disabled), [type="button"]:not(:disabled), [type="reset"]:not(:disabled), [type="submit"]:not(:disabled) {
    cursor: pointer;
}
button, html [type="button"], [type="reset"], [type="submit"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

button.close {
    padding: 0;
    background-color: transparent;
    border: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
.ml-2, .mx-2 {
    margin-left: 0.5rem !important;
}
.mb-1, .my-1 {
    margin-bottom: 0.25rem !important;
}
.close {
    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
}
button, [type="button"], [type="reset"], [type="submit"] {
    -webkit-appearance: button;
}
button, select {
    text-transform: none;
}
button, input {
    overflow: visible;
}
input, button, select, optgroup, textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}
button {
    border-radius: 0;
}
.toast-body {
    padding: 0.75rem;
}
.btn-danger {
    color: #fff;
    background-color: #ff3547 !important;
}

.btn {
    margin: .375rem;
    color: inherit;
    text-transform: uppercase;
    word-wrap: break-word;
    white-space: normal;
    cursor: pointer;
    border: 0;
    border-radius: .125rem;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    -webkit-transition: color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out,-webkit-box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out,-webkit-box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out,background-color 0.15s ease-in-out,border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out,-webkit-box-shadow 0.15s ease-in-out;
    padding: .84rem 2.14rem;
    font-size: .81rem;
}
.btn-danger:hover {
    color: #fff;
    background-color: #c82333;
    border-color: #bd2130;
}
.waves-effect {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}
.btn-danger {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
}
.btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>