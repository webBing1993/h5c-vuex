<template>
<div class="f-ab canvas-zone">
  <div class="edit-area-wrap">
    <div class="phone-wrap">
      {{id}}
      <button @click="updateId(1000)">add</button>
    </div>
  </div>
  <tool-zone></tool-zone>
</div>
</template>
<script>
import * as actions from '../vuex/actions'
import toolZone from './toolZone.vue'

export default {
  vuex: {
    getters: {
      id: state => state.id
    },
    actions: actions
  },
  components: {
    toolZone
  }
}
</script>
<style>
  .edit-area-wrap{
    box-sizing: content-box;
    box-shadow: 0px 2px 30px 5px rgba(0, 0, 0, .3);
    width: 400px;
    height: 630px;
    margin-top: 80px;
    border: 2px solid #333;
    margin-right: auto;
    margin-left: auto;
  }
  .phone-wrap {
    width:100%;
    height:100%;
  }
</style>