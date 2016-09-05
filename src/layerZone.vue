<template>
<div class="f-ab layer-zone">
  <template v-for="(index, page) in slide.pages">
    <div class="page-wrap" 
      :class="{'active': index == activePageIndex}"
      @click="activeSlidePageIndex(index)"
      >
       {{index}}
      <button @click.stop="delSlidePage(index)">del page</button>
      <button @click.stop="copySlidePage(index)">copySlidePage</button>
    </div>
  </template>
  <button @click="addSlidePage">addSlidePage</button>
</div>
</template>
<script>
import * as actions from './vuex/actions'

export default {
  vuex: {
    getters: {
      slide: state => state.slide,
      activePageIndex: state => state.activePageIndex
    },
    actions: actions
  }
}
</script>

<style>
  .page-wrap{
    border: 2px solid #ccc;
    margin: 5px;
  }
  .page-wrap.active{
    border-color: blue;
  }
</style>