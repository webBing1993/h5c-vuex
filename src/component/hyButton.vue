<template>
<div class="hy-comp-text">
  <drag 
    :active="comp.active"
    :enable="dragEnable"
    :top.sync="comp.position.top"
    :left.sync="comp.position.left"
    :width.sync="comp.position.width"
    :height.sync="comp.position.height"
    :transform.sync="comp.position.transform"
    :handles="'ne, se, sw, nw'">
    <div class="inner" 
      :class="{'animated': isAnimated}"
      :style="[fixStyle, animateStyle]">
      {{comp.text}} 
    </div>
  </drag>
</div>
</template>
<style scoped>
  .hy-comp-text{
    position: absolute;
    top:0;
    left:0;
  }
  .inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;    
  }  
</style>
<script>
var findInArray =  function (array, callback) {
  for (let i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}
module.exports = {
  props: {
    comp: {
      type: Object,
      required: true
    },
    dragEnable:{
      type: Boolean,
      default: true
    },
    animatable:{
      type: Boolean,
      default: true
    }    
  },
  data: function(){
    return {
      parentWidth: 0,
      parentHeight: 0
    }
  },
  ready: function(){
    this.$dispatch('compReady');
    this.parentWidth = this.$el.parentElement.getBoundingClientRect().width;
    this.parentHeight = this.$el.parentElement.getBoundingClientRect().height;   
  },
  computed:{
    isAnimated: function(){
      return ! (this.comp.animate.name === 'none') && this.animatable;;
    },
    fixStyle: function(){
      var tmp = {};
      for(var prop in this.comp.style){
        if( ['fontSize'].indexOf(prop) > -1 ){
          tmp[prop] = this.comp.style[prop] + 'px';
        }
        else if(['borderWidth'].indexOf(prop) > -1){
          tmp[prop] = this.comp.style[prop] + 'px';
        }
        else if(['borderRadius'].indexOf(prop) > -1){
          tmp[prop] = this.comp.style[prop] + '%';
        }        
        else{
          tmp[prop] = this.comp.style[prop]
        }
      }
      return tmp;
    },
    animateStyle: function(){
      return {
        animationName: this.comp.animate.name, 
        animationDuration: this.comp.animate.duration + 's',
        animationDelay: this.comp.animate.delay + 's'
      };
    }
  },
  components:{
    drag: require('../plugin/drag.vue')
  }
}
</script>