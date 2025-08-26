import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/business/Home.vue'
import Income from '@/views/business/Income.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/business',
      children: [
        {
          path: 'income',
          component: Income
        }
      ]
    },
  ],
})

export default router
