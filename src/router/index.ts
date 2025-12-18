import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../pages/Home.vue'
// import ShowDetails from '../pages/ShowDetails.vue'

const routes = [
   {
    meta: {
      title: 'Home'
    },
    path: '/',
    name: 'home',
    component: () => import('../pages/Home.vue')
  },
 {
    path: '/show/:id',
    name: 'ShowDetails',
    component: () => import('../pages/ShowDetails.vue'),
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
