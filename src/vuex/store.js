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
window.state = {
  id: null,
  slide: {
    title: '我的h5作品',
    description: "我的h5作品, 有没有觉得很高大上啊~快来膜拜我！",
    icon: 12,
    tags: '',
    music: {
      id: null,
      name: ''
    },
    pages: [defautPageSetting()]
  },
  activePageIndex: 0,
  currentComp: {
    type: 'hy-page'
  },
  currentCompIndex: 0,
  release: -1,
  template: false,
  tpl: -1
}
const mutations = {
  UPDATE_ID (state, id) {
    state.id = id
  },
  // 页面 - 选中
  ACTIV_SLIDE_PAGE_INDEX (state, index){
    state.activePageIndex = index
  },
  // 页面 - 添加
  ADD_SLIDE_PAGE (state){
    state.slide.pages.push(defautPageSetting())
    state.activePageIndex = state.slide.pages.length -1
  },
  // 页面 - 删除
  DEL_SLIDE_PAGE (state, index){
    state.slide.pages.splice(index, 1)
    if(state.activePageIndex >= state.slide.pages.length - 1 ){
      state.activePageIndex = state.slide.pages.length - 1
    }
  },
  // 页面 - 复制
  COPY_SLIDE_PAGE (state, index) {
    let newPage = _.cloneDeep(state.slide.pages[index])
    state.slide.pages.splice(index + 1, 0, newPage)
  },
  // 页面 - 更新 title 
  UPDATE_ACTIVE_PAGE_TILTE (state, mutation) {
    let index = state.activePageIndex
    state.slide.pages[index].title =  mutation.payload.value;
  },
  // 页面 - 更新 background-color 
  UPDATE_ACTIVE_PAGE_BACKGROUND_COLOR (state, mutation){
    let index = state.activePageIndex
    state.slide.pages[index].style.backgroundColor = mutation.payload.value;
  },
  // 页面 - 更新 image 
  UPDATE_ACTIVE_PAGE_IMAGE (state, mutation){
    let index = state.activePageIndex
    state.slide.pages[index].style.image = mutation.payload.value;
  },  
  // 页面 - 更新 music
  UPDATE_SLIDE_MUSIC (state, mutation){
    state.slide.music = mutation.payload.music;
  },   
  // 组件 - 激活，增加
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
      state.slide.pages[index].comps.map(function(item){
        item.active = false;
        return item;
      });      
      state.currentComp.active = true;
    }
  },
  // 组件 - 修改
  CHANGE_ACTIVE_COMP (state, mutation) {
    _.merge(state.currentComp, mutation.payload.config)
    console.log(state.currentComp);
  },
  // 组件 - 激活
  ACTIVE_COMP (state, mutation){
    state.slide.pages[state.activePageIndex].comps.map(function(item){
      item.active = false
      return item
    })
    state.currentComp = mutation.payload.comp
    state.currentCompIndex = mutation.payload.index
    state.currentComp.active = true
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
