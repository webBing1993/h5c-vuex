<template>
  <div class="f-ab edit-zone">
    <component
      :is="currentComp.type + '-edit'"
      >
    </component>
  </div>  
</template>
<script>
import * as actions from './vuex/actions'
import hyPageEdit from './component/hyPageEdit.vue'
import hyTextEdit from './component/hyTextEdit.vue'

export default {
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
  },
  components: {
    hyPageEdit, hyTextEdit
  }
}
</script>