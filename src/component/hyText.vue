<template>
<div class="hy-comp-button">
 <!-- <pre>{{currentComp | json}}</pre>  -->
  <drag 
    :active="currentComp.active"
    :enable="dragEnable"
    :top.sync="currentComp.position.top"
    :left.sync="currentComp.position.left"
    :width.sync="currentComp.position.width"
    :height.sync="currentComp.position.height"
    :transform.sync="currentComp.position.transform"
    :handles="'ne, se, sw, nw'">
    <div class="inner" 
      :class="{'animated': isAnimated}"
      :style="[currentComp.style, animateStyle]">     
      {{currentComp.text}} 
    </div>
  </drag>
</div>
</template>
<style scoped>
  .hy-comp-button{
    position: absolute;
    top:0;
    left:0;
  }
  .inner {
    width: 100%;
    height: 100%;
    text-align: center;
    overflow: hidden;
  }
</style>
<script>
import * as actions from '../vuex/actions'

var findInArray =  function (array, callback) {
  for (let i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}
export default {
  vuex: {
    getters: {
      slide: state => state.slide,
      activePageIndex: state => state.activePageIndex,
      currentComp: state => state.currentComp
    },
    actions: actions
  },  
  // props: {
  //   comp: {
  //     type: Object,
  //     required: true
  //   },
  //   dragEnable:{
  //     type: Boolean,
  //     default: true
  //   },
  //   animatable:{
  //     type: Boolean,
  //     default: true
  //   }    
  // },
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
      return ! (this.currentComp.animate.name === 'none') && this.animatable;;
    },
    fixStyle: function(){
      var tmp = {};
      for(var prop in this.currentComp.style){
        if( ['left','top','width','height'].indexOf(prop) > -1 ){
          tmp[prop] = this.currentComp.style[prop] + 'px';
        }
        else if(['transform'].indexOf(prop) > -1){
          tmp[prop] = 'rotate(' + this.currentComp.style[prop] + 'deg)';
        }
        else{
          tmp[prop] = this.currentComp.style[prop]
        }
      }
      return tmp;
    },
    animateStyle: function(){
      return {
        animationName: this.currentComp.animate.name, 
        animationDuration: this.currentComp.animate.duration + 's',
        animationDelay: this.currentComp.animate.delay + 's'
      };
    }
  },
  components:{
    drag: require('../plugin/drag.vue')
  }
}
</script>