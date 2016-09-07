<template>
  <div id="formEditPanel" class="panel panel-default panel-zone">
    <div class="panel-body">
      <ul class="nav nav-tabs">
        <li @click="switchPanel(0)" class="active"><a href="javascript:;">属性</a></li>
        <li @click="switchPanel(1)" ><a href="javascript:;">样式</a></li>
        <li @click="switchPanel(2)"><a href="javascript:;">动画</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane active" id="formEdit">
          <div class="wrap">
            <!-- <pre style="height: 300px; overflow:auto;">{{comp|json}}</pre> -->
            <div class="sortable">
              <template v-for="(index, item) in comp.list" track-by="$index">
                <div class="form-ele-wrap" :index="index">
                  <component 
                    :is="item.type + '-edit'"
                    :item="item" 
                    :index="index"
                    @value-change="valueChange"
                    >
                  </component>
                  <a @click="delFormItem(index)" class="btn-del-item" href="javascript:;">
                    <span class="icon-remove"></span>
                  </a>
                </div>
              </template>              
            </div>
            <div class="form-ele-wrap no-border">
              <div class="form-item">
                按钮文字
              </div>
              <div class="form-item">
                <ui-text 
                  :value="comp.btn.text"
                  @value-change="changeBtnTextValue"
                  >
                </ui-text>              
              </div>            
            </div>

            <div class="form-ele-wrap no-border">
              <div class="form-item">
                提交后提示语
              </div>
              <div class="form-item">
                <ui-text 
                  :value="comp.feedback.text"
                  @value-change="changeFeedbackValue"
                  >
                </ui-text>                  
              </div>
            </div>

            <div class="add-form-item" @click.stop="toggleActive($event)">
              <h3>添加表单元素 <span class="icon-caret-up"></span></h3>
              <ul>
                <li @click="addFormItem(0)">输入框</li>
                <li @click="addFormItem(1)">五星评分</li>
                <li @click="addFormItem(2)">单选</li>
                <li @click="addFormItem(3)">多选</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="tab-pane">
          <div class="form-group-item">
            <span class="title">填充色:</span>
            <div class="flex-col-5">
              <color-pick class="flex-col-7 color-picker" 
                :color="comp.style.backgroundColor"
                @color-change="changeActiveCompBackgroundColor">
              </color-pick>
            </div>
          </div>
          <div class="form-group-item">
            <span class="title">边框色:</span>
            <div class="flex-col-5">
              <color-pick class="flex-col-7 color-picker" 
                :color="comp.style.borderColor"
                @color-change="changeActiveCompBorderColor">
              </color-pick>
            </div>
          </div>
          <div class="form-group-item">
            <span class="title">边框:</span>
            <slider class="flex-col-5" 
              :min="0" :max="10" :step="1" 
              :value="comp.style.borderWidth"
              @value-change="changeActiveCompBorderWidth">
            </slider>
            <div class="flex-col-1">
              <ui-text 
              :value="comp.style.borderWidth"
              :min="0" :max="10" type="float"
              @value-change="changeActiveCompBorderWidth"
              >
              </ui-text>
            </div>
            <div class="suffix">px</div>
          </div>
          <div class="form-group-item">
            <div class="title">圆角:</div>
            <slider class="flex-col-5" 
              :min="0" :max="50" :step="0" 
              :value="comp.style.borderRadius"
              @value-change="changeActiveCompBorderRadius"
              >
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
            <div class="title">透明:</div>
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
          <animate v-if="comp.animate" :animate.sync="comp.animate" :animate-show.sync="comp.isShowAnimate">
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

