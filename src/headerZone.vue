<template>
<div>
  <div class="logo">
     H5 编辑器
  </div>
  <div class="btn-center-wrap">
    <slot name="btn-center"></slot>
  </div>
  <div class="btn-right-wrap">
     <slot name="btn-right"></slot>
  </div>  
</div>
</template>
<style scoped>
  .logo {
    float: left;
    padding: 12px 0 0 15px;
    color: #e8e8e8;
    font-size: 16px;
    font-weight: bold;
  }
  .btn-center-wrap{
    position: absolute;
    top: 20px;
    left: 50%;
  }
  .btn-right-wrap{
    position: absolute;
    right:20px;
    top:5px;
  }
  .btn-right-wrap .btn {
    margin-right: 5px;
  }
</style>
<script>
  export default {  
  }
</script>