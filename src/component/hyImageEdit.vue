<template>
<div id="imageEditPanel" class="panel panel-default panel-zone">
  <div class="panel-body">
    <ul class="nav nav-tabs">
      <li @click.stop="switchPanel(0)" class="active"><a href="javascript:;">样式</a></li>
      <li @click.stop="switchPanel(1)"><a href="javascript:;">动画</a></li>
    </ul>
    <div class="tab-content">
      <!-- 样式 -->
      <div class="tab-pane active">
        <div class="form-group-item">
          <div class="title">透明</div>
          <slider class="flex-col-5" 
            :min="0" :max="100" :step="0" 
            :value="opacity"
            @value-change="changeActiveCompOpacity">
          </slider>
          <div class="flex-col-1">
            <ui-text 
              :value="comp.style.opacity"
              :min="0" :max="100" type="float"
              @value-change="changeActiveCompOpacity"
              >
            </ui-text>
          </div>
          <div class="suffix">%</div>
        </div>
        <div class="form-group-item">
          <div class="title">圆角</div>
          <slider class="flex-col-5" 
            :min="0" :max="50" :step="0" 
            :value="comp.style.borderRadius"
            @value-change="changeActiveCompBorderRadius">
          </slider>
          <div class="flex-col-1">
            <ui-text 
              :value="comp.style.borderRadius"
              :min="0" :max="50" type="float"
              @value-change="changeActiveCompBorderRadius"
              >
            </ui-text>
          </div>
          <label class="suffix">%</label>
        </div>
        <div class="form-group-item">
          <div class="title">阴影</div>
          <slider class="flex-col-5" 
            :min="0" :max="200" :step="0" 
            :value="comp.style.boxShadow"
             @value-change="changeActiveCompBoxShadow"
            >
          </slider>
          <div class="flex-col-1">
            <ui-text 
              :value="comp.style.boxShadow"
              :min="0" :max="200" type="float"
              @value-change="changeActiveCompBorderRadius"
              >
            </ui-text>
          </div>
          <label class="suffix">px</label>
        </div>
        <div class="form-group-item">
          <span class="title">旋转:</span>
          <slider class="flex-col-5" 
            :min="0" :max="360" :step="0" 
            :value="comp.position.transform"
            @value-change="changeActiveCompTransform"
            >
          </slider>            
          <div class="flex-col-1">
            <ui-text 
              :value="comp.position.transform"
              :min="0" :max="360" type="int"
              @value-change="changeActiveCompTransform"
              >
            </ui-text>
          </div>
          <div class="suffix">度</div>
        </div>
        <div class="form-group-item">
          <hr>
        </div>
        <div class="form-group-item">
          <div class="title">大小</div>
          <div class="flex-row flex-col-7">
            <div class="sub-title">宽度:</div>
              <div class="flex-col-1"><input type="text" v-model="comp.position.width" number>
            </div>
            <div class="suffix">px</div>
            <div class="sub-title">高度:</div>
              <div class="flex-col-1"><input type="text" v-model="comp.position.height" number>
            </div>
            <div class="suffix">px</div>
          </div>
        </div>
        <div class="form-group-item">
          <div class="title">位置</div>
          <div class="flex-row flex-col-7">
            <div class="sub-title">X:</div>
              <div class="flex-col-1"><input type="text" v-model="comp.position.left" number>
            </div>
            <div class="suffix">px</div>
            <div class="sub-title">Y:</div>
              <div class="flex-col-1"><input type="text" v-model="comp.position.top" number>
            </div>
            <div class="suffix">px</div>
          </div>
        </div>
        <div class="form-group-item">
          <hr>
        </div>
        <div class="form-group-item flex-center">
          <div class="btn btn-success" @click="changePic">更换图片</div>
        </div>
      </div>
      <!-- 动画 -->
      <div class="tab-pane">
        <animate v-if="comp.animate" :animate.sync="comp.animate" :animate-show.sync="comp.isShowAnimate">
        </animate>
      </div>
    </div>
  </div>
    <!-- 图片选择弹窗  -->
  <picture-dialog 
    :show.sync="showPictureDialog"
    type="changePictrue">
  </picture-dialog>
</div>
</template>
<script>

import * as actions from '../vuex/actions'

import slider from'../plugin/slider.vue'
import uiText from '../plugin/uiText.vue'
import animate from'../plugin/animate.vue'
import pictureDialog from '../plugin/pictureDialog.vue'

module.exports = {
  vuex: {
    getters: {
      slide: state => state.slide,
      activePageIndex: state => state.activePageIndex,
      comp: state => state.currentComp
    },
    actions: actions
  }, 
  data: function(){
    return {
      showPictureDialog: false
    }
  },
  ready: function(){
    this.iscroll = new IScroll("#imageEditPanel .tab-pane", { 
      mouseWheel: true,
      scrollbars: false
    });
  },  
  computed: {
    opacity: {
      get: function () {
        return 100 - (this.comp.style.opacity * 100);
      },
      set: function (newValue) {
        this.comp.style.opacity = (100 - newValue) / 100;
      }      
    }
  },
  methods:{
    switchPanel: function(index){
      $('#imageEditPanel').find('.nav-tabs li').removeClass('active');
      $('#imageEditPanel').find('.nav-tabs li').eq(index).addClass('active');
      $('#imageEditPanel .tab-pane').css('visibility', 'hidden');
      $('#imageEditPanel .tab-pane').eq(index).css('visibility', 'visible')
      setTimeout(function(){
        this.iscroll = new IScroll("#imageEditPanel .tab-pane", { 
          mouseWheel: true,
          scrollbars: false
        });        
      },0)
    },
    changeActiveCompOpacity: function(value, flag){
      var config = {
        style: {
          opacity: value
        }
      };
      this.changeActiveComp(config, flag); 
    },
    changeActiveCompBorderRadius: function(value, flag){
      var config = {
        style: {
          borderRadius: value
        }
      };
      this.changeActiveComp(config, flag); 
    },
    changeActiveCompBoxShadow: function(value, flag){
      var config = {
        style: {
          boxShadow: value
        }
      };
      this.changeActiveComp(config, flag); 
    },
    changeActiveCompTransform: function(value, flag){
      var config = {
        position: {
          transform: value
        }
      };
      this.changeActiveComp(config, flag);       
    },
    changePic: function(){
      this.showPictureDialog = true;
    }
  },
  events: {
    changePictrue: function (imgSrc, flag) {
      var config = {
        imgSrc: imgSrc
      };
      this.changeActiveComp(config, true); 
    }
  },   
  components: {
    uiText,
    animate,
    slider,
    pictureDialog
  }  
}
</script>
<style scoped>
  .tab-content > .tab-pane {
    display: block;
    visibility: hidden;
  }
  .tab-content > .tab-pane.active{
    visibility: visible;
  }   
  .img-collection li {
    float: left;
    width: 130px;
    height: 230px;
    background: #fff;
    margin-top: 8px;
    margin-left: 10px;
    position: relative;
    cursor: pointer;  
  }
  .img-collection  li img{
    width: 100%;
    height: 100%;
  } 
</style>
