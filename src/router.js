import Vue from 'vue'
import Router from 'vue-router'
import Properties from './views/Properties'

Vue.use(Router)

const routes = [
    { path: '/', name: 'index', meta: { layout: 'properties' }, component: Properties },
    { path: '/browser', name: 'browser', component: () => import('./views/Browser.vue') },
    { path: '/about', name: 'about', component: () => import('./views/About.vue') },
    { path: '/user', name: 'user', component: () => import('./views/EmptyForNested'),
        children: [
            { path: 'login', name: 'user.login', component: () => import('./views/user/Login') },
            { path: 'signup', name: 'user.signup', component: () => import('./views/user/Signup') },
            { path: 'profile', name: 'user.profile', component: () => import('./views/user/Profile') },
        ]
    },

]

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
})
