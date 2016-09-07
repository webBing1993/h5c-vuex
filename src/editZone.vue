<template>
  <div class="f-ab edit-zone">
    <component :is="currentComp.type + '-edit'">
    </component>
  </div>  
</template>

<script>
import * as actions from './vuex/actions'

import hyPageEdit from './component/hyPageEdit.vue'
import hyTextEdit from './component/hyTextEdit.vue'
import hyImageEdit from './component/hyImageEdit.vue'
import hyMusicEdit from './component/hyMusicEdit.vue'
import hyFormEdit from './component/hyFormEdit.vue'
import hyButtonEdit from './component/hyButtonEdit.vue'

export default {
  vuex: {
    getters: {
      currentComp: state => state.currentComp
    }
  },
  components: {
    hyPageEdit, hyTextEdit, hyImageEdit, hyMusicEdit, hyFormEdit, hyButtonEdit
  }
}
</script>