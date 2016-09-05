<template>
<div class="f-ab" style="overflow:hidden;">
  <div class="f-ab g-header">
    <button><i class="icon-save"></i>保存</button>
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
import editZone from './editZone.vue'
import canvasZone from './canvasZone.vue'

export default {
  vuex: {
  },
  components: {
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
