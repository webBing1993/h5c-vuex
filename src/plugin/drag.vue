<template>
  <div class="drag-container" 
    :class="{'drag-active': active, 'drag-enable': enable}"
    :style="style"
    >
    <slot></slot> 
    <!-- <div class="overlay"></div> -->
  </div>
</template>
<script>
module.exports = {
  props: {
    enable: {
      type: Boolean,
      default:true
    },    
    active: {
      type: Boolean,
      default:false
    },
    handles:{
      type: String,
      default: "n, e, s, w, ne, se, sw, nw"
    },
    top: {
      type: Number
    },
    left: {
      type: Number
    },
    width: {
      type: [String, Number]
    },
    height: {
      type: [String, Number]
    },
    transform: {
      type: Number
    }       
  },
  computed: {
    style: function(){
      return {
        top: this.top + 'px',
        left: this.left + 'px',
        width: this.width + 'px',
        height: this.height + 'px',
        transform: 'rotate(' + this.transform + 'deg)',
      }
    }
  },
  ready: function(){
    var _this = this;
    if( this.enable ){
      $( this.$el ).resizable({
        handles: _this.handles,
        stop: function(evt, ui){
          _this.width = ui.size.width;
          _this.height = ui.size.height;
          _this.$dispatch('postion-change', {
            width: _this.width,
            height: _this.height,
            top: _this.top,
            left: _this.left,
            transform: _this.transform
          }, true);        
        },        
        resize: function(evt, ui){
          _this.width = ui.size.width;
          _this.height = ui.size.height;
          _this.$dispatch('postion-change', {
            width: _this.width,
            height: _this.height,
            top: _this.top,
            left: _this.left,
            transform: _this.transform
          });        
        }
      }).draggable({
        stop: function(evt, ui){
          _this.top = Number(ui.position.top.toFixed(2));
          _this.left = Number(ui.position.left.toFixed(2));
          _this.$dispatch('postion-change', {
            width: _this.width,
            height: _this.height,
            top: _this.top,
            left: _this.left,
            transform: _this.transform
          }, true);          
        },        
        drag: function(evt, ui){
          _this.top = Number(ui.position.top.toFixed(2));
          _this.left = Number(ui.position.left.toFixed(2));
          _this.$dispatch('postion-change', {
            width: _this.width,
            height: _this.height,
            top: _this.top,
            left: _this.left,
            transform: _this.transform
          });          
        }
      });
    }
  }
}
</script>
<style>
  .overlay{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
  .drag-container{
    position: absolute;
    border:1px dashed rgba(0, 0, 0, 0);
  }
  .drag-container.drag-enable.drag-active{
    border:1px dashed #333;
  }  
  .drag-container.drag-enable:hover{
    cursor: move;
    border:1px dashed #999;
  }
  .drag-enable.ui-draggable-handle {
    /*cursor: move;*/
  }
  .drag-enable.drag-active .ui-resizable-handle{
    width: 12px;
    height: 12px;
    border: 1px solid #000;
    border-radius: 50%;
    background-color: #fff;
  }
  .ui-resizable-handle{
    position: absolute;
  }
  .ui-resizable-w,
  .ui-resizable-e,
  .ui-resizable-s,
  .ui-resizable-n{
    width: 10px;
    height: 10px;    
    border-radius:0;
  }
  .ui-resizable-w{
    top: 50%;
    left: -6px;
    transform: translateY(-5px);     
    cursor: w-resize; 
  }  
  .ui-resizable-e{
    top: 50%;
    right: -6px;
    transform: translateY(-4px);    
    cursor: e-resize; 
  }
  .ui-resizable-s{
    bottom: -6px;
    left: 50%;
    transform: translateX(-4px);
    cursor: s-resize; 
  }
  .ui-resizable-n{
    top: -6px;
    left: 50%;
    transform: translateX(-5px);    
    cursor: n-resize; 
  }  
  .ui-resizable-nw{
    top:-5px;
    left:-5px;  
    cursor: nw-resize; 
  }
  .ui-resizable-ne{
    top: -5px;
    right: -5px;
    cursor: ne-resize; 
  }
  .ui-resizable-sw{
    bottom: -5px;
    left: -5px;
    cursor: sw-resize; 
  }
  .ui-resizable-se{
    bottom: -5px;
    right: -5px;
    cursor: se-resize; 
  }
</style>