import Vue from 'vue'
import Router from 'vue-router'
import Properties from './views/Properties'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'properties',
            meta: { layout: 'properties' },
            component: Properties
        },
        {
            path: '/browser',
            name: 'browser',
            component: () => import('./views/Browser.vue')
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login')
        },
        {
            path: '/signup',
            name: 'signup',
            component: () => import('./views/Signup')
        },
    ]
})
