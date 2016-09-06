<template>
  <div class="form-select">
    <div class="form-item">
      <h3>{{item.name}}</h3>
    </div>
    <div class="form-item" v-for="(index, entry) in item.items" track-by="$index">
      <label>
        <input type="checkbox" :name="item.name">
        <span class="icon-check-empty"></span>
        <span class="icon-check"></span>
        {{entry}}
      </label>
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
    item: {
      type: Object,
      required: true
    }
  },
  computed: { 
  },
  methods: {
  },
  components: {
  }
}
</script>