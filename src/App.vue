<template>
<div class="f-ab" style="overflow:hidden;">
  <div class="f-ab g-header">
    <header-zone class="f-ab g-header">
      <div slot="btn-right">
        <button class="btn btn-info btn-sm" @click="set">
          设置
        </button>      
        <button class="btn btn-success btn-sm" @click="preview">
          <i class="icon-save"></i> 预览
        </button>
        <button class="btn btn-primary btn-sm" @click="save">
          <i class="icon-camera-retro"></i> 发布
        </button>   
      </div>
    </header-zone>
  </div>
  <div class="f-ab g-content">
    <layer-zone>
    </layer-zone>
    <canvas-zone>
    </canvas-zone> 
    <edit-zone>
    </edit-zone>
  </div>
</div>
</template>

<script>
import './assets/css/base.css'

import layerZone from './layerZone.vue'
import headerZone from './headerZone.vue'
import editZone from './editZone.vue'
import canvasZone from './canvasZone.vue'

export default {
  vuex: {
  },
  methods:{
    set: function(){
      console.log('设置');
    },
    preview: function(){
      console.log('预览');
    },
    save: function(){
      console.log('保存')
    }
  },
  components: {
    headerZone,
    layerZone,
    canvasZone,
    editZone
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
