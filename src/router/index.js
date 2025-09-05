import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/business/Home.vue'
import Income from '@/views/business/income/Index.vue'
import Test from '@/views/business/Test.vue'
import Networking from '@/views/business/networking/Index.vue'

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
        },
        {
          path: 'networking',
          component: Networking
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
  ],
})

export default router
