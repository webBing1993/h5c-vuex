<template>
  <div class="animate-edit-wrap">
    <div class="form-group-item">
      <span class="title">类型:</span>
      <div class="flex-row flex-col-7">
        <select class="flex-col-6" 
          :value="comp.animate.name"
          @change="changeActiveCompAnimateName"
          >
            <option value="none">请选择</option>
            <optgroup label="强调">
               <option value="bounce">弹跳</option>
               <option value="flash">闪烁</option>
               <option value="pulse">脉动</option>
               <option value="rubberBand">橡皮圈</option>
               <option value="shake">摇动</option>
               <option value="swing">摆动</option>
               <option value="tada">波动</option>
               <option value="wobble">晃动</option>
               <option value="jello">果冻</option>
            </optgroup>

            <optgroup label="弹现">
              <option value="bounceIn">弹动出现</option>
              <option value="bounceInDown">向下弹入</option>
              <option value="bounceInLeft">从左弹入</option>
              <option value="bounceInRight">从右弹入</option>
              <option value="bounceInUp">向上弹入</option>
            </optgroup>

<!--             <optgroup label="弹出">
              <option value="bounceOut">弹动出现</option>
              <option value="bounceOutDown">向下弹入</option>
              <option value="bounceOutLeft">从左弹入</option>
              <option value="bounceOutRight">从右弹入</option>
              <option value="bounceOutUp">向上弹入</option>
            </optgroup> -->

            <optgroup label="渐现">
              <option value="fadeIn">渐现</option>
              <option value="fadeInDown">向下渐现</option>
              <option value="fadeInDownBig">大幅向下渐现</option>
              <option value="fadeInLeft">从左渐现</option>
              <option value="fadeInLeftBig">大幅从左渐现</option>
              <option value="fadeInRight">从右渐现</option>
              <option value="fadeInRightBig">大幅从右渐现</option>
              <option value="fadeInUp">向上渐现</option>
              <option value="fadeInUpBig">大幅向上渐现</option>
            </optgroup>

<!--             <optgroup label="渐隐">
              <option value="fadeOut">渐隐</option>
              <option value="fadeOutDown">向下渐隐</option>
              <option value="fadeOutDownBig">大幅向下渐隐</option>
              <option value="fadeOutLeft">向左渐隐</option>
              <option value="fadeOutLeftBig">大幅向左渐隐</option>
              <option value="fadeOutRight">向右渐隐</option>
              <option value="fadeOutRightBig">大幅向右渐隐</option>
              <option value="fadeOutUp">向上渐隐</option>
              <option value="fadeOutUpBig">大幅向上渐隐</option>
            </optgroup> -->

            <optgroup label="翻转">
              <option value="flip">翻转</option>
              <option value="flipInX">横向翻入</option>
              <option value="flipInY">纵向翻入</option>
<!--               <option value="flipOutX">横向翻出</option>
              <option value="flipOutY">纵向翻出</option> -->
            </optgroup>

            <optgroup label="快速">
              <option value="lightSpeedIn">快速进入</option>
              <!-- <option value="lightSpeedOut">快速移出</option> -->
            </optgroup>

<!--             <optgroup label="旋入">
              <option value="rotateIn">旋转进入</option>
              <option value="rotateInDownLeft">从左往下旋入</option>
              <option value="rotateInDownRight">从右往下旋入</option>
              <option value="rotateInUpLeft">从左往上旋入</option>
              <option value="rotateInUpRight">从右往上旋入</option>
            </optgroup> -->

<!--             <optgroup label="旋出">
              <option value="rotateOut">旋转离开</option>
              <option value="rotateOutDownLeft">向左下旋出</option>
              <option value="rotateOutDownRight">向右下旋出</option>
              <option value="rotateOutUpLeft">向左上旋出</option>
              <option value="rotateOutUpRight">向右上旋出</option>
            </optgroup> -->

            <optgroup label="滑入">
              <option value="slideInUp">向上滑入</option>
              <option value="slideInDown">向下滑入</option>
              <option value="slideInLeft">从左滑入</option>
              <option value="slideInRight">从右滑入</option>
            </optgroup>

