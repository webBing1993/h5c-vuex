<style scoped>
.preset-color {
  height: 11px;
  width: 11px;
  border: 1px solid #eee;
  border-radius: 3px;
  margin: 0 3px 3px 0;
  display: inline-block;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.15);
  cursor: pointer;
}
</style>

<template>
  <template v-for="color in presets">
    <div class="preset-color"
         :style="{
                 background: color
                 }"
         @click="handleChangeColor(color)">
    </div>
  </template>
</template>

<script>
import {getColor} from '../helpers/color'
export default {
  props: {
    presets: {
      type: Array
    }
  },
  methods: {
    handleChangeColor(hex) {
      let colors = getColor(hex.substr(1), 'hex')
      // console.log(colors)
      this.$dispatch('color-change', colors)
    }
  }
}
</script>
