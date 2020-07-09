import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:()=>import('../views/login/login'),
    name:'login',
    meta:{
      ifNotAuth:true
    }
  },
  {
    path:'/signup',
    component:()=>import('../views/signup/signup'),
    name:'signup',
    meta:{
      ifNotAuth:true
    }
  },
  {
    path:'/panel',
    component:()=>import('../views/panel/panel'),
    name:'panel',
    meta:{
      requireAuth:true
    }
  },
  {
    path:'*',
    redirect:'/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  const user = JSON.parse(localStorage.getItem('adminData'))
  if(to.matched.some(route=>route.meta.requireAuth)){
    if(user){
      next()
      return
    }
    next('/login')
    return
  }else if(to.matched.some(route=>route.meta.ifNotAuth)){
    if(!user){
      next()
      return
    }
    next('/panel')
    return
  }
  next()
})

export default router