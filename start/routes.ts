/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { HttpContext } from '@adonisjs/core/http'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('../app/controllers/auth_controller.js')

router.get('/', ({ response }: HttpContext) => response.redirect().toRoute('dashboard.home'))

router
  .group(() => {
    router.on('/').renderInertia('dashboard/home').as('home')
  })
  .middleware(middleware.auth())
  .prefix('dashboard')
  .as('dashboard')

router
  .group(() => {
    router.get('/login', [AuthController, 'login']).as('login')
    router.post('/login', [AuthController, 'loginPost']).as('loginPost')

    router.get('/logout', [AuthController, 'logout']).as('logout')
  })
  .prefix('auth')
  .as('auth')
