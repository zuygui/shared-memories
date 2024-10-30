import { Session } from '@adonisjs/session'
import { AllowedSessionValues } from '@adonisjs/session/types'

declare module '@adonisjs/session' {
  interface Session {
    flashError(value: AllowedSessionValues): void
    flashSuccess(value: AllowedSessionValues): void
    flashWarning(value: AllowedSessionValues): void
    flashInfo(value: AllowedSessionValues): void
  }
}

Session.macro('flashError', function (this: Session, value: AllowedSessionValues) {
  this.flash('errors', [value])
})
Session.macro('flashSuccess', function (this: Session, value: AllowedSessionValues) {
  this.flash('success', [value])
})
Session.macro('flashWarning', function (this: Session, value: AllowedSessionValues) {
  this.flash('warnings', [value])
})
Session.macro('flashInfo', function (this: Session, value: AllowedSessionValues) {
  this.flash('infos', [value])
})

type ToastType = 'error' | 'warning' | 'info' | 'success'

interface Toast {
  type: ToastType
  message: string
  id: string
}

export type ToastsList = Toast[]

let count = 0

export function genToastId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

export function getToastFromSession(session: Session): ToastsList {
  const data = session.flashMessages.toObject()

  const list: ToastsList = []

  const toastTypes: ToastType[] = ['error', 'warning', 'info', 'success']

  toastTypes.forEach((type) => {
    if (data[type]) {
      list.push(convertMessage(type, data[type], genToastId()))
    }
  })

  return list
}

function convertMessage(type: ToastType, message: string, id: string): Toast {
  return {
    type,
    message,
    id,
  }
}
