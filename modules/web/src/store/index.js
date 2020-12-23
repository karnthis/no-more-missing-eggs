import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function setDefaultState () {
  return {
    activeSession: false,
    activeKitchen: {},
    token: '',
    firstName: '',
    lastName: '',
    username: '',
    userId: null,
    email: '',
    kitchenIds: [],
    apiUrl: 'http://localhost:3000/api'
  }
}

export default new Vuex.Store({
  state: setDefaultState,
  mutations: {
    resetState (state) {
      localStorage.clear()
      Object.assign(state, setDefaultState())
    },
    setLoggedIn (state, value) {
      state.activeSession = true
      state.token = value.access_token
      state.firstName = value.userInfo.firstName
      state.lastName = value.userInfo.lastName
      state.username = value.userInfo.username
      state.userId = Number(value.userInfo.id)
      state.email = value.userInfo.email
      state.kitchenIds = value.kitchenIds
    },
    setActiveSession (state, value) {
      state.activeSession = value
      localStorage.setItem('activeSession', value)
    },
    setToken (state, value) {
      state.token = value
      localStorage.setItem('token', value)
    },
    setName (state, value) {
      state.firstName = value.firstName
      state.lastName = value.lastName
      localStorage.setItem('firstName', value.firstName)
      localStorage.setItem('lastName', value.lastName)
    },
    setUsername (state, value) {
      state.username = value
      localStorage.setItem('username', value)
    },
    setUserId (state, value) {
      state.userId = Number(value)
      localStorage.setItem('userId', value)
    },
    setKitchenIds (state, value) {
      state.kitchenIds = value
      try {
        localStorage.setItem('kitchenIds', JSON.stringify(value))
      } catch (err) {
        console.dir(err)
      }
    },
    addKitchenId (state, value) {
      state.kitchenIds.push(value)
      try {
        localStorage.setItem('kitchenIds', JSON.stringify(state.kitchenIds))
      } catch (err) {
        console.dir(err)
      }
    },
    setEmail (state, value) {
      state.email = value
      localStorage.setItem('email', value)
    }
  },
  getters: {
    getAuthedFetchOptions (state) {
      return {
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.token}`
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
