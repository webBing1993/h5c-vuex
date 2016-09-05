<template>
  <div  class="dragableWrap" :class="{'dragable': editable }" @mousedown="dragstart" @mouseup="dragend">
    <slot></slot>
    <div class="drag">
      <div class="drag-circle drag-circle-s"></div>
      <div class="drag-circle drag-circle-nw"></div>
      <div class="drag-circle drag-circle-n"></div>
      <div class="drag-circle drag-circle-ne"></div>
      <div class="drag-circle drag-circle-sw"></div>
      <div class="drag-circle drag-circle-se"></div> 
      <div class="drag-circle drag-circle-w"></div> 
      <div class="drag-circle drag-circle-e" @mousedown.stop="resizeStart('e', $event)"></div>
    </div>     
  </div>
</template>
<style scoped>
  .dragableWrap {
    width:100%;
    height:100%;
  }
  .dragable .drag {
    left:0;
    right:0;
    top:0;
    bottom:0;
    position:absolute;
    width:100%;
    height:100%;
  }
  .dragable .drag:hover{
    cursor: move;
    border:1px dashed #999;
  }
  .active .dragable  .drag{
    border:1px dashed #333;
  }
  .active .dragable .drag-circle{
    width: 12px;
    height: 12px;
    border: 1px solid #000;
    border-radius: 50%;
    position: absolute;
    background-color: #fff;
  }
  .drag-circle-w{
    bottom: 50%;
    left: -6px;
    transform: translateY(6px);     
    cursor: w-resize; 
  }  
  .active .drag-circle-e{
    top: 50%;
    right: -6px;
    transform: translateY(-6px);
    cursor: e-resize;
  }
  .active .drag-circle-s{
    bottom: -6px;
    left: 50%;
    transform: translateX(-6px);
    cursor: s-resize; 
  }
  .drag-circle-n{
    top: -6px;
    left: 50%;
    transform: translateX(-6px);    
    cursor: n-resize; 
  }  
  .drag-circle-nw{
    top:-6px;
    left:-6px;  
    cursor: nw-resize; 
  }
  .drag-circle-ne{
    top: -6px;
    right: -6px;
    cursor: ne-resize; 
  }
  .drag-circle-sw{
    bottom: -6px;
    left: -6px;
    cursor: sw-resize; 
  }
  .drag-circle-se{
    bottom: -6px;
    right: -6px;
    cursor: se-resize; 
  }
</style>
<script>
module.exports = {
  props: {
    comp: {
      type: Object,
      required: true
    },
    parentWidth:{
      type: Number
    },
    parentHeight: {
      type: Number
    },
    editable: {
      type: Boolean,
      default:true
    }   
  },
  data: function(){
    return {
      top: null,
      left: null,
      width: null,
      height:null,
      lastX: null,
      lastY: null,      
      lastH:null,
      lastW:null,
      dragging: false,
      resizing:false,
      resizeType: null,
    }
  },
  ready: function(){
    var _this = this;
    document.addEventListener('mousemove', this.handleDrag, false); 
    document.addEventListener('mouseup', function(){
      _this.dragging = false;
      _this.resizing = false;
      document.removeEventListener('mousemove', this.handleDrag, false); 
    }, false);
    this.top = this.$el.style.top;
    this.left = this.$el.style.left;
    this.width = this.$el.getBoundingClientRect().width;
    this.height = this.$el.getBoundingClientRect().height;
  },
  methods:{
    dragstart: function(e){
      if(this.editable){
        this.lastX = e.clientX;
        this.lastY = e.clientY;
        this.dragging = true;         
      }
    },
    resizeStart:function(type, e){
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.lastW = this.width;
      this.lastH = this.height;
      this.resizing = true;
      this.resizeType = type;
    },
    handleDrag: function(e){
      if (e.stopPropagation) e.stopPropagation();

      var deltax = e.clientX - this.lastX;
      var deltay = e.clientY - this.lastY; 

      if( this.dragging ){
        var top =  parseFloat(this.comp.style.top)  + deltay;
        var left = parseFloat(this.comp.style.left) + deltax;
        if( this.parentHeight && this.parentWidth){
          if( top <= 0 ){
            top = 0;
          }
          else if( top >= (this.parentHeight - this.height )){
            top = this.parentHeight - this.height;
          }
          if( left <= 0 ){
            left = 0;
          }
          else if( left >= (this.parentWidth - this.width )){
            left = (this.parentWidth - this.width );
          }          
        }
        this.comp.style.top = top;
        this.comp.style.left = left;
        this.lastX = e.clientX;
        this.lastY = e.clientY;        
      }
      if ( this.resizing && this.resizeType == 'e') {
        this.width = this.lastW + deltax;
        this.comp.style.width = this.width;
      }    
    },
    dragend: function(){
      this.dragging = false;
      this.resizing = false;
    }
  }
}
</script>