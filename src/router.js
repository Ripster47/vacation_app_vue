import Vue from 'vue'
import Router from 'vue-router'
import ListsIndex from './views/ListsIndex.vue'
import ListsNew from './views/ListsNew.vue'
import ListsShow from './views/ListsShow.vue'
import ListsEdit from './views/ListsEdit.vue'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'sign-up', component: SignUp },
    { path: '/login', name: 'login', component: Login },
    { path: '/logout', name: 'logout', component: Logout },
    { path: '/lists', name: 'lists-index', component: ListsIndex },
    { path: '/lists/new', name: 'lists-new', component: ListsNew },
    { path: '/lists/:id', name: 'lists-show', component: ListsShow },
    { path: '/lists/:id/edit', name: 'lists-edit', component: ListsEdit}
  ]

})