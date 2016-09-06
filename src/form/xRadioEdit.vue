<template>
<div>  
  <div class="title">
   <input type="text" 
      :value="item.name"
      @input="changeNameValue"
      @blur="changeNameValue($event, true)"
    >
    <span>单选</span>
  </div>
  <div class="form-item" v-for="(index,item) in item.items" track-by="$index">
    <label>
      <button class="del" @click="del(index)">
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
<script>
module.exports = {
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    }
  },
  methods: {
    add: function(){
      var item = _.cloneDeep(this.item)
      item.items.push("选项");
      this.$dispatch('value-change', this.index, item, true);
    },
    del: function(index){
      var item = _.cloneDeep(this.item)
      item.items.splice(index, 1);
      this.$dispatch('value-change', this.index, item, true);      
    },
    changeNameValue: function(event, flag){
      var value = event.target.value
      var item = _.cloneDeep(this.item)
      var item = _.merge(item, {
        name: value
      })
      this.$dispatch('value-change', this.index, item, flag);
    }          
  },
  components: {
  }
}
</script>
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