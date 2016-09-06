<template>
<div class="ant-slider">
  <div v-el:handle class="ant-slider-handle"></div>
  <div class="ant-slider-track"></div>
  <div class="ant-slider-step"></div>
  <div class="ant-slider-mark"></div>
</div>
</template>
<script>
module.exports = {
  props:{
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10
    },
    step:{
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0,
      twoway: true
    }
  },
  computed: {
    ratio: function() {
      return this.value / (this.max - this.min);
    },
    stepX: function(){
      return this.step / (this.max - this.min);
    }
  },
  data: function(){
    return {
      xratio: 0
    }
  },
  attached: function(){
    var _this = this;
    setTimeout(function(){
      var pWidth = $(_this.$els.handle).parent().width();
      $(_this.$els.handle).draggable({ 
        axis: "x" , 
        containment: "parent",
        // grid: [ pWidth * _this.stepX , 0 ],
        create: function(){
          this.$track = $(this).parent().find('.ant-slider-track');
          this.pwidth = $(this).parent().width();
          this.$track.css('width', this.pwidth * _this.ratio + 'px');
          $(this).css('left', this.pwidth * _this.ratio + 'px');
        },
        drag: function(evt, ui){
          this.$track.css('width', ui.position.left + 'px');
          this.pwidth = $(this).parent().width();
          var ratio = ui.position.left / this.pwidth;
          _this.value = parseFloat(((_this.max - _this.min) * ratio).toFixed(_this.step));
          _this.$dispatch('value-change', _this.value, false);
        },
        stop: function(evt, ui){
          this.$track.css('width', ui.position.left + 'px');
          this.pwidth = $(this).parent().width();
          var ratio = ui.position.left / this.pwidth;
          _this.value = parseFloat(((_this.max - _this.min) * ratio).toFixed(_this.step));
          _this.$dispatch('value-change', _this.value, true);
        }
      });
    }, 0);
  },
  watch:{
    ratio: function(){
      var pWidth = $(this.$els.handle).parent().width();
      $(this.$els.handle).parent().find('.ant-slider-track').css('width', pWidth * this.ratio + 'px');
      $(this.$els.handle).css('left', pWidth * this.ratio + 'px');
    }
  },
  methods: {
    drag: function(){

    }
  }
}
</script>
<style>
  .ant-slider {
    position: relative;
    margin: 10px 8px;
    height: 5px;
    border-radius: 0px;
    background-color: #e9e9e9;
    cursor: pointer;
  }

  .ant-slider,
  .ant-slider-track {
    -webkit-transition: background-color .3s ease;
    transition: background-color .3s ease
  }

  .ant-slider-track {
    position: absolute;
    left: 0;
    height: 5px;
    border-radius: 0px;
    background-color: #777;
    z-index: 1;
  }

  .ant-slider:hover {
    background-color: #e1e1e1;
  }

  .ant-slider:hover .ant-slider-handle {
    border-color: #57c5f7;
  }

  .ant-slider:hover .ant-slider-track {
    background-color: #666;
  }

  .ant-slider-handle {
    position: absolute;
    margin-left: -7px;
    margin-right: -7px;
    margin-top: -5px;
    width: 14px;
    height: 14px;
    cursor: pointer;
    border-radius: 50%;
    border: 2px solid #96dbfa;
    background-color: #fff;
    z-index: 2;
    -webkit-transition: border-color .3s ease;
    transition: border-color .3s ease
  }

  .ant-slider-handle:hover {
    border-color: #57c5f7
  }

  .ant-slider-handle:active {
    box-shadow: 0 0 0 2px rgba(45, 183, 245, .2)
  }

  .ant-slider-mark {
    position: absolute;
    top: 10px;
    left: 0;
    width: 100%;
    font-size: 12px;
    z-index: 3
  }

  .ant-slider-mark-text {
    position: absolute;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    color: #999
  }

  .ant-slider-mark-text-active {
    color: #666
  }

  .ant-slider-step {
    position: absolute;
    width: 100%;
    height: 4px;
    background: transparent;
    z-index: 1
  }

  .ant-slider-dot {
    position: absolute;
    top: -2px;
    width: 8px;
    height: 8px;
    border: 2px solid #e9e9e9;
    background-color: #fff;
    cursor: pointer;
    border-radius: 50%;
    vertical-align: middle
  }

  .ant-slider-dot,
  .ant-slider-dot:first-child,
  .ant-slider-dot:last-child {
    margin-left: -4px
  }

  .ant-slider-dot-active {
    border-color: #96dbfa
  }

  .ant-slider-disabled {
    background-color: #e9e9e9!important
  }

  .ant-slider-disabled .ant-slider-track {
    background-color: #ccc!important
  }

  .ant-slider-disabled .ant-slider-dot,
  .ant-slider-disabled .ant-slider-handle {
    border-color: #ccc!important;
    background-color: #fff;
    cursor: not-allowed
  }

  .ant-slider-disabled .ant-slider-dot,
  .ant-slider-disabled .ant-slider-mark-text {
    cursor: not-allowed!important
  }
</style>
