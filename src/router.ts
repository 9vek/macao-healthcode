import { createRouter, createWebHistory } from "vue-router";
import ReportForm from './views/ReportForm.vue'
import ResultPage from './views/ResultPage.vue'

const webHistory = createWebHistory()

const router = createRouter({
  history: webHistory,
  routes: [
    {
      path: '/',
      component: ReportForm,
    }, 
    {
      path: '/result',
      component: ResultPage,
    }, 
  ] 
})

export default router