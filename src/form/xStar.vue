<template>
<div class="form-item-star">
  <div class="form-item">
    <h3>{{item.name}}</h3>
  </div>  
  <div class="form-item star">
    <template v-for="i in len">
      <span @click="activeStar(i)" :class="{'icon-star-empty': i > currentIndex, 'icon-star active': i <= currentIndex}"></span> 
    </template>                                                                      
  </div>
</div>
</template>
<style scoped>
</style>
<script>
module.exports = {
  data: function(){
    return {
      len: 5,
      currentIndex: -1
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    activeStar: function(index){
      this.currentIndex = index;
    }
  }
}
</script>