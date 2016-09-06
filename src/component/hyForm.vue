<template>
<div class="hy-comp-form">
  <drag 
    :active="comp.active"
    :enable="dragEnable"
    :top="comp.position.top"
    :left="comp.position.left"
    :height="comp.position.height"    
    :width="comp.position.width"
    :transform="comp.position.transform"
    :handles="'nw, ne, sw, se'"
    @postion-change="changeActiveCompPostion"> 
    <div class="inner" 
      :class="{'animated': isAnimated}" 
      :style="[fixStyle, animateStyle]">
        <component 
        v-for="(index, item) in comp.list" track-by="$index"
        :is="item.type"
        :item="item">
        </component>
      <div class="form-item form-button">
        <button class="button-submit">{{comp.btn.text}}</button>
      </div>      
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
  computed: {
    isAnimated: function(){
      return ! (this.comp.animate.name === 'none') && this.animatable;
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
        } else if (['borderWidth'].indexOf(prop) > -1) {
          tmp[prop] = this.comp.style[prop] + 'px';      
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
    drag: require('../plugin/drag.vue'),
    xText: require('../form/xText.vue'),
    xStar: require('../form/xStar.vue'),
    xRadio: require('../form/xRadio.vue'),
    xCheckbox: require('../form/xCheckbox.vue')    
  }
}
</script>
<style>
  .hy-comp-form .inner {
    padding-top: 10px;
  }
  .hy-comp-form .form-item{
    margin: 5px auto;
    width: 80%;
    text-align: left;
    font-size: 14px;
    color: #666;
  }
  .hy-comp-form .form-item h3,
  .hy-comp-form .form-item label {
    font-weight: normal;
    margin: 0;
  }
  .hy-comp-form .form-item h3 {
    line-height: 20px;
    font-size: 16px;
    color: #333;
  }
  .hy-comp-form .form-item-star {
    margin:10px auto;
  }
  .hy-comp-form .form-item-star .star{
    font-size: 30px;
    display: flex;
    justify-content: space-between;    
  }
  .hy-comp-form .form-item-star .star .active {
    color: rgb(255, 130, 11);
  }
  .hy-comp-form .form-item  input[type="text"] {
    width: 100%;
    height: 30px;
    padding: 2px 4px;
    border: 1px solid #666;    
  }
  /* 单选，复选框 */
  .form-select label {
    position: relative;
  }
  .form-select label .icon-circle-blank,
  .form-select label .icon-ok-circle,
  .form-select label .icon-check-empty,
  .form-select label .icon-check   {
    width: 20px;
    color: #666;
    font-size: 20px;
  }
  .form-select input {
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    opacity: 0;
  }
  .form-select input ~ .icon-circle-blank,
  .form-select input:checked ~ .icon-ok-circle,
  .form-select input ~ .icon-check-empty,
  .form-select input:checked ~ .icon-check {
    display:inline-block;
  } 
  .form-select input ~ .icon-ok-circle,
  .form-select input:checked ~ .icon-circle-blank,
  .form-select input ~ .icon-check,
  .form-select input:checked ~ .icon-check-empty
  {
    display:none;
  }  
  /* 提交按钮 */
  .hy-comp-form .form-button {
    margin-top: 10px;
    text-align: center;
  }
  .hy-comp-form .form-button .button-submit {
    border:none;
    border-radius: 5px;
    padding: 10px 40px;
    color: #fff;
    background: rgb(255, 153,0);   
  }
</style>
<style scoped>
  .hy-comp-form{
    position: absolute;
    top:0;
    left:0;
  }
  .inner {
    width: 100%;
    height: 100%;
    overflow: hidden;    
  }
</style>