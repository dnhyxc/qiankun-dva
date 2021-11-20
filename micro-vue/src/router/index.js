import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dnhyxc/vue',
    name: 'Home'
  },
  {
    path: '/dnhyxc/vue',
    name: 'Home',
    component: Home
  },
  {
    path: '/dnhyxc/vue/about',
    name: 'About',
    component: About
  },
]

export default routes