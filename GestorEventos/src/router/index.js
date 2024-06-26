import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ConcertDetails from '../views/ConcertDetailView.vue';
import ConcertsView from '../views/ConcertsView.vue';
import RegisterView from '@/views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/concerts/:id',
      name: 'ConcertDetails',
      component: ConcertDetails
    },
    {
      path: '/concerts',
      name: 'Concerts',
      component: ConcertsView
    },
    {
      path:'/register',
      name: 'Register',
      component: RegisterView
    }
    
  ]
})

export default router
