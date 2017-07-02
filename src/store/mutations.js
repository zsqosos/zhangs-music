import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, payLoad) {
    state.singer = payLoad
  }
}
export default mutations
