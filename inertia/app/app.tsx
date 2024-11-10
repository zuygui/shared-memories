/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import '@fontsource/inter'
import { createInertiaApp } from '@inertiajs/react'
import React, { ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '~/components/theme_provider'
import { DefaultLayout } from '~/layouts/default_layout'
import '../css/app.css'

const appName = import.meta.env.VITE_APP_NAME || 'SharedMemories'

interface ImportedPage {
  default: ReactElement & {
    layout?: (p: ReactElement) => ReactElement
  }
}

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: async (name) => {
    const currentPage = await resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob<ImportedPage>('../pages/**/*.tsx')
    )

    currentPage.default.layout ||= (p) => <DefaultLayout>{p}</DefaultLayout>

    return currentPage
  },

  setup({ el, App, props }) {
    createRoot(el).render(
      <React.StrictMode>
        <ThemeProvider defaultTheme="system" storageKey="sharedmemories-theme">
          <App {...props} />
        </ThemeProvider>
      </React.StrictMode>
    )
  },
})
