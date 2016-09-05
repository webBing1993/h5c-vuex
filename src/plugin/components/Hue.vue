<template>
  <div class="hue">
    <div class="container"
         @mousedown="handleMouseDown"
         v-el:container>
      <div class="hue-pointer" :style="pointerStyle">
        <div class="slider"></div>
      </div>
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

  computed: {
    pointerStyle() {
      return {
        left: this.color.h * 100 / 360 + '%'
      }
    }
  },

  methods: {
    handleMouseDown(event) {
      this.handleChange(event)
      let container = this.$els.container
      container.addEventListener('mousemove', this.handleChange)
      container.addEventListener('mouseup', this.handleMouseUp)
    },

    handleMouseUp() {
      this.unbindEventListeners()
    },

    unbindEventListeners() {
      let container = this.$els.container
      container.removeEventListener('mousemove', this.handleChange)
      container.removeEventListener('mouseup', this.handleMouseUp)
    },
    handleChange(event) {
      event.preventDefault()

      let container = this.$els.container
      let containerWidth = container.clientWidth
      let left = (event.pageX || event.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset)
      let h
      if (left < 0) {
        h = 0
      } else if (left > containerWidth) {
        h = 359
      } else {
        let percent = left * 100 / containerWidth
        h = (360 * percent / 100)
      }
      let hsva = {
        h,
        s: this.color.s,
        v: this.color.v,
        a: this.color.a
      }
      let colors = getColor(hsva, 'hsva')
      this.$dispatch('color-change', colors)
    }
  }
}
</script>
<style scoped>
.hue {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25);
  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)
}

.container {
  position: relative;
  margin: 0 2px;
  height: 100%;
  width: 100%;
}

.hue-pointer {
  z-index: 2;
  position: absolute;
  height: 100%;
  width: 4px;
  background: #fff;
}

.slider {
  margin-top: 1px;
  width: 4px;
  border-radius: 1px;
  height: 20px;
  box-shadow: 0 0 2px rgba(0,0,0,.6);
  background: #fff;
  transform: translateX(-2px);
}
</style>
