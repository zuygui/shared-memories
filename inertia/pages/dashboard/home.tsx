import { SharedProps } from '@adonisjs/inertia/types'
import { Head, Link, usePage } from '@inertiajs/react'
import { ReactElement } from 'react'
import { DashboardLayout } from '~/layouts/dashboard_layout'

export default function DashboardHome(): ReactElement {
  const { user } = usePage<SharedProps>().props

  if (!user) {
    return <span>Loading...</span>
  }

  return (
    <div>
      <Head title="Dashboard" />
      <h2 className="mb-2 text-2xl font-semibold">Welcome to your Dashboard, {user.fullName}!</h2>
      <nav>
        <ul>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
          <li>
            <Link href="/auth/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

DashboardHome.layout = (page: ReactElement) => (
  <DashboardLayout title="Home">{page}</DashboardLayout>
)
