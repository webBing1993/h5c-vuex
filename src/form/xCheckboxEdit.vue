<template>
<div>  
  <div class="title">
    <input type="text" v-model="item.name">
    <span>多选</span>
  </div>
  <div class="form-item" v-for="(index,item) in item.items" track-by="$index">
    <label>
      <button class="del" @click="del(item)">
        <span class="icon-minus"></span>
      </button>
      <input type="text" v-model="item">
    </label>
  </div>
  <div class="form-item">
    <button class="add" @click="add">
      <span class="icon-plus"></span>
    </button>
  </div>
</div>
</template>
<style scoped>
  .title {
    margin: 5px 0;
  }
  .form-item {
    margin-left: 20px;
  }
  .form-item label {
    position: relative;
    width: 100%;
  }
  .form-item .add{
    width:30px;
    height:30px;
    background:#e7e7e7;
    border-radius: 5px;
    border:1px solid rgb(250,153,0);
  }
  .form-item .del {
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    left: -8px;
    margin-top: -8px;
    text-align: center;
    line-height: 10px;
    background: #f90;
    border: 1px solid #333;
    color: #fff;
    border-radius: 50%;
  }
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
      twoWay: true,
      required: true
    },
    comp: {
      type: Object,
      twoWay: true,
      required: true
    }  
  },
  computed: { 
  },
  methods: {
    add: function(){
      this.item.items.push("选项");
    },
    del: function(item){
      this.item.items.$remove(item);
    },    
    delItem: function(){
      this.comp.list.$remove(this.item);
    }          
  },
  components: {
  }
}
</script>