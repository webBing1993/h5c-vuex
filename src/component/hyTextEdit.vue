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
              <color-pick 
                class="flex-col-7 color-picker" 
                :color="comp.style.color"
                @color-change="changeActiveCompColor"
                >
            </color-pick>
            </div>
          </div>
          <div class="form-group-item">
            <span class="title">字号:</span>
            <select class="flex-col-7" 
              :value="comp.style.fontSize" 
              @change="changeActiveCompFontSize">
              <option v-for="n in arrFontSize" :value="n">{{n}}</option>
            </select>
          </div>
          <div class="form-group-item">
            <span class="title">字体:</span>
            <select class="flex-col-7" 
              :value="comp.style.fontFamily"
              @change="changeActiveCompFontFamily">
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
            <slider class="flex-col-5" 
              :min="0" :max="10" :step="1" 
              :value="comp.style.lineHeight"
              @value-change="changeActiveCompLineHeight"
              >
            </slider>
            <div class="flex-col-1">
              <ui-text 
                :value="comp.style.lineHeight"
                :min="0" :max="10" type="float"
                @value-change="changeActiveCompLineHeight"
                >
              </ui-text>
            </div>
            <div class="suffix">倍</div>
          </div>
          <div class="form-group-item">
            <span class="title">旋转:</span>
            <slider class="flex-col-5" 
              :min="0" :max="360" :step="0" 
              :value="comp.style.transform"
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
      var config = $.extend(true, {}, this.comp, {
        text: value
      });
      this.changeActiveComp(config, flag);
    },
    changeActiveCompColor: function(color){
      var value = color.hex;
      var config = $.extend(true, {}, this.comp, {
        style: {
          color: value
        }
      });
      this.changeActiveComp(config, true);      
    },
    changeActiveCompFontSize: function(event){
      var value = event.target.value;
      var config = {
        style: {
          fontSize: value
        }
      };
      this.changeActiveComp(config, true);
    },
    changeActiveCompFontFamily: function(event){
      var value = event.target.value;
      var config = {
        style: {
          fontFamily: value
        }
      };
      this.changeActiveComp(config, true);
    },    
    toggleBold: function(){
      var value = this.isBold ? 'normal' : 'bold'
      var config = {
        style: {
          fontWeight: value
        }
      };
      this.changeActiveComp(config, true);      
    },
    toggleItalic: function(){
      var value = this.isItalic ? 'normal' : 'italic';
      var config = {
        style: {
          fontStyle: value
        }
      };
      this.changeActiveComp(config, true);      
    },
    toggleUnderline: function(){
      var value = this.isUnderline ? 'none' : 'underline';
      var config = {
        style: {
          textDecoration: value
        }
      };
      this.changeActiveComp(config, true);      
    },
    toggleTextAlign: function(type){
      var config = {
        style: {
          textAlign: type
        }
      };
      this.changeActiveComp(config, true);        
    },
    changeActiveCompLineHeight: function(value, flag){
      var config = {
        style: {
          lineHeight: value
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
    switchPanel: function(index){
      $('#textEditPanel').find('.nav-tabs li').removeClass('active');
      $('#textEditPanel').find('.nav-tabs li').eq(index).addClass('active');
      $('#textEditPanel .tab-pane').css('visibility', 'hidden');
      $('#textEditPanel .tab-pane').eq(index).css('visibility', 'visible')
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