<template>
<div class="f-ab layer-zone">

  <div id="layerPanel" class="f-ab layer-zone">
    <div class="panel panel-default panel-zone">
      <div class="panel-body">
        <ul class="nav nav-tabs">
          <li class="active" @click.stop="switchPanel(0)">
            <a href="javascript:;">页面</a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="tabPages" v-el:tab-pane>
            <ul class="page-nav">
              <li v-for="(index, page) in slide.pages" track-by="$index"
                  @click.stop="activeSlidePageIndex(index)"
                  :class="{active: index == activePageIndex}">
                <div class="page-wrap">
                  <div class="page-thumb">
                    <div class="f-ab page" 
                         :style="page.style">
                        <img  v-if="page.style.image" style="width:100%;height:100%;" :src="page.style.image | realImgSrc">
                        <component class="hy-comp"
                          v-for="comp in page.comps" track-by="$index"
                          :is="comp.type" 
                          :comp="comp"
                          :drag-enable="false"
                          :animatable="false"
                          >
                        </component>
                    </div>                  
                  </div>
                  <div class="page-info">
                   <div class="pull-right">                  
                     <button class="btn btn-default btn-xs" @click.stop="copySlidePage(index)">
                      <i class="icon-copy"></i>
                     </button>
                     <button class="btn btn-default btn-xs" @click.stop="delSlidePage(index)">
                      <i class="icon-trash"></i>
                     </button>
                   </div>
                  </div>                 
                </div>
                <div class="page-index">{{index + 1}}</div>
              </li>
            </ul>
            <div class="btn-addpage" @click="addSlidePage">
              <i class="icon-plus"></i> 增加页面
            </div>         
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import * as actions from './vuex/actions'

export default {
  vuex: {
    getters: {
      slide: state => state.slide,
      activePageIndex: state => state.activePageIndex
    },
    actions: actions
  },
  components: {
    tabs : require('./plugin/tabs.vue'),
    tab : require('./plugin/tab.vue'),      
    hyText :  require('./component/hyText.vue'),
    hyButton : require('./component/hyButton.vue'),
    hyImage : require('./component/hyImage.vue'),
    hyMusic : require('./component/hyMusic.vue'),
    hyForm :  require('./component/hyForm.vue')
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
  .page-nav{
    margin: 3px;    
  }
  .page-nav li{
    border: 4px solid #ddd;
    margin: 5px 0;
    position: relative;
    cursor: pointer;
  }
  .page-nav li:hover{
    border: 4px solid #aaa;
  }
  .page-nav li.active{
    border: 4px solid #18ccc0;
  }
  .page-index{
    position: absolute;
    left: 0;
    bottom: 0px;
    width: 0px;
    height: 0px;
    border-width: 0px 33px 27px 0px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0);
    border-bottom-color: #ddd;
    background-color: rgba(0, 0, 0, 0);
    line-height: 35px;
    font-size: 16px;
    color: #fff;
    text-indent: 2px;
    font-weight: bold;
  } 
  .page-nav li:hover .page-index{
    border-bottom-color: #aaa;
  }
  .page-nav li.active .page-index{
    border-bottom-color: #18ccc0;
  }  
  .page-wrap{
    width: 116px;
    margin: 5px auto;
  }
  .page-nav .page-thumb{
    position: relative;
    transform-origin: top left;
    transform: scale(0.36);
    width: 320px;
    height: 488px;
    margin-bottom: -312px;
  }
  .page{
    border: 1px solid #000; 
  }
  .page-info{
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    margin-bottom: -5px;
  }
  .btn-addpage {
    position: absolute;
    bottom: -45px;
    background: #373F42;
    left: 0;
    right: 0;
    height: 35px;
    color: #fff;
    text-align: center;
    line-height: 35px;  
    cursor: pointer;
  }
  .blank-page {
    width: 134px;
    height: 80px;
    line-height: 72px;
    text-align: center;
    margin: 5px auto;    
  }
</style>