import * as types from '../mutation-types'
import {setModule, getModule} from 'common/js/cache'

const app = {
  state: {
    opened: true,
    currentModule: getModule()
  },
  mutations: {
    [types.SET_TOGGLE_SIDEBAR] (state) {
      state.opened = !state.opened
    },
    [types.SET_CURRENT_USER] (state, module) {
      state.currentModule = module
    }
  },
  actions: {
    toggleSideBar ({ commit }) {
      commit(types.SET_TOGGLE_SIDEBAR)
    },
    changeModule ({commit}, module) {
      commit(types.SET_CURRENT_USER, module)
      setModule(module)
    }
  }
}

export default app
