<template>
<dialog :show.sync="show" title="素材库" :width="680">
  <div class="wrap" slot="content">
    <tabs type="vertical">
      <tab header="图片库">
        <ul class="tag-wrap">
          <li 
            v-for="tag in tags" 
            :class="{'active': currentTag == tag}"
            @click="activeTag(tag)"
            >
            {{tag.name}}
          </li>
        </ul>
        <picture-list
          v-if="currentTag && currentTag.id"
          :uploadable="false"
          :type="type"
          :show.sync="show"
          :tag.sync="currentTag.id"
          >
        </picturelist>
      </tab>      
      <tab header="我的图片">
        <picture-list 
          :uploadable="true"
          :type="type"
          :show.sync="show"
          >
        </picturelist>        
      </tab>
    </tabs>
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
      type : {
        type: String,
        require: true
      }
    },
    data: function(){
      return {
        tags: [],
        currentTag: null
      }
    },
    created: function(){
      var _this = this;
      if( process.env.NODE_ENV !== 'production'){
        setTimeout(function(){
         var tags = [{
            name: '商务01',
            id: 1
          },{
            name: '商务02',
            id: 2
          },{
            name: '商务03',
            id: 3
          },{
            name: '商务04',
            id: 4
          },{
            name: '商务05',
            id: 5
          },{
            name: '商务06',
            id: 6
          },{
            name: '商务07',
            id: 7
          },{
            name: '商务08',
            id: 8
          },{
            name: '商务09',
            id: 9
          },{
            name: '商务10',
            id: 10
          },{
            name: '商务11',
            id: 11
          },{
            name: '商务12',
            id: 12
          }];
          tags.unshift({
            name: '最热',
            id: -1
          })
           _this.tags = tags;
          _this.currentTag = _this.tags[0];
        },0)        
      }
      else {
        _this.getTags();
      }
    },
    methods: {
      getTags: function(){
        var _this = this;
        $.ajax({
          url: Global.api.pictureTag ,
          method: "GET", 
          dataType: "json"
        }).done(function(result){
          if(result.type == 'success'){
            var tags = result.data;
            if(tags && tags.length){
              tags.unshift({
                name: '最热',
                id: -1
              })
            }
            _this.tags = tags;
            _this.currentTag = _this.tags[0];            
          }
          else{
            console.log('获取图片tag失败', result);
          }
        }).fail(function(result){
          console.log('获取图片tag失败', result);
        })
      },
      activeTag: function( tag ){
        this.currentTag = tag;
      }
    },  
    components : {
      dialog : require('./dialog.vue'),
      tabs : require('./tabs.vue'),
      tab : require('./tab.vue'),
      pictureList : require('./pictureList.vue')
    }    
  }
</script>
<style scoped>
  .wrap {
    height: 500px;
  }
  .wrap h2{
    line-height: 30px;
  } 
  .tag-wrap {
    overflow:hidden;
    margin-bottom: 10px;
  }
  .tag-wrap li{
    display: inline-block;
    margin-right: 6px;
    margin-bottom: 2px;
    line-height: 1.4;
    font-size: 14px;
    color: #666;
    padding: 2px 8px;
    cursor: pointer;
    border-radius: 2px;
  }
  .tag-wrap li:hover,
  .tag-wrap li.active{
    color: #fff;
    background-color: #ffa500;
  }
</style>