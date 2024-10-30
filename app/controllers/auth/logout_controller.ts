import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async handle({ inertia, auth }: HttpContext) {
    await auth.use('web').logout()

    return inertia.render('home')
  }
}
