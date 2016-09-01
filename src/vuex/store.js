import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let defautPageSetting = function() {
  return {
    title: '',
    style: {
      backgroundColor: '#ffffff',
      image: null
    },
    comps:[]
  }
};
const state = {
  id: 100,
  slide: {
    title: '我的h5作品',
    description: "我的h5作品, 有没有觉得很高大上啊~快来膜拜我！",
    icon: 12,
    tags: '',
    music: {},
    pages: [defautPageSetting()]
  },
  tpl: -1,
  template: false,
  release: -1,
  // 当先激活 page  的 index 
  activePageIndex: 0,
  currentComp: {
    type: 'hy-page'
  }
}
const mutations = {
  UPDATE_ID (state, id) {
    state.id = id
  },
  ACTIV_SLIDE_PAGE_INDEX (state, index){
    state.activePageIndex = index
  },
  ADD_SLIDE_PAGE (state){
    state.slide.pages.push(defautPageSetting())
    state.activePageIndex = state.slide.pages.length -1
  },
  DEL_SLIDE_PAGE (state, index){
    state.slide.pages.splice(index, 1)
    if(state.activePageIndex >= state.slide.pages.length - 1 ){
      state.activePageIndex = state.slide.pages.length - 1
    }
  },
  COPY_SLIDE_PAGE (state, index) {
    let newPage = _.cloneDeep(state.slide.pages[index])
    state.slide.pages.splice(index + 1, 0, newPage)
  }  
}
const plugins = []

export default new Vuex.Store({
  state,
  mutations,
  plugins,
  strict: true
})
