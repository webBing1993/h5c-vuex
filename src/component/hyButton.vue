<template>
<div class="hy-comp-text">
  <drag 
    :active="comp.active"
    :enable="dragEnable"
    :top="comp.position.top"
    :left="comp.position.left"
    :width="comp.position.width"
    :height="comp.position.height"
    :transform="comp.position.transform"
    @postion-change="changeActiveCompPostion"
    :handles="'ne, se, sw, nw'">
    <div class="inner" 
      :class="{'animated': isAnimated}"
      :style="[fixStyle, animateStyle]">
      {{comp.text}} 
    </div>
  </drag>
</div>
</template>

<script>

import * as actions from '../vuex/actions'

module.exports = {
  vuex: {
    getters: {
    },
    actions: actions
  },   
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
  methods: {
    changeActiveCompPostion: function(position, flag){
      var config = {
        position: position
      };
      this.changeActiveComp(config, flag);
    }
  },  
  components:{
    drag: require('../plugin/drag.vue')
  }
}
</script>

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