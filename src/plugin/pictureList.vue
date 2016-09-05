<template>
  <div>         
    <ul class="img-list">
      <li v-for="img in imglist">
        <img :src="img.src | realImgSrc" @click="addImgTo(img.src)">
        <a v-if="uploadable" class="delete-pic" @click="openDelPic(img)" href="javascript:;" >&times;</a>
      </li>
    </ul>
    <nav v-if="pages > 1">
      <ul class="pagination">
        <li :class="{'disabled': currentPage <= 1 }">
          <a href="javascript:;" @click="getPage(1)">
            首页
          </a>
        </li>        
        <li :class="{'disabled': currentPage <= 1 }">
          <a href="javascript:;" @click="getPrevPage()">
            上页
          </a>
        </li>
        <li>
          <a href="javascript:;">{{currentPage}} / {{pages}}</a>
        </li>
        <!--         
        <li v-for="page in pages" 
            :class="{'active': currentPage === (page + 1)}"
            @click="getPage( page + 1)"
            >
          <a href="javascript:;">{{page + 1}}</a>
        </li> 
        -->
        <li :class="{'disabled': currentPage >= pages }">
          <a href="javascript:;" @click="getNextPage()">
            下页
          </a>
        </li>
        <li :class="{'disabled': currentPage >= pages }">
          <a href="javascript:;" @click="getPage(pages)">
            末页
          </a>
        </li>        
      </ul>
    </nav>
    <div v-if="uploadable" class="upload-wrap">
      <button v-el:upload  id="btnUpload" class="btn btn-default"> +上传图片</button>
      <span>(格式为 jpg, png, gif , 小于 2M)</span>
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
      },    
       // 点击图片广播事件的类型
      type : {
        type: String,
        require: true
      },
      // 是否可以上传图片
      uploadable : { 
        type: Boolean,
        default: false
      },
      // 图片类型
      tag : {
        type: [String, Number],
        require: true
      },
      rows: {
        type: Number,
        default: 15
      }
    },
    data: function(){
      return {
        imglist:[],
        toDelImg: null,
        total: 0,
        currentPage: 1
      }
    },
    watch: {
      tag: function(){
        this.getPage();
      }
    },
    computed: {
      pages: function(){
        return Math.ceil( this.total / this.rows );
      }
    },
    created: function(){
      this.getPage();
    },
    ready: function(){
      var _this = this;
      var layerIndex = null;
      var uploader = new plupload.Uploader({
          runtimes : 'html5',
          browse_button :  _this.$els.upload, 
          max_file_size : '2mb',
          url: Global.api.uploadPicture ,
          filters : [
            {title : "Image files", extensions : "jpg,gif,png,jpeg"}
          ],
          init: {
            PostInit: function() {
            },            
            FilesAdded: function(up, files) {
              uploader.start();
              layerIndex = layer.load(1, {
                shade: [0.5,'#000']
              });               
            },
            BeforeUpload: function(){
            },            
            UploadProgress: function(up, file) {
            },
            FileUploaded: function(up, files, info){
              var info = JSON.parse(info.response);
              if(info.success){
                console.log(info);
                var msg = info.data[0].message;
                if(/文件已存在/.test(msg)){
                  layer.alert(msg);
                }
                else{
                  _this.getPage(_this.currentPage);
                }
              }
              else {
                layer.alert("上传失败！，请重试");
              }
            },
            UploadComplete: function(up, files, info){
              layer.close(layerIndex);
            },
            Error: function(up, err) {
              if( err.code === -600) {
                layer.alert("图片大小超过2M, 请重新选择上传！");
              }
              else if(err.code === -601){
                layer.alert("图片类型错误, 请重新选择上传！");
              }
              else {
                layer.alert("上传图片失败 ");
              }
              console.log(err);
            }
          }
      });
      uploader.init();       
    },
    methods: {
      getPage: function(page, rows){
        var _this = this;
        if( _this.uploadable ) {
          var apiPath = Global.api.getPicture;
        }
        else{
          if(_this.tag == -1 ) {
            var apiPath = Global.api.getHotPicture;
          }
          else{
            var apiPath = Global.api.pictureLibrary;
          }          
        }
        $.ajax({
          url: apiPath,
          dataType: "json",
          data: {
            tags:  _this.tag ,
            page: page || 1,
            rows: rows || _this.rows           
          },
          success: function(result){
            if(result.success){
              _this.imglist = result.data.list;
              _this.total = result.data.total;
              _this.currentPage = page || 1;
              _this.imglist = _this.imglist.map(function(item){
                item.src = item.source_id;
                return item;
              });
            }
            else{
              layer.alert("图片加载失败");
            }
          }
        });
      },
      getNextPage: function(){
        if(this.currentPage >= this.pages) return false;
        this.getPage(this.currentPage + 1);
      },
      getPrevPage: function(){
        if(this.currentPage <= 1) return false;
        this.getPage(this.currentPage - 1);        
      },
      openDelPic: function(img){
        var _this = this;
        _this.toDelImg = img;
        var index = layer.confirm('您确定删除图片吗？', {
          btn: ['确定','取消'] 
        }, function(){
          layer.close(index);
          _this.delPic();
        }, function(){
          console.log("取消删除");
        });
      },
      delPic: function(){
        var _this = this;
        // _this.showAlert = false;
        $.ajax({
          url: Global.api.deletePicture,
          data: {
            id: _this.toDelImg.source_id
          },
          dataType: "json",
          success: function(data){
            if(data.success){
              _this.getPage(_this.currentPage);
            }
            else{
              layer.alert('图片删除失败，请重试！');
            }
          },
          error: function(data){
            layer.alert('图片删除失败，请重试！');
          },
          complete: function(){
          }
        });
      },
      addImgTo: function(imgSrc){
        this.$dispatch( this.type, imgSrc);
        this.triggerHotPicutre(imgSrc);
        this.show = false;
      },
      triggerHotPicutre: function(id){
        $.ajax({
          url: Global.api.triggerHotPicture,
          data: {
            sourceId:id
          }
        });        
      }
    },
    components : {
      dialog : require('./dialog.vue'),
      tabs : require('./tabs.vue'),
      tab : require('./tab.vue'),
    }     
  }
</script>
<style scoped>
  .img-list {
    overflow: hidden;
    height: 330px;
  }
  .img-list li {
    position: relative;
    float: left;
    width: 105px;
    height: 105px;
    margin-right:5px;
    margin-bottom: 5px;
    text-align: center;
    border:1px solid #ccc;
    cursor: pointer;
  }
  .img-list li:hover{
    background-color: #f5f5f5;
  }
  .img-list li img{
    max-width:100%;
    height: 100%;
  }
  .upload-wrap {
    margin:10px auto;
  }
  .upload-wrap span {
    color: #666;
  }
  .delete-pic {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: rgba(51, 122, 183, .7);
    color: #fff;
    line-height: 24px;
    text-align: center;
    border-top-left-radius: 100%;
  }
  .delete-pic:hover{
    background-color: rgba(183, 51, 51, 0.7);
  }  
</style>