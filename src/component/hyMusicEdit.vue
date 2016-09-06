<template>
<div class="panel panel-default panel-zone">
  <div class="panel-body">
    <ul class="nav nav-tabs">
      <li class="active"><a href="#musicStyle"  data-toggle="tab">音乐库</a></li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane active">
        <div class="play-wrap">
          <table v-if="slide.music.id">
            <tr>
              <td class="item"> <i class="icon-music"></i> </td>
              <td><span>{{slide.music.name}}</span></td>
              <td class="item">
                <a href="javascript:;" @click="unSelectMusic">
                  <i class="icon-remove"></i>
                </a>
                <audio loop v-el:music :src="slide.music && slide.music.id | realImgSrc">
                </audio> 
              </td>
            </tr>
          </table>
          <div v-else="slide.music.id" class="tip">请选择音乐</div>
        </div>
        <div class="tag-wrap">
          <ul>
            <li 
              v-for="tag in tags" 
              :class="{'active': currentTag == tag}"
              @click="selectTag(tag)"
              >
              {{tag.name}}
            </li>
          </ul>          
        </div>
        <div class="playlist">
          <table>
            <tr v-for="(index, item) in musiclist" 
              :class="{'active': item.source_id === slide.music.id}"
              @click="selectMusic(item)"
              >
              <td class="index">{{index | fixIndex }}</td>
              <td class="name">{{item.source_name }}</td>
              <td>
                <a href="javascript:;" @click="playMusic(item, $event)">
                  <i :class="{'icon-play': item !== currentPlayMusic, 'icon-pause': item === currentPlayMusic}"></i>
                </a>
              </td>
              <td>
                <a href="javascript:;" @click="selectMusic(item)">
                  <i class="icon-plus"></i>
                </a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>

import * as actions from '../vuex/actions'

module.exports = {
  vuex: {
    getters: {
      slide: state => state.slide,
      activePageIndex: state => state.activePageIndex,
      comp: state => state.currentComp
    },
    actions: actions
  },   
  data: function(){
    return {
      musiclist: [],
      currentPlayMusic: null,
      tags: [],
      currentTag: null      
    }
  },
  computed:{
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
        _this.tags = tags;
        _this.currentTag = _this.tags[0];
        _this.getMusicList();
      },0);    
    }
    else{
      _this.getTags();
    }
  },
  ready: function(){
    var _this = this;
    var uploader = new plupload.Uploader({
        runtimes : 'html5',
        browse_button : 'btnUpload', 
        max_file_size : '2mb',
        url: Global.api.uploadMusic + "&tags=default",
        filters : [
          {title : "mp3文件", extensions : "mp3"},
        ],
        init: {
          BeforeUpload: function(){
          },
          PostInit: function() {
          },
          FilesAdded: function(up, files) {
            uploader.start();
          },
          UploadProgress: function(up, file) {
          },
          FileUploaded: function(){
          },
          UploadComplete: function(){
            _this.getMusicList();
          },
          Error: function(up, err) {
            console.log(err);
          }
        }
    });
    uploader.init();       
  },  
  methods: {
    getTags: function(){
      var _this = this;
      $.ajax({
        url: Global.api.musicTag ,
        method: "GET", 
        dataType: "json"
      }).done(function(result){
        if(result.success == 'true'){
          var tags = result.data;
          _this.tags = tags;
          _this.currentTag = _this.tags[0];            
        }
        else{
          console.log('获取音乐tag失败', result);
        }
      }).fail(function(result){
        console.log('获取音乐tag失败', result);
      })
    },    
    selectTag: function( tag ){
      this.currentTag = tag;
      this.getMusicList();
    },
    selectMusic: function( item ){
      this.updateSideMusic({
        name: item.source_name,
        id: item.source_id
      })
      this.currentPlayMusic = item;
      this.$nextTick(function(){
        this.$els.music.play();
      });
    },
    unSelectMusic: function() {
      this.updateSideMusic({
        name: '',
        id: null
      })
    },
    playMusic: function( item, event ){
      if(this.currentPlayMusic == item) {
        this.currentPlayMusic = null;
        this.$els.music.pause();
        event.stopPropagation()
      }
    },
    getMusicList: function(tag){
      var _this = this;
      $.ajax({
        url: Global.api.getMusic,
        method: 'GET',
        data:{
          tags: _this.currentTag.id
        },
        dataType: "json"
      }).done(function(result){
        if (result.success) {
          console.log("音乐列表加载成功", result);
           _this.musiclist = result.data.list;
        }
        else{
          console.error("音乐列表加载失败", result);
        }
      }).fail(function(result){
        console.error("音乐列表加载异常", result);
      });
    },
    openDelMusic: function(id){
      var _this = this;
      var index = layer.confirm('您确定删除音乐吗？', {
        btn: ['确定','取消'] 
      }, function(){
        layer.close(index);
        _this.delMusic(id);
      }, function(){
        console.log("取消删除");
      });
    },    
    delMusic: function(id){
      var _this = this;
      $.getJSON(
        Global.api.deleteMusic, {
        id: id
      }).done(function(result){
        if(result.success) {
          layer.alert('删除成功');
          _this.getMusicList();
        }
        else{
          layer.alert('删除失败');
        }
      }).fail(function(result){
        layer.alert('删除失败');
        console.error("音乐列表加载异常", result);
      });
    }
  },
  filters: {
    fixIndex: function(index){
      index = parseInt(index) + 1;
      return index <= 9 ? '0' + index : index;
    }
  }
}
</script>
<style scoped>
  .play-wrap {
    margin-bottom: 10px;
    line-height: 25px;
    background: #ddd;
    border-radius: 5px;
  }
  .play-wrap .tip {
    padding-left: 5px;
  }
  .play-wrap table{
    table-layout: fixed;  
    width: 100%;
  }  
  .play-wrap .item {
    width: 30px;
    text-align: center;    
  }
  .tag-wrap {
    margin-bottom: 10px;
  }
  .tag-wrap ul {
    overflow:hidden;
  }
  .tag-wrap li{
    display: inline-block;
    margin-right: 6px;
    margin-bottom: 2px;
    line-height: 1.4;
    font-size: 12px;
    color: #666;
    padding: 2px 4px;
    cursor: pointer;
    border-radius: 2px;
  }
  .tag-wrap li:hover{}
  .tag-wrap li.active{
    color: #fff;
    background-color: #ffa500;
  }
  .playlist {
    padding: 8px 0;
    background: #fff;
    height: 600px;
  }
  .playlist table{
    table-layout: fixed;  
    width: 100%;
  }
  .playlist td {
    height: 36px;
    text-align: center;
    cursor: pointer;
  }
  .playlist a {
    text-decoration: none;
  }
  .playlist tr:hover{
    background: #ffc14d;
    color: #fff;
  }
  .playlist tr.active{
    background: #ffa500;
    color: #fff;
  }
  .playlist tr:hover a,
  .playlist tr.active a{
    color:#fff;
    text-decoration: none;
  }
  .playlist .index{
    width: 30px;
    text-align: center;
  }
  .playlist .name{
    width: 215px;
    padding: 0 4px;
    text-align: left;
  }
  .playlist .td-del {
    text-align: right;
    padding-right: 5px;
  }
  .playlist .btn-del {
    text-decoration: underline;
    color: #333;    
  }
</style>