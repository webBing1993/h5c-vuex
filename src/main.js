import Vue from 'vue'
import store from './vuex/store'

import App from './App'

import "./assets/vendor/jquery-ui/jquery-ui"

/* eslint-disable no-new */
new Vue({
  store,
  el: 'body',
  components: { App }
})
