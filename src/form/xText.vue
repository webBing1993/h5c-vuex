<template>
<div class="form-item">
  <input type="text" :placeholder="item.name">
</div>
</template>
<style scoped>
</style>
<script>
module.exports = {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>