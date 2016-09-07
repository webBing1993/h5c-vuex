<template>
  <div id="textEditPanel" class="panel panel-default panel-zone">
    <div class="panel-body">
      <ul class="nav nav-tabs">
        <li @click.stop="switchPanel(0)" class="active"><a href="javascript:;">样式</a></li>
        <li @click.stop="switchPanel(1)"><a href="javascript:;">动画</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane active">
          <div class="form-group-item">
            <span class="title">文字:</span>
            <input placeholder="请输入按钮文字" class="flex-col-7 ipt" v-model="comp.text" />
          </div>
          <div class="form-group-item">
            <span class="title">链接:</span>
            <div class="flex-row flex-col-7" style="position:relative;">
              <input placeholder="请输入网址" class="flex-col-1 ipt" :value="comp.link" @blur="checklink($event)"/>
              <div v-show="linkErr" class="form-error">链接有误</div>
            </div>
          </div>
          <div class="form-group-item">
            <span class="title">字体:</span>
            <select class="flex-col-7" v-model="comp.style.fontFamily">
              <option value="Microsoft Yahei">微软雅黑</option>
              <option value="\5B8B\4F53">宋体</option>
              <option value="\9ED1\4F53">黑体</option>
            </select>
          </div>
          <div class="form-group-item">
            <span class="title">字号:</span>
            <select class="flex-col-7" v-model="comp.style.fontSize">
              <option v-for="n in arrFontSize" :value="n">{{n}}</option>
            </select>
          </div>                                 
          <div class="form-group-item">
            <hr>
          </div>
          <div class="form-group-item">
            <span class="title">文字色:</span>
            <div class="flex-col-5">
              <color-pick class="flex-col-7 color-picker" :color.sync="comp.style.color"></color-pick>
            </div>
          </div>
          <div class="form-group-item">
            <span class="title">填充色:</span>
            <div class="flex-col-5">
              <color-pick class="flex-col-7 color-picker" :color.sync="comp.style.backgroundColor"></color-pick>
            </div>
          </div>
          <div class="form-group-item">
            <span class="title">边框色:</span>
            <div class="flex-col-5">
              <color-pick class="flex-col-7 color-picker" :color.sync="comp.style.borderColor"></color-pick>
            </div>
          </div>
          <div class="form-group-item">
            <hr>
          </div>          
          <div class="form-group-item">
            <span class="title">边框:</span>
            <slider class="flex-col-5" :min="0" :max="10" :step="1" :value.sync="comp.style.borderWidth">
            </slider>
            <!-- <input type="text" v-model="comp.style.lineHeight" number debounce="50"> -->
            <div class="flex-col-1">
              <input type="text" v-validate="comp.style.lineHeight" :min="0" :max="10" :value="comp.style.borderWidth" />
            </div>
            <div class="suffix">px</div>
          </div>
          <div class="form-group-item">
            <div class="title">圆角</div>
            <slider class="flex-col-5" :min="0" :max="50" :step="0" :value.sync="comp.style.borderRadius"></slider>
            <!-- <input type="text" v-model="comp.style.borderRadius" number> -->
            <div class="flex-col-1">
              <input type="text" v-validate="comp.style.borderRadius" :min="0" :max="50" :value="comp.style.borderRadius">
            </div>
            <label class="suffix">%</label>
          </div>
          <div class="form-group-item">
            <div class="title">透明</div>
            <slider class="flex-col-5" :min="0" :max="100" :step="0" :value.sync="opacity"></slider>
            <!-- <input type="text" v-model="opacity" number> -->
            <div class="flex-col-1">
              <input type="text" v-validate="opacity" :min="0" :max="100" :value="opacity">
            </div>
            <div class="suffix">%</div>
          </div>          
          <div class="form-group-item">
            <span class="title">旋转:</span>
            <slider class="flex-col-5" :min="0" :max="360" :step="0" :value.sync="comp.position.transform">
            </slider>
            <!-- <input type="text" v-model="comp.position.transform" number debounce="50"> -->
            <div class="flex-col-1">
              <input style="width:100%" type="text" v-validate="comp.position.transform" :min="0" :max="360" :value="comp.position.transform" />
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
              <div class="flex-col-1">
                <input type="text" v-model="comp.position.width" number>
              </div>
              <div class="suffix">px</div>
              <div class="sub-title">高度:</div>
              <div class="flex-col-1">
                <input type="text" v-model="comp.position.height" number>
              </div>
              <div class="suffix">px</div>
            </div>
          </div>
          <div class="form-group-item">
            <div class="title">位置</div>
            <div class="flex-row flex-col-7">
              <div class="sub-title">X:</div>
              <div class="flex-col-1">
                <input type="text" v-model="comp.position.left" number>
              </div>
              <div class="suffix">px</div>
              <div class="sub-title">Y:</div>
              <div class="flex-col-1">
                <input type="text" v-model="comp.position.top" number>
              </div>
              <div class="suffix">px</div>
            </div>
          </div>        
        </div>
        <div class="tab-pane">
          <animate 
            v-if="comp.animate" 
            :animate.sync="comp.animate" 
            :animate-show.sync="comp.isShowAnimate"
          >
          </animate>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import * as actions from '../vuex/actions'

import slider from'../plugin/slider.vue'
import uiText from '../plugin/uiText.vue'
import animate from'../plugin/animate.vue'
import colorPick from'../plugin/colorPick.vue'

var arrFontSize = [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119];

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
      arrFontSize: arrFontSize,
      linkErr: false
    }
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
  methods: {
    switchPanel: function(index){
      $('#textEditPanel').find('.nav-tabs li').removeClass('active');
      $('#textEditPanel').find('.nav-tabs li').eq(index).addClass('active');
      $('#textEditPanel .tab-pane').css('visibility', 'hidden');
      $('#textEditPanel .tab-pane').eq(index).css('visibility', 'visible')
    },
    checklink: function(evt){
      var _this = this;
      var value = evt.target.value;
      var reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if(reg.test(value) || !value){
        this.linkErr = false;
      }
      else{
        this.linkErr = true;
        if(this.linkErrHandel) {
          clearTimeout(this.linkErrHandel);
        }
        this.linkErrHandel = setTimeout(function(){
          _this.linkErr = false;
        },1000)
      }
      this.comp.link = value;
    }
  },
  components: {
    uiText,
    animate,
    colorPick,
    slider
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
  .form-error{
    position: absolute;
    left: 4px;
    bottom: -26px;
    z-index: 10;
    display: inline-block;
    max-width: 450px;
    padding: 5px 8px;
    margin: 3px 0 0;
    font-size: 13px;
    font-weight: normal;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    color: #911;
    background-color: #fcdede;
    border-color: #d2b2b2;    
  }
  .form-error::before {
    position: absolute;
    bottom: 100%;
    left: 10px;
    z-index: 15;
    width: 0;
    height: 0;
    pointer-events: none;
    content: " ";
    border: solid transparent;
    margin-left: -1px;
    border-width: 6px;
    border-bottom-color: #d2b2b2            
  }
  .form-error::after {
    position: absolute;
    bottom: 100%;
    left: 10px;
    z-index: 15;
    width: 0;
    height: 0;
    pointer-events: none;
    content: " ";
    border: solid transparent;
    border-width: 5px;  
    border-bottom-color: #fcdede;  
  }
</style>