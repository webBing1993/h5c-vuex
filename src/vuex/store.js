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
  activePageIndex: 0,
  currentComp: {
    type: 'hy-page'
  },
  release: -1,
  template: false,
  tpl: -1
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
  },
  // 更新激活 page 的 title 
  UPDATE_ACTIVE_PAGE_TILTE (state, mutation) {
    let index = state.activePageIndex
    state.slide.pages[index].title =  mutation.payload.value;
  },
  // 更新激活 page 的 color 
  UPDATE_ACTIVE_PAGE_BACKGROUND_COLOR (state, mutation){
    let index = state.activePageIndex
    state.slide.pages[index].style.backgroundColor = mutation.payload.value;
  },
  // 更新激活 page 的 color 
  UPDATE_ACTIVE_PAGE_IMAGE (state, mutation){
    let index = state.activePageIndex
    state.slide.pages[index].style.image = mutation.payload.value;
  }, 
  // 更新激活组件
  UPDATE_ACTIVE_COMP (state, mutation) {
    let type = mutation.payload.type
    let config = mutation.payload.config
    let index = state.activePageIndex

    if ( ['page', 'music'].indexOf(type) >= 0 ) {
      state.currentComp = config
    }
    else {
      state.slide.pages[index].comps.push(config)
      let len = state.slide.pages[index].comps.length;
      state.currentComp = state.slide.pages[index].comps[len - 1]
    }
  },
  // 修改激活组件
  CHANGE_ACTIVE_COMP (state, mutation) {
    state.currentComp = mutation.payload.config
  }  
}
const plugins = [function(store) {
  store.subscribe((mutation, state) => {
    H.hook.$emit('vuex:mutation', state)
  })
}]

export default new Vuex.Store({
  state,
  mutations,
  plugins,
  strict: true
})
