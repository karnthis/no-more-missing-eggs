import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function setDefaultState () {
  return {
    activeSession: false,
    token: '',
    firstName: '',
    lastName: '',
    username: '',
    userId: null,
    kitchenIds: [],
    apiUrl: 'http://localhost:3000/api'
  }
}

export default new Vuex.Store({
  state: setDefaultState,
  mutations: {
    resetState (state) {
      Object.assign(state, setDefaultState())
    },
    setActiveSession (state, value) {
      state.activeSession = value
    },
    setToken (state, value) {
      state.token = value
    },
    setName (state, value) {
      state.firstName = value.firstName
      state.lastName = value.lastName
    },
    setUsername (state, value) {
      state.username = value
    },
    setUserId (state, value) {
      state.userId = value
    },
    setKitchenIds (state, value) {
      state.kitchenIds = value
    }
  },
  actions: {
  },
  modules: {
  }
})
