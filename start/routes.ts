/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import inertia from '@adonisjs/inertia/client'

const LoginController = () => import('../app/controllers/auth/login_controller.js')
const LogoutController = () => import('../app/controllers/auth/logout_controller.js')

router.on('/').renderInertia('home')

router
  .group(() => {
    router.get('/login', [LoginController, 'show']).as('login.show')
    router.post('/login', [LoginController, 'store']).as('login.store')

    router.post('/logout', [LogoutController, 'handle']).as('logout')
  })
  .as('auth')

router
  .on('dashboard')
  // check if user is authenticated
  .renderInertia('dashboard')
