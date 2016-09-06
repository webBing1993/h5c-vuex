<template>
  <div class="tool-zone">
    <ul>
      <div class="draggable">
        ......
      </div>
      <li><button class="btn btn-default btn-sm" @click="editPage">背景</button></li>
      <li><button class="btn btn-default btn-sm" @click="addText" >文字</button></li>     
      <li><button class="btn btn-default btn-sm" @click="addImage">图片</button></li>
      <li><button class="btn btn-default btn-sm" @click="editMusic">音乐</button></li>
      <li><button class="btn btn-default btn-sm" @click="addForm">表单</button></li>    
      <li><button class="btn btn-default btn-sm" @click="addButton">按钮</button></li>
    </ul>
  <!-- 图片选择弹窗  -->
  <picture-dialog 
    :show.sync="showPictureDialog"
    type="changePictrue"
    >
  </picture-dialog>
  <!-- 表单选择弹窗 -->
  <form-dialog 
    :show.sync="showFormDialog"
    >
  </form-dialog>

  </div>  
</template>
<script>

import * as actions from './vuex/actions'

import pictureDialog from './plugin/pictureDialog.vue'
import formDialog from './plugin/formDialog.vue'

export default {
  data: function(){
    return {
      showPictureDialog: false,
      showFormDialog: false
    }
  },  
  vuex: {
    getters: {
    },
    actions: actions
  },  
  attached: function(){
    $('.tool-zone').draggable({ handle: ".draggable" });
  },
  methods: {
    editPage: function(){
      this.updateActiveComp('page');
    },
    editMusic: function(){
      this.updateActiveComp('music');
    },
    addForm: function(){
      // this.$dispatch("showFormZone");
      this.showFormDialog = true;
    },    
    addText: function(){
      this.updateActiveComp('text');
    },
    addImage: function(){
      this.showPictureDialog = true;
    },
    addButton: function(){
      if( this.currentPage ) {
        this.currentPage.comps.push({
          type: 'hy-button',
          text: '按钮',
          link: null,
          active: false,
          isShowView: true,
          isShowEdit: true,
          isShowAnimate: false,
          animate:{
            name: "none",
            duration: 1,
            delay: 0
          },
          position:{
            left: 60,
            top: 200,
            width: 197,
            height: 50,
            transform: 0
          },      
          style:{
            fontFamily: 'Microsoft Yahei',
            fontSize: 24,
            color: '#835353',
            backgroundColor: '#F8E71C',
            borderWidth: 1,
            borderColor: '#ccccc',
            borderStyle: 'solid',
            borderRadius: 2,
            opacity: 1,
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'normal',
            textAlign: 'center'
          }
        });
        var len = this.currentPage.comps.length;
        this.currentComp = this.currentPage.comps[len -1 ];        
      }     
    }
  },
  events: {
    changePictrue: function (imgSrc) {
      this.updateActiveComp('image', imgSrc);
    },
    addformComp: function(type){
      var list = null;
      switch(type){
        case 0:
          list = [{
            type:'xText',
            name:'姓名',
            required: true
          },{
            type:'xText',
            name:'手机',
            required: true
          },{
            type:'xText',
            name:'邮箱',
            required: false
          }];        
        break;        
        case 1:
          list = [{
            type:'xStar',
            name:'五星评价',
            defualt: 0
          }];         
        break;
        case 2:
          list = [{
            type:'xRadio',
            name:'请输入问题',
            items: ["选项一", "选项二","选项三"]
          }];         
        break;
        case 3:
          list = [{
            type:'xCheckbox',
            name:'请输入问题',
            items: ["选项一", "选项二","选项三"]
          }];         
        break;
        default:
          throw new Errow('错误, 未知表单模版类型');
      }
      this.updateActiveComp('form', list);
    }     
  },    
  components: {
    pictureDialog, formDialog
  }
}
</script>
<style>
  .tool-zone{
    position: absolute;
    left: 770px;
    top: 115px;
    z-index: 90;
  }
  .tool-zone ul{
    padding: 5px;
    border:1px solid #ccc;
    border-radius: 5px;
    background-color: #e8e8e8;
  }
  .tool-zone li{
    margin-bottom: 5px;
  }
  .draggable {
    text-align: center;
    height: 10px;
    line-height: 10px;
    color: #666;
    padding-bottom: 18px;
    cursor: move;
    font-size: 19px;
    margin-top: -5px;
  } 
</style>