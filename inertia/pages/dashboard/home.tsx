import { SharedProps } from '@adonisjs/inertia/types'
import { Head, Link, usePage } from '@inertiajs/react'
import { ReactElement } from 'react'

export default function DashboardHome(): ReactElement {
  const { user } = usePage<SharedProps>().props

  if (!user) {
    return <span>Loading...</span>
  }

  return (
    <div>
      <Head title="Dashboard" />
      <h1>Welcome to your Dashboard, {user.fullName}!</h1>
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