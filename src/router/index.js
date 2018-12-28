import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import Home from '../views/home.vue'
import Article from '../views/article.vue'

export function createRouter () {
	return new VueRouter({
		mode: 'history',
		routes: [
			{
        name: 'home',
				path: '/home',
				component: () => import('../views/home.vue')
			},
			{
        name: 'artc',
				path: '/article',
				component: () => import('../views/article.vue')
			},
			{
        name: 'detail',
				path: '/detail/:id',
				component: () => import('../views/detail.vue')
			},
			{ path: '/', redirect: '/home' }
		]
	})
}
