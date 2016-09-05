<template>
<div class="modal fade in" :class="{'show': show}">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" @click="closeModel">
          <span>&times;</span>
        </button>
        <h4 class="modal-title"></h4>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
</template>
<style>
  
</style>
<script>
  module.exports = {
    props: {
      show: {
        require: true,
        type: Boolean,
        twoWay: true
      }       
    },
    methods:{
      closeModel: function(){
        this.show = false;
      }
    }
  }
</script>