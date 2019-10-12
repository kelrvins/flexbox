import Vue, { AsyncComponent as Async } from 'vue'
import Router from 'vue-router'

const flex: Async = (): any => import('./views/flex.vue')
const grid: Async = (): any => import('./views/grid.vue')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: '/',
  routes: [
    {
      path: '/',
      redirect: '/flex'
    },
    {
      path: '/flex',
      name: 'flex',
      component: flex
    },
    {
      path: '/grid',
      name: 'grid',
      component: grid
    }
  ]
})
