import type { HttpContext } from '@adonisjs/core/http'

export default class EventsController {
  async list({ inertia }: HttpContext) {
    return inertia.render('dashboard/events/list')
  }
}
