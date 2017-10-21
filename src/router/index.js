import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 路由懒加载
const recommend = () => import('components/recommend/recommend')
const singer = () => import('components/singer/singer')
const rank = () => import('components/rank/rank')
const search = () => import('components/search/search')
const singerDetail = () => import('components/singer-detail/singer-detail')
const disc = () => import('components/disc/disc')
const topList = () => import('components/top-list/top-list')
const userCenter = () => import('components/user-center/user-center')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'recommend'
    },
    {
      path: '/recommend',
      component: recommend,
      children: [
        {
          path: ':id',
          component: disc
        }
      ]
    },
    {
      path: '/singer',
      component: singer,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: rank,
      children: [
        {
          path: ':id',
          component: topList
        }
      ]
    },
    {
      path: '/search',
      component: search,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/user',
      component: userCenter
    }
  ]
})
