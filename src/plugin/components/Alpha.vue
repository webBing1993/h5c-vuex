<template>
  <div class="alpha">
    <div class="checkboard">
      <checkboard :position="'center left'"></checkboard>
    </div>
    <div class="gradient" :style="alphaStyle"></div>
    <div class="container"
         @mousedown="handleMouseDown"
         v-el:container>
      <div class="alpha-pointer" :style="pointerStyle">
        <div class="slider"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {getColor} from '../helpers/color'
import Checkboard from './Checkboard.vue'
export default {
  props: {
    color: {
      type: Object
    }
  },
  components: {
    Checkboard
  },
  computed: {
    pointerStyle() {
      return {
        left: this.color.a * 100 + '%'
      }
    },
    alphaStyle() {
      let rgb = `${this.color.r},${this.color.g},${this.color.b}`
      return {
        background: `linear-gradient(to right, rgba(${rgb},0) 0%, rgba(${rgb},1) 100%)`
      }
    }
  },

  methods: {
    handleMouseDown(event) {
      this.handleChange(event)
      window.addEventListener('mousemove', this.handleChange)
      window.addEventListener('mouseup', this.handleMouseUp)
    },

    handleMouseUp() {
      this.unbindEventListeners()
    },

    unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleChange)
      window.removeEventListener('mouseup', this.handleMouseUp)
    },

    handleChange(event) {
      event.preventDefault()

      let container = this.$els.container
      let containerWidth = container.clientWidth
      let left = (event.pageX || event.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset)

      let a
      if (left < 0) {
        a = 0
      } else if (left > containerWidth) {
        a = 1
      } else {
        a = Math.round(left * 100 / containerWidth) / 100
      }

      let hsva = {
        h: this.color.h,
        s: this.color.s,
        v: this.color.v,
        a
      }
      let colors = getColor(hsva, 'hsva')
      this.$dispatch('color-change', colors)
    }
  }
}
</script>

<style scoped>
.alpha {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-radius: 2px;
}

.checkboard {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}

.gradient {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25);
}

.container {
  position: relative;
  z-index: 2;
  height: 100%;
  margin: 0 3px;
}
.alpha-pointer {
  position: absolute;
  z-index: 2;
}

.slider {
  width: 4px;
  border-radius: 1px;
  height: 20px;
  box-shadow: 0 0 2px rgba(0, 0, 0, .6);
  background: #fff;
  margin-top: 1px;
  transform: translateX(-2px);
}
</style>
