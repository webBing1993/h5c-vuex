<template>
<div class="panel panel-default panel-zone">
  <div class="panel-body">
    <ul class="nav nav-tabs">
      <li class="active"><a href="#textStyle"  data-toggle="tab">素材</a></li>
      <li><a href="#textAnimate"  data-toggle="tab">样式</a></li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane active" id="textStyle">
      </div>
      <div class="tab-pane" id="textAnimate">
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>
</style>
<script>
module.exports = {
  data: function(){
    return {
    }
  },
  props: {
    comp: {
      type: Object,
      required: true
    }
  },
  computed: { 
  },
  methods: {
  },
  components: {
    animate: require('../plugin/animate.vue')
  }
}
</script>