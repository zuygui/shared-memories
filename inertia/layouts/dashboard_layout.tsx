import { PropsWithChildren, ReactElement } from 'react'

import { DashboardSidebar } from '~/components/partials/dashboard_sidebar'
import { Button } from '~/components/ui/button'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar'
import { DefaultLayout } from './default_layout'

export function DashboardLayout(props: PropsWithChildren<{ title: string }>): ReactElement {
  return (
    <DefaultLayout>
      <SidebarProvider>
        <div className="flex h-screen w-full flex-row overflow-hidden">
          <DashboardSidebar />
          <SidebarInset className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <header>
              <div className="flex h-full flex-col justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-row items-center gap-4 p-4">
                    <Button asChild variant="ghost" size="icon">
                      <SidebarTrigger />
                    </Button>
                    <h1 className="text-2xl font-semibold">{props.title}</h1>
                  </div>
                </div>
              </div>
            </header>

            <main>
              <div className="mx-auto p-4 lg:p-8">{props.children}</div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </DefaultLayout>
  )
}