module.exports = {
  vuex: {
    getters: {
      slide: state => state.slide,
      activePageIndex: state => state.activePageIndex,
      comp: state => state.currentComp
    },
    actions: actions
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
  ready: function(){
    var _this = this;
    $( ".sortable" ).sortable({
      stop: function(event, ui){
        var $item = $(ui.item);
        var index = $item.attr('index');
        var currentIndex = $('.sortable .form-ele-wrap').index($item);
        var currentData = _this.comp.list[index];
        
        var list = _.cloneDeep(_this.comp.list);

        if(index < currentIndex){
         list.splice(currentIndex + 1,0, currentData);
         list.splice(index,1);
        }
        else if(index > currentIndex){
         list.splice(index,1);
         list.splice(currentIndex ,0, currentData);
        }
        var config = {
          list: list
        };
        _this.changeActiveCompFix(config, true); 
      }
    });
  },
  methods: {
    switchPanel: function(index){
      $('#formEditPanel').find('.nav-tabs li').removeClass('active');
      $('#formEditPanel').find('.nav-tabs li').eq(index).addClass('active');
      $('#formEditPanel .tab-pane').css('visibility', 'hidden');
      $('#formEditPanel .tab-pane').eq(index).css('visibility', 'visible')
      this.activeScroll();
    },
    activeScroll: function(){
      this.$nextTick(function () {
         new IScroll("#formEdit", { 
          mouseWheel: true,
          disableTouch: true,
          scrollbars: false
        }); 
      });
    },
    toggleActive: function(event){
      $(event.currentTarget).toggleClass('active');
    },
    changeActiveCompBackgroundColor: function(color){
      var value = color.hex;
      var config = {
        style: {
          backgroundColor: value
        }
      };
      this.changeActiveComp(config, true);  
    },
    changeActiveCompBorderColor: function(color){
      var value = color.hex;
      var config = {
        style: {
          borderColor: value
        }
      };
      this.changeActiveComp(config, true); 
    },
    changeActiveCompBorderWidth: function(value, flag){
      var config = {
        style: {
          borderWidth: value
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
    changeActiveCompOpacity: function(value, flag){
      var config = {
        style: {
          opacity: value
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
    changeBtnTextValue: function(value ,flag){
      var config = {
        btn: {
          text: value
        }
      };
      this.changeActiveComp(config, flag); 
    },
    changeFeedbackValue: function(value ,flag){
      var config = {
        feedback: {
          text: value
        }
      };
      this.changeActiveComp(config, flag); 
    },
    addFormItem: function(type){
      var list = null;
      switch(type){
        case 0:
          list = {
            type:'xText',
            name:'请输入字段名',
            required: true
          };        
        break;        
        case 1:
          list = {
            type:'xStar',
            name:'请输入评分项',
            defualt: 0
          };         
        break;
        case 2:
          list = {
            type:'xRadio',
            name:'请输入问题',
            items: [{name: "选项一"}, {name:"选项二"}]
          };         
        break;
        case 3:
          list = {
            type:'xCheckbox',
            name:'请输入问题',
            items: [{name: "选项一"}, {name:"选项二"}]
          };         
        break;
        default:
          throw new Errow('错误, 未知表单模版类型');
      } 
      var tmplist = _.cloneDeep(this.comp.list);   
      tmplist.push(list);
      var config = {
        list: tmplist
      };
      this.changeActiveCompFix(config, true); 
      this.activeScroll();
    },
    delFormItem: function(index){
      var list = _.cloneDeep(this.comp.list);
      list.splice(index, 1);
      var config = {
        list: list
      };
      this.changeActiveCompFix(config, true);      
      this.activeScroll();
    },
    valueChange: function( index, value, flag ){
      var list = _.cloneDeep(this.comp.list);
      list[index] = value;
      var config = {
        list: list
      };
      this.changeActiveCompFix(config, flag); 
    } 
  },
  components: {
    animate: require('../plugin/animate.vue'),
    uiText: require('../plugin/uiText.vue'),
    xTextEdit: require('../form/xTextEdit.vue'),
    xStarEdit: require('../form/xStarEdit.vue'),
    xRadioEdit: require('../form/xRadioEdit.vue'),
    xCheckboxEdit: require('../form/xCheckboxEdit.vue'),
    colorPick: require('../plugin/colorPick.vue'),
    slider: require('../plugin/slider.vue')           
  }
}
</script>
<style>
  .tab-content > .tab-pane {
    display: block;
    visibility: hidden;
  }
  .tab-content > .tab-pane.active {
    visibility: visible;
  }
  .form-ele-wrap {
    position: relative;
    border: 1px dashed #333;
    margin: 5px;
    margin-right: 10px;
    padding: 5px;
  }
/*  .form-ele-wrap:hover{
    border: 1px dashed #f90;
    cursor: move;
  }*/
  .form-ele-wrap.no-border {
    border-color: transparent;
    margin-top: 0;
    margin-bottom: 0;
  }
  .form-ele-wrap .form-item {
    margin-bottom: 5px;
  }
  .form-ele-wrap input[type="text"] {
    width: 80%;
    height: 30px;
    padding: 2px 4px;
    padding-left: 10px;
    border: 1px solid #ccc;
  }
  .btn-del-item {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    right: -10px;
    margin-top: -10px;
    text-align: center;
    line-height: 16px;
    background: #f90;
    border: 1px solid #333;
    color: #fff;
    border-radius: 50%;
  }
  .add-form-item {
    position: relative;
    width: 73%;
    margin: 10px;
  }
  .add-form-item h3{
    display: block;
    width: 100%;
    line-height: 30px;
    text-align: center;
    background: #fff;
    cursor: pointer;
    border: 1px solid #e8e8e8;
    font-weight: normal;
  }
  .add-form-item ul {
    display:none;
  }
  .add-form-item.active ul {
    display: block;
    position: absolute;
    width: 100%;
    top: -124px;
    left: 0;
    min-width: 160px;
    padding: 2px 0;
    margin: 2px 0 0;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .add-form-item li {
    border-bottom: 1px solid #e8e8e8;
    background: #fff;
    line-height: 28px;
    text-align: center;
    font-weight: normal;
    cursor: pointer;
  }
  .add-form-item li:last-child{
    border:none;
  }
  .add-form-item li:hover{
    background:#ffeed5;
  }
</style>