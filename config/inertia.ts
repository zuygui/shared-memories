import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'
import { getToastFromSession } from '../extensions/session.js'
import type User from '#models/user'
import { ModelAttributes } from '@adonisjs/lucid/types/model'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    user: (ctx) => ctx.auth?.user,
    errors: (ctx) => ctx.session?.flashMessages.get('errorsBag'),
    flash: (ctx) => getToastFromSession(ctx.session),
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: false,
    entrypoint: 'inertia/app/ssr.tsx',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {
    user: ModelAttributes<User> | null
    [key: string]: any // This line adds the index signature
  }
}
