<template>
  <div class="tab-pane active" v-show="show">
     <slot></slot>
  </div>
</template>
<style>
  
</style>
<script>
module.exports = {
  props: {
    header: {
      type: String,
      require: true
    }
  },
  data: function(){
    return {
      show: false
    }
  } 
}
</script>