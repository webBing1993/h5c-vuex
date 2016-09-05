<template>
  <div class="dialog-mask" v-show="show" @click.stop="close">
    <a href="javascript:;" class="btn-close" @click="close">&times;</a>
    <div class="dialog-wrap">
      <div class="dialog-container" :style="{width: width + 'px'}" @click.stop="" >
        <iframe src="" frameborder="0"></iframe>     
      </div>
    </div>
  </div>
</template>
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
  .btn-close,
  .btn-close:hover {
    position: absolute;
    display: block;
    right: 20px;
    top: 20px;
    width:40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 40px;
  }
  .dialog-wrap {
    display: table-cell;
    vertical-align: middle;
  }
  .dialog-container {
    border: 1px solid #ccc;
    background-color: #fff;
    margin: 0px auto;
    border-radius: 5px;    
  }
</style>
<script>
  module.exports = {
    props: {
      show : {
        type: Boolean,
        require: true,
        twoway: true
      },
      width: {
        type: Number,
        default: 300
      }
    },
    methods: {
      close: function(){
        this.show = false;
      }
    }
  }
</script>