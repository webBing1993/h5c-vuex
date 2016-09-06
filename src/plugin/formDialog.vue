<template>
  <div>
    <dialog :show.sync="show" title="选择表单模版" :width="600">
      <div class="wrap" slot="content">
        <table>
          <tr>
            <td @click="selectFormTpl(0)">
              <div class="item">
                <h2>基础表单</h2>
                <div class="form-tpl-wrap">
                  <div class="form-item">
                    <input type="text" placeholder="姓名" class="ipt">
                  </div>
                  <div class="form-item">
                    <input type="text" placeholder="手机" class="ipt">
                  </div>
                  <div class="form-item">
                    <input type="text" placeholder="邮箱" class="ipt">
                  </div> 
                  <div class="form-item">
                    <button class="butuon">提交</button>
                  </div>                                                    
                </div>
              </div>
            </td>
            <td @click="selectFormTpl(1)">
              <div class="item">
                <h2>五星评价</h2>
                <div class="form-tpl-wrap">
                  <div class="form-item">
                    <h3>请输入评分项</h3>
                  </div>
                  <div class="form-item istar">
                    <span class="icon-star-empty"></span>
                    <span class="icon-star-empty"></span>
                    <span class="icon-star-empty"></span>
                    <span class="icon-star-empty"></span>
                    <span class="icon-star-empty"></span>                                                                                
                  </div> 
                  <div class="form-item">
                    <button class="butuon">提交</button>
                  </div> 
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td @click="selectFormTpl(2)">
              <div class="item">
                <h2>单项选择</h2>
                <div class="form-tpl-wrap">
                  <div class="form-item">
                    <h3><b>[单选]</b>请输入问题</h3>
                  </div>
                  <div class="form-item">
                    <label>
                      <input type="radio" class="">
                      输入选项一
                    </label>
                  </div>
                  <div class="form-item">
                    <label>
                      <input type="radio" class="">
                      输入选项二
                    </label>
                  </div>
                  <div class="form-item">
                    <label>
                      <input type="radio" class="">
                      输入选项三
                    </label>
                  </div>                  
                  <div class="form-item">
                    <button class="butuon">提交</button>
                  </div> 
                </div>
              </div>
            </td>
            <td @click="selectFormTpl(3)">
              <div class="item">
                <h2>多项选择</h2>
                <div class="form-tpl-wrap">
                  <div class="form-item">
                    <h3><b>[多选]</b>请输入问题</h3>
                  </div>
                  <div class="form-item">
                    <label>
                      <input type="checkbox" class="">
                      输入选项一
                    </label>
                  </div>
                  <div class="form-item">
                    <label>
                      <input type="checkbox" class="">
                      输入选项二
                    </label>
                  </div>
                  <div class="form-item">
                    <label>
                      <input type="checkbox" class="">
                      输入选项三
                    </label>
                  </div>                  
                  <div class="form-item">
                    <button class="butuon">提交</button>
                  </div> 
                </div>
              </div>
            </td>
          </tr>          
        </table>
      </div>
  </div>
</template>
<script>
  module.exports = {
    props: {
      show : {
        type: Boolean,
        require: true,
        twoway: true
      }       
    },
    data: function(){
      return {};
    },
    methods: {
      selectFormTpl: function(type){
        this.$dispatch('addformComp', type);
        this.show = false;
      }
    },
    components : {
      dialog : require('./dialog.vue'),
    }    
  }
</script>
<style scoped>
  .wrap{
    padding:10px;
  }
  .wrap table {
    width:100%;
  }
  .wrap table td{
    width: 50%;
  }
  .wrap .item {
    position: relative;
    height: 200px;
    padding: 5px;
    font-size: 14px;
  }
  .wrap td:hover .item::before {
    content:'';
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    cursor: pointer;
    background: rgba(0,0,0,.1);
  }
  .wrap .item h2{
    color: #666;
    font-size: 14px;
    margin-bottom: 10px; 
  }
  .wrap .item h3{
    font-weight: normal;
  }
  .form-item {
    margin: 10px;
    text-align: center;
  }
  .form-tpl-wrap .ipt{
    width: 80%;
    height: 30px;
    padding: 2px 4px;
    border: 1px solid #ccc;
  }
  .form-tpl-wrap .istar {
    font-size: 24px;
  }
  .form-tpl-wrap .butuon{
    border:none;
    border-radius: 5px;
    padding: 10px 40px;
    color: #fff;
    background: rgb(255, 153,0);
  }  
</style>