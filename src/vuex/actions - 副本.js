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

export const updateSideMusic = ({ dispatch }, music) => {
  dispatch({
    type: 'UPDATE_SLIDE_MUSIC',
    silent: false,
    payload: {
      music: music
    }
  })
}

export const updateActiveComp = ({ dispatch }, type, data) => {
  let config = {};
  switch (type) {
    case 'page':
      config = {
        type: 'hy-page'
      }
      break;
    case 'music':
      config = {
        type: 'hy-music'
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
          fontSize: 16,
          color: '#000000',
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'normal',
          textAlign: 'center',
          lineHeight: 1.5
        }
      }
      break;
    case 'image':
      config = {
        type: 'hy-image',
        active: true,
        isShowView: true,
        isShowEdit: true,
        imgSrc: data,
        isShowAnimate: false,
        animate: {
          name: "none",
          duration: 1,
          delay: 0
        },
        zIndex: 0,
        position: {
          left: 60,
          top: 100,
          width: 200,
          height: 'auto',
          transform: 0
        },
        style: {
          opacity: 1,
          borderRadius: 0,
          boxShadow: 0,
        }
      }
      break;
    case 'form':
      config = {
        type: 'hy-form',
        active: false,
        isShowView: true,
        isShowEdit: true,
        isShowAnimate: false,
        btn: {
          text: '提交',
        },
        feedback: {
          text: '提交成功！感谢你的参与'
        },
        list: data,
        animate: {
          name: "none",
          duration: 1,
          delay: 0
        },
        position: {
          left: 0,
          top: 0,
          width: 280,
          height: 340,
          transform: 0
        },
        style: {
          backgroundColor: '#ffffff',
          borderWidth: 0,
          borderColor: '#cccccc',
          borderStyle: 'solid',
          borderRadius: 0,
          opacity: 1,
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'normal',
          textAlign: 'center'
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

export const changeActiveComp = ({ dispatch }, config, flag) => {
  dispatch({
    type: 'CHANGE_ACTIVE_COMP',
    silent: !flag,
    payload: {
      config: config
    }
  })
}

export const changeActiveCompFix = ({ dispatch }, config, flag) => {
  dispatch({
    type: 'CHANGE_ACTIVE_COMP_FIX',
    silent: !flag,
    payload: {
      config: config
    }
  })
}

export const activeComp = ({ dispatch }, comp, index, flag) => {
  dispatch({
    type: 'ACTIVE_COMP',
    silent: !flag,
    payload: {
      comp: comp,
      index: index
    }
  })
}