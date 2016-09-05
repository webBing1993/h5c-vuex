<template>
  <div class="dialog-mask" v-show="show" @click.stop="close">
    <div class="dialog-wrap">
      <div class="dialog-container" :style="{width: width + 'px'}" @click.stop="" >
        <div class="dialog-header">
          <h2>{{title}}</h2>
          <a v-show="showClose" href="javascript:;" class="btn-close" @click="close">&times;</a>
        </div>
        <slot name="content" class="dialog-body"></slot>        
      </div>
    </div>
  </div>
</template>
<script>
  module.exports = {
    name: "dialog",
    props: {
      show : {
        type: Boolean,
        require: true,
        twoway: true
      },
      width: {
        type: Number,
        default: 300
      },
      title: {
        type: String,
        default:" "
      },
      showClose:{
        type: Boolean,
        default: true
      }
    },
    methods: {
      close: function(){
        this.show = false;
      }
    }
  }
</script>
<style>
  .dialog-mask {
    position: fixed;
    display: table;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;    
    z-index: 9999;
    transition: opacity .3s ease;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .dialog-wrap {
    display: table-cell;
    vertical-align: middle;
  }
  .dialog-container {
    position:relative;
    border: 1px solid #ccc;
    background-color: #fff;
    margin: 0px auto;
    border-radius: 5px;    
  }
  .dialog-header{
    min-height: 16.43px;
    padding: 15px;
    background: #f7f7f7;
    border-bottom: 1px solid #f5f5f5;      
  } 
  .dialog-header h2{
    display:inline-block;
    font-size: 18px;
  }
  .btn-close,
  .btn-close:hover {
    float: right;
    margin-top: -4px;
    color: #666;
    font-size: 24px;
  }
  .btn-close:hover{
    color: #333;
  }  
</style>
