import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import _20 from './modules/_20'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    _20
  },
  getters
});

export default store
