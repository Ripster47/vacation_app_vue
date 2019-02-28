import Vue from 'vue'
import Router from 'vue-router'
import ListIndex from './views/ListIndex.vue'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'
import ListShow from './views/ListShow.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'sign-up', component: SignUp },
    { path: '/login', name: 'login', component: Login },
    { path: '/lists', name: 'lists-index', component: ListIndex },
    { path: '/lists/:id', name: 'lists-show', component: ListShow }
  ]

})