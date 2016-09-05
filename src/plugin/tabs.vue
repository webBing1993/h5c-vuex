<template>
  <div class="ui-tabs" :class="type">
    <ul class="nav nav-tabs">
      <li 
        v-for="(index, tab) in $children"
        :class="{'active': tab.show }"
        @click="showTab(index, tab)"
        >
        <a href="javascript:;">{{tab.header}}</a>
      </li>
    </ul>
    <div class="tab-content">
      <slot></slot>
    </div>     
  </div>
</template>
<script>
  module.exports = {
    props: {
      activeTabIndex: {
        type: Number,
        twoway: true,
        default: 0
      },
      type: {
        type: String,
        default: ''
      }
    },
    ready: function(){
      var _this = this;
      this.$children.forEach(function(item, index){
        if(_this.activeTabIndex === index){
          item.show = true;
        }
      })
    },
    methods: {
      showTab: function(index, tab ){
        this.$children.forEach(function(item, index){
          item.show = false;
        })
        tab.show = true;
        this.activeTabIndex = index;
      }
    }
  }
</script>
<style scoped>
  .ui-tabs.vertical {
    display:flex;
    height:100%;
  }
  .vertical .nav-tabs {
    flex: 1;
    background: #f5f5f5;
  } 
  .vertical .nav-tabs > li{
    float:none;
    text-align: center;
  } 
  .vertical .nav-tabs > li > a{
    border: none;
    border-radius: 0;
    margin: 0;    
  }
  .vertical .nav-tabs > li.active > a {
    border:none;
    background-color: #fff;
  }
  .vertical .tab-content {
    flex: 5;
    padding: 10px 5px 10px 10px;;
  }
</style>