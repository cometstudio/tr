import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    { path: '/', name: 'index', component: () => import('./views/Index') },
    { path: '/browser', name: 'browser', component: () => import('./views/Browser.vue') },
    { path: '/about', name: 'about', component: () => import('./views/About.vue') },
    { path: '/messenger', name: 'messenger', meta: { layout: 'messenger' }, component: () => import('./views/Messenger') },
    { path: '/sdc', name: 'sdc', component: () => import('./views/EmptyForNested'),
        children: [
            { path: 'logins', name: 'sdc.logins', component: () => import('./views/sdc/Logins') },
            { path: 'logins/:id', name: 'sdc.login', component: () => import('./views/sdc/Login') },
        ]
    },
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
