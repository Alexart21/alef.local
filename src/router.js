import {createRouter, createWebHistory} from 'vue-router'

import Index from '@/components/pages/Index';
import Result from '@/components/pages/Result';
import E404 from '@/components/pages/E404';
const routes = [
  {
    name: 'index',
    path: '/',
    component: Index
  },
  {
    name: 'result',
    path: '/result',
    component: Result
  },
  {
    path: '/:any(.*)', // .*
    component: E404
  }
];

export default createRouter({
  routes,
  history: createWebHistory(),
});
