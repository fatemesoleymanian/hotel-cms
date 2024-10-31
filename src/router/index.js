import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { getRole, getToken } from 'src/stores/localStorageVariables'
import { useQuasar } from 'quasar'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })
  Router.beforeEach((to, from, next) => {
    const role = getRole()
    const token = getToken()
    const needsAuth = to.meta.needsAuth
    const access = to.meta.role
    const $q = useQuasar()

    // console.error('role: '+role)
    // console.error('token: '+token)
    // console.error('needsAuth: '+needsAuth)
    // console.error('access: '+access)

    if(needsAuth === undefined) next()
    else {
      if (token == null) {
        console.error('Unauthorized access!')
        $q.notify({
          timeout: 4000,
          progress: true,
          message: 'لطفا وارد حساب کاربری خود شوید.',
          type: 'negative',
          classes: 'h4 font-medium'
        })
        next('/')

      } else{
        if(role === access) next()
          else{
            console.error('unable access!')
            $q.notify({
              timeout: 4000,
              progress: true,
              message: 'عدم دسترسی به صفحه موردنظر!',
              type: 'negative',
              classes: 'h4 font-medium'
            })
            next('/')
        }
        }
  }
  })
  return Router
})
