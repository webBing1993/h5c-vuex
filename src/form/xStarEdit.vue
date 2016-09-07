<template>
  <div>
    <div class="form-item">
     <input type="text" 
        :value="item.name"
        @input="changeNameValue"
        @blur="changeNameValue($event, true)"
      >
    </div>
    <div class="form-item istar">
      <span class="icon-star-empty"></span>
      <span class="icon-star-empty"></span>
      <span class="icon-star-empty"></span>
      <span class="icon-star-empty"></span>
      <span class="icon-star-empty"></span>
    </div>
  </div>
</template>
<style scoped>
  .form-item {
    margin:5px 0;
  }
  .istar {
    font-size: 20px;
  }
</style>
<script>
module.exports = {
  props: {
    item: {
      type: Object
    },
    index: {
      type: Number
    } 
  },
  methods: {
    changeNameValue: function(event, flag){
      var value = event.target.value
      this.$dispatch('value-change', this.index, {
        type: "xStar",
        name: value,
        defualt: 0
      }, flag);
    }   
  }
}
</script>