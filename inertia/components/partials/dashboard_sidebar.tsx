import { SharedProps } from '@adonisjs/inertia/types'
import { Link, usePage } from '@inertiajs/react'
import {
  ChevronDown,
  LucideCalendar,
  LucideGalleryVerticalEnd,
  LucideHome,
  LucideIcon,
  LucideLogOut,
  LucideMoon,
  LucideSun,
} from 'lucide-react'
import { PropsWithChildren, ReactElement, useCallback, useMemo } from 'react'
import { Theme, useTheme } from '../theme_provider'
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
    <SidebarMenuItem>
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
    </SidebarMenuItem>
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
              <MenuItem href="/dashboard" title="Home" icon={LucideHome} exact />
              <MenuItem href="/dashboard/events" title="Events" icon={LucideCalendar} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <ThemeSwitcher />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <UserLogout />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function UserLogout(): ReactElement {
  return (
    <SidebarMenuButton className="flex flex-row items-center justify-end px-2">
      <span className="flex-1">Logout</span>

      <div className="inline-flex size-10 items-center justify-center">
        <LucideLogOut className="size-4" />
        <span className="sr-only">Logout</span>
      </div>
    </SidebarMenuButton>
  )
}

function ThemeSwitcher(): ReactElement {
  const { theme, setTheme } = useTheme()

  const toggleTheme = useCallback(() => {
    setTheme((oldTheme: Theme) => (oldTheme === 'light' ? 'dark' : 'light'))
  }, [theme, setTheme])

  const LucideIcon = useMemo(() => (theme === 'light' ? LucideSun : LucideMoon), [theme])

  return (
    <SidebarMenuButton
      className="flex flex-row items-center justify-end px-2"
      onClick={toggleTheme}
    >
      <span className="flex-1">Theme</span>
      <div className="inline-flex size-10 items-center justify-center">
        <LucideIcon className="size-4" />
        <span className="sr-only">Toggle theme</span>
      </div>
    </SidebarMenuButton>
  )
}
