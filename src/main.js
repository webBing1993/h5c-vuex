import Vue from 'vue'
import store from './vuex/store'
import App from './App'

if( process.env.NODE_ENV !== 'production') {
  var host = 'http://localhost:4001';
}
else {
  var host = '';
}

window.Global = {
  api: {
    h5: '/api/h5',
    picture: '/api/picture',
    music: '/api/music',
    h5pc: host + "/slider/pc.html#",
    h5wap: host + "/slider/wap.html#"
  },
  isAdmin: false
}

window.H = {
  hook:  new Vue(),
  slideHistory: [],
  slideIndex: 0  
}
Vue.filter('realImgSrc', function (id) {
  if(isNaN(parseInt(id))) {
    return id;
  }
  else{
    return Global.api.basePicture + id;
  }
});

Vue.filter('pageStyleFix', function (obj) {
  var tmp = {};
  for(var prop in obj){
    if(['backgroundImage'].indexOf(prop) > -1){
      if(obj[prop]){
        tmp[prop] = 'url(' + Global.api.basePicture + obj[prop] + ')';
      }
    }
    else{
      tmp[prop] =obj[prop]
    }
  }
  return tmp;
});

Vue.directive('validate', {
  params: ['min', 'max'],
  twoWay: true,
  bind: function () {
  },
  update: function (result) {
    var min = this.params.min;
    var max = this.params.max;

    this.handler = function () {
      var value = parseFloat(this.el.value);

      if(isNaN(value)) {
        value = 0;
      }
      else if(value < min) {
        value = min;
      }
      else if (value >= max){
        value = max
      }
      else{
        value = this.el.value;
      }
      this.el.value = value;
      this.set(parseFloat(value));
    }.bind(this)
    this.el.addEventListener('input', this.handler);
  }
});
window.app = new Vue({
  store,
  el: 'body',
  created: function() {
    var _this = this;
    H.hook.$on('vuex:init', function(state) {
      H.slideHistory.push($.extend(true, {}, state));
      H.slideIndex = 0;
    });
    H.hook.$on('vuex:mutation', function(state) {
      if (H.slideHistory.length >= 10) {
        H.slideHistory.shift();
      }
      H.slideHistory = H.slideHistory.splice(0, H.slideIndex + 1);
      H.slideHistory.push($.extend(true, {}, state));
      H.slideIndex = H.slideHistory.length - 1;
    });
    H.hook.$on('vuex:replace', function(index) {
      var slide = $.extend(true, {}, H.slideHistory[index])
      _this.$store.replaceState(slide);
    });
    H.hook.$emit('vuex:init', _this.$store.state);
  },  
  components: { App }
})
