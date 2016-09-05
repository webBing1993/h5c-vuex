// 更新 h5 id
export const updateId = ({ dispatch }, id) => {
    if (id) {
      dispatch('UPDATE_ID', id)
    }
  }
  // 激活 slide page index 更新
export const activeSlidePageIndex = ({ dispatch }, index) => {
  dispatch('ACTIV_SLIDE_PAGE_INDEX', index);
}

// Slide page 增加，删除，复制，移动

export const addSlidePage = ({ dispatch }) => {
  dispatch('ADD_SLIDE_PAGE')
}
export const delSlidePage = ({ dispatch, state }, index) => {
  if (state.slide.pages.length <= 1) return;
  dispatch('DEL_SLIDE_PAGE', index)
}
export const copySlidePage = ({ dispatch, state }, index) => {
  dispatch('COPY_SLIDE_PAGE', index)
}

export const updateActivePageTitle = ({ dispatch }, e, flag) => {
  dispatch({
    type: 'UPDATE_ACTIVE_PAGE_TILTE',
    silent: !flag,
    payload: {
      value: e.target.value
    }
  })
}

export const updateActivePageBackgroundColor = ({ dispatch }, color) => {
  dispatch({
    type: 'UPDATE_ACTIVE_PAGE_BACKGROUND_COLOR',
    silent: true,
    payload: {
      value: color.hex
    }
  })
}

export const updateActivePageImage = ({ dispatch }, img) => {
  dispatch({
    type: 'UPDATE_ACTIVE_PAGE_IMAGE',
    silent: false,
    payload: {
      value: img
    }
  })
}

export const updateActiveComp = ({ dispatch }, type) => {
  let config = {};
  switch (type) {
    case 'page':
      config = {
        type: 'hy-page'
      }
      break;
    case 'text':
      config = {
        type: 'hy-text',
        text: '请输入文本',
        active: false,
        isShowView: true,
        isShowEdit: true,
        isShowAnimate: false,
        animate: {
          name: "none",
          duration: 1,
          delay: 0
        },
        position: {
          left: 60,
          top: 200,
          width: 200,
          height: 24,
          transform: 0
        },
        style: {
          fontFamily: 'Microsoft Yahei',
          fontSize: '16px',
          color: '#000000',
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'normal',
          textAlign: 'center',
          lineHeight: 1.5
        }
      }
      break;
  }
  dispatch({
    type: 'UPDATE_ACTIVE_COMP',
    silent: false,
    payload: {
      type: type,
      config: config
    }
  })
}

export const changeActiveComp = ({ dispatch }, config) => {
  dispatch({
    type: 'CHANGE_ACTIVE_COMP',
    silent: false,
    payload: {
      config: config
    }
  })
}
