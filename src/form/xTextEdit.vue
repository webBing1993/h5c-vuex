<template>
<div>
   <input type="text" 
      :value="item.name"
      @input="changeNameValue"
      @blur="changeNameValue($event, true)"
    >
   <input type="checkbox" 
      :checked="item.required"
      @change="changeRequireValue($event, true)"
    >必填
</div>
</template>
<style scoped>
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
        type: 'xText',
        name: value,
        required: this.item.required
      });
    },
    changeRequireValue: function(event, flag){
      var value = event.target.checked
      this.$dispatch('value-change', this.index, {
        type: 'xText',
        name: this.item.name,
        required: value
      }, flag);
    }    
  }
}
</script>