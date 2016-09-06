<template>
  <div class="hy-comp-image" :style="{zIndex: comp.zIndex}">
    <drag
    v-el:drag
    :active="comp.active"
    :enable="dragEnable"
    :top="comp.position.top"
    :left="comp.position.left"
    :width="comp.position.width"
    :height="comp.position.height"
    :transform="comp.position.transform"
    @postion-change="changeActiveCompPostion">
      <div class="img-wrap" 
        :class="{'animated': isAnimated}" 
        :style="[fixStyle, animateStyle]">
        <img :src="comp.imgSrc | realImgSrc">
      </div>
    </drag>
  </div>
</template>
<style>
  .hy-comp-image {
    position: absolute;
    top:0;
    left:0;
  }
  .hy-comp-image  .img-wrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .hy-comp-image  .img-wrap img{
    width: 100%;
    height: 100%;
  }
</style>
<script>
import * as actions from '../vuex/actions'

module.exports = {
  vuex: {
    getters: {
    },
    actions: actions
  },  
  data: function(){
    return {
      showContextMenu: false,
      offsetTop:0,
      offsetLeft:0
    }
  },
  props: {
    comp: {
      type: Object
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
  computed: {
    isAnimated: function(){
      return !(this.comp.animate.name === 'none') && this.animatable;
    },
    fixStyle: function() {
      var tmp = {};
      for (var prop in this.comp.style) {
        if (['left', 'top', 'width', 'height'].indexOf(prop) > -1) {
          tmp[prop] = this.comp.style[prop] + 'px';
        } else if (['transform'].indexOf(prop) > -1) {
          tmp[prop] = 'rotate(' + this.comp.style[prop] + 'deg)';
        } else if (['boxShadow'].indexOf(prop) > -1) {
          tmp[prop] = 'rgba(0,0,0, .5) 0px 0px ' + this.comp.style[prop] + 'px';
        } else if (['borderRadius'].indexOf(prop) > -1) {
          tmp[prop] = this.comp.style[prop] + '%';
        } else {
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
  attached: function(){
    var _this = this;
      // console.log($(_this.$els.drag).outerWidth());
      // console.log($(_this.$els.drag).outerHeight()); 
    // this.comp.position.height = $(_this.$els.drag).outerHeight(); 
  },  
  ready: function() {
    this.$dispatch('compReady');
  },
  methods: {
    changeActiveCompPostion: function(position, flag){
      var config = {
        position: position
      };
      this.changeActiveComp(config, flag);
    }
  },
  components: {
    drag: require('../plugin/drag.vue')
  }
}
</script>