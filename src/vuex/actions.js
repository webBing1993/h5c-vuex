// 更新 h5 id
export const updateId = ({ dispatch }, id) => {
  if ( id ) {
    dispatch('UPDATE_ID', id)
  }
}
// 激活 slide page index 更新
export const activeSlidePageIndex = ( { dispatch }, index) => {
  dispatch('ACTIV_SLIDE_PAGE_INDEX', index);
}

// Slide page 增加，删除，复制，移动

export const addSlidePage = ({ dispatch }) => {
  dispatch('ADD_SLIDE_PAGE')
}
export const delSlidePage = ({ dispatch, state }, index) => {
  if( state.slide.pages.length <= 1) return;
  dispatch('DEL_SLIDE_PAGE', index)
}
export const copySlidePage = ({ dispatch, state }, index) => {
  dispatch('COPY_SLIDE_PAGE', index)
}