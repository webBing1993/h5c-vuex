<template>
  <div class="context-menu"
     v-show="show"
     :style="{top: top + 'px' , left: left + 'px'}">
    <ul>
      <template v-for="(key, value) in handle">
        <li v-if="value" @click.stop="contextMenuClick(value)">{{key}}</li>
        <li v-else="valule" class="menu-separator"></li>
      </template>
    </ul>
  </div>
</template>
<style scoped>
  .context-menu{
    position: fixed;
    list-style-type: none;
    background: #fff;
    border: 1px solid #bebebe;
    border-radius: .2em;
    z-index: 1000;
    padding: 5px 0;
  }
  .context-menu li {
    position: relative;
    padding: 5px 8px;
    color: #2f2f2f;
    user-select: none;
    font-size: 12px;
    background-color: #fff;   
  }
  .context-menu li:hover {
    color: #fff;
    background-color: #2980b9;
    cursor: pointer;
  }
  .context-menu .menu-separator{
    padding: 0;
    margin: .2em 0;
    border-bottom: 1px solid #e6e6e6;    
  }
</style>
<script>
module.exports = {
  data: function(){
    return {
      top: 0,
      left: 0,
      show: false
    }
  },
  props: {
    target: {
      type: null,
      require: true
    },    
    handle: {
      type: Object
    }       
  },
  ready: function(){
    var _this = this;
    _this.target.addEventListener("contextmenu", function(e) {
      _this.show = true;
      _this.top = e.pageY;
      _this.left = e.pageX;     
      e.preventDefault();
    }, false);    
    document.addEventListener('click', function(){
      _this.show = false;
    });
  },  
  methods: {
    contextMenuClick: function(type, evt){
      this.$dispatch(type, evt);
      this.show = false;
    }
  }
}
</script>