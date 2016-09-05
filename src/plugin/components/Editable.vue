<template>
  <div class="fields">
    <div class="double">
      <input class="input" v-model="color.hex | hex" @keyup="handleHexChange"/><span class="label">Hex</span>
    </div>
    <div class="single">
      <input class="input" v-model="color.r" @keyup="handleRgbChange('r', $event)" number><span class="label">R</span>
    </div>
    <div class="single">
      <input class="input" v-model="color.g" number @keyup="handleRgbChange('g', $event)"><span class="label">G</span>
    </div>
    <div class="single">
      <input class="input" v-model="color.b" number @keyup="handleRgbChange('b', $event)"><span class="label">B</span>
    </div>
    <div class="single">
      <input class="input" v-model="color.a" number @keyup="handleAlphaChange"/><span class="label">A</span>
    </div>
  </div>
</template>

<script>
import {getColor} from '../helpers/color'
export default {
  props: {
    color: {
      type: Object
    }
  },

  methods: {
    handleHexChange(event) {
      let hex = event.target.value
      console.log(hex)
      let colors = getColor(hex, 'hex')
      // not change alpha,when change hex
      colors.hsva.a = this.color.a
      this.$dispatch('color-change', colors)
    },

    handleRgbChange(rgb, event) {
      console.log(event.target.value)
      let rgba = {r: this.color.r, g: this.color.g, b: this.color.b, a: this.color.a}
      rgba[rgb] = parseInt(event.target.value || 0)
      let colors = getColor(rgba, 'rgba')
      this.$dispatch('color-change', colors)
    },

    handleAlphaChange(event) {
      let alpha = parseFloat(event.target.value || 0)
      let rgba = {r: this.color.r, g: this.color.g, b: this.color.b, a: alpha}
      let colors = getColor(rgba, 'rgba')
      this.$dispatch('color-change', colors)
    }
  },

  filters: {
    hex: {
      read: (val) => val.substring(1),
      write: (val) => `#${val}`
    }
  }
}
</script>

<style scoped>
.fields {
  display: flex;
  padding-top: 4px;
}
.single {
  flex: 1;
  padding-left: 6px;
}
.double {
  flex: 2;
}
.input {
  width: 80%;
  padding: 4px 5% 3px;
  text-align: center;
  border: none;
  box-shadow: inset 0 0 0 1px #ccc;
  font-size: 11px;
}
.label {
  display: block;
  text-align: center;
  font-size: 11px;
  color: #222;
  padding-top: 3px;
  padding-bottom: 4px;
  text-transform: capitalize;
}
</style>
