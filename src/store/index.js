import Vue from 'vue'
import Vuex from 'vuex'
import article from './modules/article.js'
Vue.use(Vuex)

import axios from 'axios'
import {baseUrl} from '../utils/config.js'
export function createStore () {
	return new Vuex.Store({
    modules: {
      article
    },
		state: {
			userInfo: ''
		},
		actions: {
			getUserInfo ({ commit }) {
				return axios.get(`${baseUrl}/api/user`, {timeout: 3000}).then(res => {
					commit('setUserInfo', res.data)
				}).catch(err => console.log(err))
			}
		},
		mutations: {
			setUserInfo (state, res) {
				state.userInfo = res
			}
		}
	})
}
