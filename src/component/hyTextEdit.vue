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
            <textarea class="flex-col-1" 
              :value="comp.text"
              @input="changeActiveCompText" 
              @blur="changeActiveCompText($event, true)"
              placeholder="请输入文字"        
              ></textarea>          
          </div>
          <div class="form-group-item">
            <hr>
          </div>
          <div class="form-group-item">
            <span class="title">颜色:</span>
            <div class="flex-col-7">
              <color-pick class="flex-col-7 color-picker" :color.sync="comp.style.color"></color-pick>
            </div>
          </div>
          <div class="form-group-item">
            <span class="title">字号:</span>
            <select class="flex-col-7" v-model="fontSize">
              <option v-for="n in arrFontSize" :value="n">{{n}}</option>
            </select>
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
            <hr>
          </div>
          <div class="form-group-item">
            <div class="btn-group flex-col-3">
              <button type="button" class="btn btn-default" :class="{'active': isBold}" @click="toggleBold">
                <i class="icon-bold"></i>
              </button>
              <button type="button" class="btn btn-default" :class="{'active': isItalic}" @click="toggleItalic">
                <i class="icon-italic"></i>
              </button>
              <button type="button" class="btn btn-default" :class="{'active': isUnderline}" @click="toggleUnderline">
                <i class="icon-underline"></i>
              </button>
            </div>
            <div class="btn-group flex-col-4">
              <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" v-for="type in arrTextAlign" :class="{'active': type.name == this.comp.style.textAlign}" title="{{type.tips}}" @click="toggleTextAlign(type.name)">
                <i class="icon-align-{{type.name}}"></i>
              </button>
            </div>
          </div>
          <div class="form-group-item">
            <hr>
          </div>
          <div class="form-group-item">
            <span class="title">行高:</span>
            <slider class="flex-col-5" :min="0" :max="10" :step="1" :value.sync="comp.style.lineHeight">
            </slider>
            <!-- <input type="text" v-model="comp.style.lineHeight" number debounce="50"> -->
            <div class="flex-col-1">
              <input type="text" v-validate="comp.style.lineHeight" :min="0" :max="10" :value="comp.style.lineHeight" />
            </div>
            <div class="suffix">倍</div>
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
<style scoped>
  .tab-content > .tab-pane {
    display: block;
    visibility: hidden;
  }
  .tab-content > .tab-pane.active{
    visibility: visible;
  }
</style>
<script>

import * as actions from '../vuex/actions'

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
      arrTextAlign: [{
        name: 'left',
        tips: '左对齐'
      },{
        name: 'center',
        tips: '居中对齐'        
      },{
        name: 'right',
        tips: '右对齐'        
      },{
        name: 'justify',
        tips: '两端对齐'        
      }]
    }
  },
  computed: {
    fontSize:{
      get: function(){
        return this.comp.style.fontSize.replace('px','');
      },
      set: function(newVal){
        this.comp.style.fontSize = newVal + 'px';
      }
    },
    isBold: function(){
      return this.comp.style.fontWeight === 'bold';
    },
    isItalic: function(){
      return this.comp.style.fontStyle === 'italic';
    },
    isUnderline: function(){
      return this.comp.style.textDecoration === 'underline';
    }    
  },
  methods: {
    changeActiveCompText: function(event, flag){
      var value = event.target.value;
      var config = $.extend(true, this.comp, {
        text: value
      });
      this.changeActiveComp(config, flag);
    },
    switchPanel: function(index){
      $('#textEditPanel').find('.nav-tabs li').removeClass('active');
      $('#textEditPanel').find('.nav-tabs li').eq(index).addClass('active');
      $('#textEditPanel .tab-pane').css('visibility', 'hidden');
      $('#textEditPanel .tab-pane').eq(index).css('visibility', 'visible')
    },    
    toggleBold: function(){
      this.comp.style.fontWeight = this.isBold ? 'normal' : 'bold';
    },
    toggleItalic: function(){
      this.comp.style.fontStyle = this.isItalic ? 'normal' : 'italic';
    },
    toggleUnderline: function(){
      this.comp.style.textDecoration = this.isUnderline ? 'none' : 'underline';
    },
    toggleTextAlign: function(type){
      this.comp.style.textAlign = type;
    }
  },
  components: {
    animate: require('../plugin/animate.vue'),
    colorPick: require('../plugin/colorPick.vue'),
    slider: require('../plugin/slider.vue')
  }
}
</script>