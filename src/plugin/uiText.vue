<template>
  <input type="text" 
    :value="value" 
    @input="changeValue($event, false)"
    @blur="changeValue($event, true)"
    >
</template>
<script>
  export default {
    props: {
      value: {
        type: [String, Number]
      },
      min: {
        type: Number
      },
      max: {
        type: Number
      },
      type: {
        type: String,
        default: 'string'
      }
    },
    methods: {
      changeValue: function(event, flag){
        var value = event.target.value;
        if( this.type != "string" ) {
          if(this.type == 'float') {
            value = parseFloat(value);
          }
          else if( this.type == 'int'){
            value = parseInt(value);
          }
          if(isNaN(value)) {
            value = 0;
          }
          else if(value < this.min) {
            value = this.min;
          }
          else if (value >= this.max){
            value = this.max
          }
        }
        this.$dispatch('value-change', value, flag);
      }
    }
  }
</script>
<style>
  
</style>