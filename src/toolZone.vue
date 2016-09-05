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
  </div>  
</template>
<script>

import * as actions from './vuex/actions'

export default {
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
      this.currentComp = {
        type: 'hy-music'
      }
    },
    addForm: function(){
      this.$dispatch("showFormZone");
    },    
    addText: function(){
      this.updateActiveComp('text');
    },
    addImage: function(){
      this.$dispatch("showPictureDialog", "addImageComp");
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
  }
}
</script>
<style>
  .tool-zone{
    position: absolute;
    left: 26px;
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