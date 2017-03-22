<template>
<div class="f-ab canvas-zone">
  <div class="edit-area-wrap">
    <div class="edit-area">
      <div class="f-ab page-container">
        <hy-music v-show="slide.music && slide.music.id" :music="slide.music"></hy-music>
        
        <div class="f-ab page" :style="currentPage.style">
          
          <img style="width:100%;height:100%;" 
            :src="currentPage.style.image | realImgSrc"> 
          
          <div class="debug" style="display:none;">
           <h3>currentPage</h3>
           <pre>{{currentPage | json}}</pre> 
          </div>
          
          <component  
            class="hy-comp"
            v-for="(index, comp) in currentPage.comps"
            :is="comp.type"
            :comp="comp"
            @click.stop="activeComp(comp, index)"
            @mousedown.stop="activeComp(comp, index)"
            >
          </component >             
        </div>            
      </div>
      </div>
      <div class="edit-area-tool">
        <div class="tool-wrap clearfix">
          <a href="javascript:;" class="btn btn-default btn-sm" title="预览" @click="preview">
            <i class="icon-play"></i>
          </a>
          <a href="javascript:;" class="btn btn-default btn-sm" title="撤销" @click="undo">
            <i class="icon-undo"></i>
          </a>
          <a href="javascript:;" class="btn btn-default btn-sm" title="重做" @click="redo">
            <i class="icon-repeat"></i>
          </a>
        </div>
      </div>  
    </div>
    <tool-zone></tool-zone>
  </div>  
</template>
<script>
import * as actions from './vuex/actions'

import toolZone from './toolZone.vue'

import hyText   from './component/hyText.vue'
import hyImage  from './component/hyImage.vue'
import hyMusic  from './component/hyMusic.vue'
import hyForm   from './component/hyForm.vue'
import hyButton from './component/hyButton.vue'

export default {
  vuex: {
    getters: {
      slide: state => state.slide,
      activePageIndex: state => state.activePageIndex
    },
    actions: actions
  },
  computed:{
    currentPage: function(){
      return this.slide.pages[this.activePageIndex];
    }
  },
  methods: {
    preview: function(){
      console.log('preview');
    },
    undo: function(){
      if (H.slideIndex > 0) {
        H.slideIndex -= 1;
        H.hook.$emit('vuex:replace', H.slideIndex);
      }
    },
    redo: function(){
      if (H.slideIndex < H.slideHistory.length - 1) {
        H.slideIndex += 1;
        H.hook.$emit('vuex:replace', H.slideIndex);
      }
    }
  },
  components: {
    toolZone, hyText, hyImage, hyMusic, hyForm, hyButton
  }
}
</script>
<style>
  .debug{
    position: absolute;
    top: 0;
    left: -240px;
    overflow: auto;  
    height: 600px;
  }
  .edit-area-wrap{
    position: relative;
    box-sizing: content-box;
    box-shadow: 0px 2px 30px 5px rgba(0, 0, 0, .3);
    width: 400px;
    height: 630px;
    margin-top: 80px;
    border: 2px solid #333;
    margin-right: auto;
    margin-left: auto;
  }
  .edit-area {
    position: relative;
    width:100%;
    height:100%;
  }
  .edit-area-tool {
    position: absolute;
    right: -32px;
    bottom: 37px;
    z-index: 50;
  }
  .tool-wrap {
    width: 30px;
  }
  .tool-wrap .btn{
    margin-bottom: 5px;
    float: left;
  }  
</style>