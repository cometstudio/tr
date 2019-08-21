import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import { defaultState } from './defaults'

Vue.use(Vuex)

export const store = () => new Vuex.Store({
    getters,
    actions,
    mutations,
    state: defaultState(),
});

export default store();
