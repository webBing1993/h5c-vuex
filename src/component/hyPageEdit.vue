<template>
<div class="f-ab">
  <div class="panel panel-default panel-zone">
    <div class="panel-body">
      <ul class="nav nav-tabs">
        <li class="active"><a href="javascript:;"  data-toggle="tab">样式</a></li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane active" id="tabPage">
          <div class="form-group-item">
            <div class="flex-col-2">
              <div class="title">页面标题:</div>            
            </div>
            <div class="flex-row flex-col-6">
              <input type="text" 
                :value="currentPage.title" 
                @input="updateActivePageTitle" 
                @blur="updateActivePageTitle($event, true)"
                placeholder="请输入页面标题">
            </div>
          </div>
          <div class="form-group-item">
            <div class="flex-col-2">
              <div class="title">背景颜色:</div>
            </div>
            <div class="flex-row flex-col-6 ">
              <color-pick class="color-picker"
                :color="currentPage.style.backgroundColor"
                @color-change="updateActivePageBackgroundColor">
              </color-pick>
            </div>
          </div>
          <div class="form-group-item">
          <div class="flex-col-2">
              <div class="title">背景图片:</div>
          </div>
          <div class="flex-col-6 ">
            <a class="changeIcon" href="javascript:;" @click="changePic">更换图片</a>
              <div class="img-wrap">
                <img v-if="currentPage.style.image" :src="currentPage.style.image | realImgSrc" alt="">
                <a v-if="currentPage.style.image" class="delete-pic" @click="delImg" href="javascript:;" >&times;</a>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>  
  </div>
  <!-- 图片选择弹窗  -->
  <picture-dialog 
    :show.sync="showPictureDialog"
    type="changePictrue"
    >
  </picture-dialog>  
</div>
</template>
<script>

import * as actions from '../vuex/actions'
import colorPick from '../plugin/colorPick.vue'
import pictureDialog from '../plugin/pictureDialog.vue'

export default {
  data: function(){
    return {
      showPictureDialog: false
    }
  },
  vuex: {
    getters: {
      slide: state => state.slide,
      activePageIndex: state => state.activePageIndex,
      currentComp: state => state.currentComp
    },
    actions: actions
  },
  computed:{
    currentPage: function(){
      return this.slide.pages[this.activePageIndex];
    }
  },
  methods: {
    changePic: function(){
      this.showPictureDialog = true;
    },
    delImg: function(){
      this.updateActivePageImage(null);
    }
  },
  events: {
    changePictrue: function (imgSrc) {
      this.updateActivePageImage(imgSrc);
    }
  },  
  components: {
    colorPick,
    pictureDialog
  }
}
</script>
<style scoped>
  .panel-body {
    padding: 0;
    height: 100%;
    border: 0;
  }
  input[type="text"]{
    text-align: left;
  }
  .color-picker{
    margin-left:0;
  }
  .changeIcon {
    display: block;
    text-decoration: underline;
    color:#5cb85c;
    line-height: 25px;
  } 
  .img-wrap{
    display:inline-block;
    position:relative;
  }
  .img-wrap img {
    width:100px;
  }
  .delete-pic {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: rgba(51, 122, 183, .7);
    color: #fff;
    line-height: 24px;
    text-align: center;
    border-top-left-radius: 100%;
  }
  .delete-pic:hover{
    background-color: rgba(183, 51, 51, 0.7);
  }    
</style>