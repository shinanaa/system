import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: 'portal/system/index.html',
  routes: [
    { path: '/login', component: () => import('@/components/login/login') },
    { path: '/', redirect: '/home' },
    {
      path: '/layout',
      name: 'Layout',
      component: () => import('@/components/layout/layout'),
      redirect: '/home',
      children: [
        { path: '/home', component: () => import('@/components/home/home') },
        {
          path: '/system',
          component: () => import('@/components/moduleLayout/moduleLayout'),
          redirect: '/user',
          children: [
            { path: '/user', component: () => import('@/views/system/user'), meta: {title: '用户管理'} },
            { path: '/module', component: () => import('@/views/system/module'), meta: {title: '模块管理'} },
            { path: '/plugin', component: () => import('@/views/system/plugin'), meta: {title: '功能管理'} },
            { path: '/role', component: () => import('@/views/system/role'), meta: {title: '角色管理'} },
            { path: '/log', component: () => import('@/views/system/log'), meta: {title: '日志管理'} },
            { path: '/department', component: () => import('@/views/system/department'), meta: {title: '部门管理'} },
            { path: '/notice', component: () => import('@/views/system/notice'), meta: {title: '通知公告'} }
          ]
        }
      ]
    }
  ]
})
