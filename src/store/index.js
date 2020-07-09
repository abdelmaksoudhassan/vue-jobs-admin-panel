import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth/auth'
import jobs from './jobs/jobs'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters:{
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    jobs
  }
})
