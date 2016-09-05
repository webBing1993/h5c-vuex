<template>
    <div class="picker" :style="{width: width+'px'}">
      <div class="saturation-container">
        <saturation :color="color" @color-change="handleColorChange"></saturation>
      </div>
      <div class="controls">
        <div class="sliders">
          <div class="hue-container">
            <hue :color="color" @color-change="handleColorChange"></hue>
          </div>
          <div class="alpha-container">
            <alpha :color="color" @color-change="handleColorChange"></alpha>
          </div>
        </div>
        <div class="color">
          <div class="active-color" :style="activeColorStyle"></div>
          <checkboard></checkboard>
        </div>
      </div>
      <editable  :color="color" @color-change="handleColorChange"></editable>
      <div class="presets">
        <presets-color :presets="presets" @color-change="handleColorChange"></presets-color>
      </div>
    </div>
</template>

<script>
import Hue from './components/Hue.vue'
import Alpha from './components/Alpha.vue'
import Saturation from './components/Saturation.vue'
import Checkboard from './components/Checkboard.vue'
import Editable from './components/Editable.vue'
import PresetsColor from './components/Presets.vue'
import {getColor} from './helpers/color'

export default {
  data() {
    return {
      color: {
        a: 0,
        h: 0,
        s: 0,
        v: 0,
        r: 0,
        g: 0,
        b: 0,
        hex: '#000000'
      },
      presets: ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF']
    }
  },
  props: {
    width: {
      type: Number,
      require: true,
      default: 150
    },
    outerHex: {
      type: String,
      default: '#000000'
    }
  },
  computed: {
    // TODO: fix
    activeColorStyle () {
      return {
        backgroundColor: `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`
      }
    }

  },

  components: {
    Hue, Alpha, Saturation, Checkboard, Editable, PresetsColor
  },

  methods: {
    handleColorChange(colors) {
      this.color.h = colors.hsva.h
      this.color.s = colors.hsva.s
      this.color.v = colors.hsva.v
      this.color.a = colors.hsva.a
      this.color.r = colors.rgba.r
      this.color.g = colors.rgba.g
      this.color.b = colors.rgba.b
      this.color.hex = colors.hex
      this.outerHex = colors.hex
      this.$dispatch('child-color-change', this.color)
    }
  },

  ready() {
    // console.log(this.outerHex)
  },

  create() {
    let colors = getColor(this.outerHex, 'hex')
    this.handleColorChange(colors)
  }
}
</script>

<style scoped>
.picker {
  padding: 10px 10px 0;
  box-sizing: initial;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15);
}
.saturation-container {
  width: 100%;
  padding-bottom: 75%;
  position: relative;
  overflow: hidden;
}

.controls {
  display: flex;
}

.sliders {
  padding: 4px 0;
  flex: 1;
}

.color {
  width: 24px;
  height: 24px;
  position: relative;
  margin-top: 4px;
  margin-left: 4px;
  border-radius: 3px;
}

.active-color {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.14902) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.247059) 0px 0px 4px inset;
  z-index: 2;
}

.hue-container {
  position: relative;
  height: 10px;
  overflow: hidden;
}

.alpha-container {
  position: relative;
  height: 10px;
  margin-top: 4px;
  overflow: hidden;
}

.presets {
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #eee;
  padding: 10px;
}
</style>