<!--             <optgroup label="滑出">
              <option value="slideOutUp">向上滑出</option>
              <option value="slideOutDown">向下滑出</option>
              <option value="slideOutLeft">向左滑出</option>
              <option value="slideOutRight">向右滑出</option>
            </optgroup> -->
            
            <optgroup label="放大">
              <option value="zoomIn">放大进入</option>
              <option value="zoomInDown">向下放大</option>
              <option value="zoomInLeft">从左放大</option>
              <option value="zoomInRight">从右放大</option>
              <option value="zoomInUp">向上放大</option>
            </optgroup>
            
<!--             <optgroup label="缩小">
              <option value="zoomOut">缩小离开</option>
              <option value="zoomOutDown">向下缩小</option>
              <option value="zoomOutLeft">向左缩小</option>
              <option value="zoomOutRight">向右缩小</option>
              <option value="zoomOutUp">向上缩小</option>
            </optgroup> -->

<!--             <optgroup label="特效">
              <option value="hinge">剥落</option>
              <option value="rollIn">翻滚进入</option>
              <option value="rollOut">翻滚离开</option>
            </optgroup> -->
        </select>        
      </div>
    </div>
    <div class="form-group-item">
      <span class="title">速度:</span>
      <slider class="flex-col-5" 
        :min="0" :max="10" :step="0.1" 
        :value="comp.animate.duration"
        @value-change="changeActiveCompAnimateDuration"
        >
      </slider>
      <div class="flex-col-1">
        <ui-text 
          :value="comp.animate.duration"
          :min="0" :max="10" type="float"
          @value-change="changeActiveCompAnimateDuration"
          >
        </ui-text>
      </div>
      <span class="suffix">s</span>
    </div>    
    <div class="form-group-item">
      <span class="title">延迟:</span>
      <slider class="flex-col-5" 
        :min="0" :max="10" :step="0.1" 
        :value="comp.animate.delay"
        @value-change="changeActiveCompAnimateDelay"
        >
      </slider>      
      <div class="flex-col-1">
        <ui-text 
          :value="comp.animate.delay"
          :min="0" :max="10" type="float"
          @value-change="changeActiveCompAnimateDelay"
          >
        </ui-text>
      </div>
      <span class="suffix">s</span>
    </div>
    <div class="form-group-item">
      <hr>      
    </div>
<!--     <div class="form-group-item flex-center">
      <button class="btn btn-success" @click="showAnimate">预览</button>
    </div>  -->   
  </div>
</template>
<style scoped>
</style>
<script>

  import * as actions from '../vuex/actions'
  
  import slider from'../plugin/slider.vue'
  import uiText from '../plugin/uiText.vue'

  module.exports = {
    vuex: {
      getters: {
        slide: state => state.slide,
        activePageIndex: state => state.activePageIndex,
        comp: state => state.currentComp
      },
      actions: actions
    },      
    methods: {
      changeActiveCompAnimateName: function(value, flag){
        var value = event.target.value;
        var config = {
          animate: {
            name: value
          }
        };
        this.changeActiveComp(config, flag);
      },      
      changeActiveCompAnimateDelay: function(value, flag){
        var config = {
          animate: {
            delay: value
          }
        };
        this.changeActiveComp(config, flag);
      },
      changeActiveCompAnimateDuration: function(value, flag){
        var config = {
          animate: {
            duration: value
          }
        };
        this.changeActiveComp(config, flag);
      },      
      showAnimate: function(){
        var _this = this;
        this.animateShow = true;
        setTimeout(function(){
          _this.animateShow = false;
        }, 2000)
      }
    },
    components: {
      slider, uiText
    }
  }
</script>