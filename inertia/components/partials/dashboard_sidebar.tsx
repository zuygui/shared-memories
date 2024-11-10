import { SharedProps } from '@adonisjs/inertia/types'
import { Link, usePage } from '@inertiajs/react'
import {
  ChevronDown,
  LucideGalleryVerticalEnd,
  LucideHome,
  LucideIcon,
  LucideLogOut,
} from 'lucide-react'
import { PropsWithChildren, ReactElement } from 'react'
import { Button } from '../ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar'

type MenuItemProps = PropsWithChildren<{
  href: string
  title: string
  exact?: boolean
  icon: LucideIcon
}>

function MenuItem({ href, title, exact, icon: Icon, children }: MenuItemProps): ReactElement {
  const { url } = usePage()
  const { state } = useSidebar()

  const active = exact ? url === href : url.startsWith(href)
  return (
    <SidebarMenuButton asChild isActive={active} variant="default">
      <Link href={href}>
        <Icon className="size-5" />

        {state === 'expanded' && (
          <>
            {title}

            {children && <ChevronDown />}
          </>
        )}
      </Link>
    </SidebarMenuButton>
  )
}

export function DashboardSidebar(): ReactElement {
  const { user } = usePage<SharedProps>().props

  if (!user) {
    return <span>Loading...</span>
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <LucideGalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Shared Memories</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <MenuItem href="/dashboard" title="Home" icon={LucideHome} exact />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex flex-row items-center justify-end px-2">
                <span className="flex-1">{user.fullName}</span>
                <Button asChild variant="ghost" size="icon">
                  <Link href="/auth/logout">
                    <LucideLogOut className="ml-2 size-5" />
                    <span className="sr-only">Logout</span>
                  </Link>
                </Button>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
