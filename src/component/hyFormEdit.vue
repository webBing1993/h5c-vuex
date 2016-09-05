<template>
  <div id="formEditPanel" class="panel panel-default panel-zone">
    <div class="panel-body">
      <ul class="nav nav-tabs">
        <li @click="switchPanel(0)" class="active"><a href="javascript:;">属性</a></li>
        <li @click="switchPanel(1)"><a href="javascript:;">样式</a></li>
        <li @click="switchPanel(2)"><a href="javascript:;">动画</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane active" id="formEdit">
          <div class="wrap">
            <div class="sortable">
              <template v-for="(index, item) in comp.list" track-by="$index">
                <div class="form-ele-wrap" :index="index">
                  <component :is="item.type + 'Edit'" :item.sync="item" :comp.sync="comp">
                  </component>
                  <a @click="delItem(item)" class="btn-del-item" href="javascript:;">
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
                <input type="text" v-model="comp.btn.text">
              </div>            
            </div>

            <div class="form-ele-wrap no-border">
              <div class="form-item">
                提交后提示语
              </div>
              <div class="form-item">
                <input type="text" v-model="comp.feedback.text">
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
            <div class="flex-col-6">
              <color-pick class="flex-col-7 color-picker" :color.sync="comp.style.backgroundColor"></color-pick>
            </div>
          </div>
          <div class="form-group-item">
            <span class="title">边框色:</span>
            <div class="flex-col-6">
              <color-pick class="flex-col-7 color-picker" :color.sync="comp.style.borderColor"></color-pick>
            </div>
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
          <animate v-if="comp.animate" :animate.sync="comp.animate" :animate-show.sync="comp.isShowAnimate">
          </animate>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
module.exports = {
  props: {
    comp: {
      type: Object,
      required: true
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
  ready: function(){
    // var _this = this;
    // $( ".sortable" ).sortable({
    //   stop: function(event, ui){
    //     var $item = $(ui.item);
    //     var index = $item.attr('index');
    //     var currentIndex = $('.sortable .form-ele-wrap').index($item);
    //     var currentData = _this.comp.list[index];
        
    //     if(index < currentIndex){
    //       _this.comp.list.splice(currentIndex + 1,0, currentData);
    //       _this.comp.list.splice(index,1);
    //     }
    //     else if(index > currentIndex){
    //       _this.comp.list.splice(index,1);
    //       _this.comp.list.splice(currentIndex ,0, currentData);
    //     }
    //     _this.comp.list = _this.comp.list.slice(0);
    //     console.log(index,currentIndex);
    //   }
    // });
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
            items: ["选项一", "选项二"]
          };         
        break;
        case 3:
          list = {
            type:'xCheckbox',
            name:'请输入问题',
            items: ["选项一", "选项二"]
          };         
        break;
        default:
          throw new Errow('错误, 未知表单模版类型');
      }      
      this.comp.list.push(list);
      this.activeScroll();
    },
    delItem: function(item){
      this.comp.list.$remove(item);
      this.activeScroll();
    },
    toggleActive: function(event){
      $(event.currentTarget).toggleClass('active');
    }    
  },
  components: {
    animate: require('../plugin/animate.vue'),
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