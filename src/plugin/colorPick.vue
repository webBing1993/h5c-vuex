<template>
  <div class="colorpicker">
    <span class="color" :style="{backgroundColor: color}"></span>
    <div class="pop-container">
      <div class="arrow">
      </div>
      <colorpicker
        :width="200"
        :outer-hex.sync="color"
        @child-color-change="handleColorChange"
        >
      </colorpicker>
    </div>
  </div>
</template>
<style>
  .colorpicker{
    position: relative;
    display: inline-block;
  }
  .colorpicker .color{
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #333;    
    cursor: pointer;
  }
  .colorpicker:hover .pop-container{
    display: block;
  }  
  .pop-container{
    display: none;
    position: absolute;
    top: 100%;
    left: 2px;
    z-index: 9999;
  }
  .pop-container::before{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top:-5px;
    left:0;
    border-color: transparent;
    border-style: solid;
    border-width: 0 5px 5px;
    border-bottom-color: #ccc;    
  }
  .pop-container::after{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top:-4px;
    left:0;    
    border-color: transparent;
    border-style: solid;
    border-width: 0 5px 5px;
    border-bottom-color: #fff;    
  }     
</style>
<script>
  module.exports = {
    props: {
      color: {
        type: String,
        required: true,
        default: '#000000'
      }
    },
    methods:{
      handleColorChange: function(color){
        this.$dispatch('color-change', color)
      }
    }, 
    components: {
      colorpicker: require('./Colorpicker.vue')
    }    
  }
</script>