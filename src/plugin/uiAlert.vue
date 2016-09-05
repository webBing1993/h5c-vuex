<template>
<dialog :show.sync="show" :width="300" :show-close="false">
  <div class="wrap" slot="content">
    <div class="panel panel-danger">
      <div class="panel-heading">
        警告 <button type="button" class="close" @click.stop="close">&times;</button>
      </div>
      <div class="panel-body">
        你确定要删除图片吗？
      </div>
      <div class="panel-footer">
        <div class="btn btn-default btn-sm" @click="close">取消</div>
        <div class="btn btn-danger btn-sm" @click="ok">确定</div>
      </div>
    </div>
  </div>
</dialog>
</template>
<script>
  module.exports = {
    props: {
      show : {
        type: Boolean,
        require: true,
        twoway: true
      },
      okHandle: {
        type: Function
      }
    },
    data: function(){
      return {};
    },
    created: function(){
    },
    methods: {
      close: function(){
        this.show = false;
      },
      ok: function(){
        this.okHandle();
      }
    },
    components : {
      dialog : require('./dialog.vue')
    }    
  }
</script>
<style scoped>
.panel {
  margin-bottom: 0;
 }
.panel-heading .close{
  position: relative;
  top: -4px;
  right: -4px; 
  -webkit-appearance: none;
  padding: 0;
  cursor: pointer;
  background: 0 0;
  border: 0;  
  float: right;
  font-size: 21px;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  filter: alpha(opacity=20);
  opacity: .2;  
}
.panel-heading .close:focus, 
.panel-heading .close:hover {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    filter: alpha(opacity=50);
    opacity: .5;
}  
.panel-body {
  text-align: center;
  padding: 25px;
} 
.panel-footer {
  padding: 5px 15px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  text-align: right;
} 
</style>