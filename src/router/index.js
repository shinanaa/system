import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
            { path: '/user', component: () => import('@/views/system/user') },
            { path: '/module', component: () => import('@/views/system/module') },
            { path: '/plugin', component: () => import('@/views/system/plugin') },
            { path: '/role', component: () => import('@/views/system/role') },
            { path: '/log', component: () => import('@/views/system/log') },
            { path: '/unit', component: () => import('@/views/system/unit') },
            { path: '/notice', component: () => import('@/views/system/notice') }
          ]
        }
      ]
    }
  ]
})
