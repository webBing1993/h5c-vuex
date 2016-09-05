<template>
  <div class="saturation" :style="saturationStyle"
       @mousedown="handleMouseDown"
       v-el:container>
    <div class="white">
      <div class="black"></div>
      <div class="saturation-pointer" :style="pointerStyle">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>

<script>
let getColor = require('../helpers/color').getColor
export default {
  props: {
    color: {
      type: Object
    }
  },

  computed: {
    saturationStyle() {
      return {
        background: `hsl(${this.color.h},100%,50%)`
      }
    },

    pointerStyle() {
      return {
        top: -(this.color.v * 100) + 100 + '%',
        left: this.color.s * 100 + '%'
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
      let containerHeight = container.clientHeight
      let left = (event.pageX || event.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset)
      let top = (event.pageY || event.touches[0].pageY) - (container.getBoundingClientRect().top + window.pageYOffset)
      // console.log(left, top)
      if (left < 0) {
        left = 0
      } else if (left > containerWidth) {
        left = containerWidth
      } else if (top < 0) {
        top = 0
      } else if (top > containerHeight) {
        top = containerHeight
      }
      let satutation = left / containerWidth
      let bright = -(top / containerHeight) + 1

      let hsva = {
        h: this.color.h,
        s: satutation,
        v: bright,
        a: this.color.a
      }
      let colors = getColor(hsva, 'hsva')
      // console.log(colors)
      this.$dispatch('color-change', colors)
    }
  }
}
</script>

<style scoped>
.saturation {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 3px;
}

.white {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(to right, #fff, rgba(255,255,255,0));
}

.black {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(to top, #000, rgba(0,0,0,0));
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25);
}

.saturation-pointer {
  position: absolute;
  cursor: default;
}

.circle {
  width: 4px;
  height: 4px;
  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4);
  border-radius: 50%;
  cursor: hand;
  transform: translate(-2px,-2px);
}
</style>
