import { Head, Link } from '@inertiajs/react'
import { LucidePlus } from 'lucide-react'
import { ReactElement } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger } from '~/components/ui/select'
import { DashboardLayout } from '~/layouts/dashboard_layout'

export default function EventsList(): ReactElement {
  return (
    <div>
      <Head title="Events" />

      <header className="flex flex-col gap-2">
        <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
          <h3 className="flex-1 text-lg font-semibold">List of Events</h3>
          <Button asChild variant="default">
            <Link href="/dashboard/events/create" className="btn btn-primary">
              <LucidePlus className="size-5" />
              Create Event
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-2 md:flex-row">
          <Input type="search" name="search" placeholder="Search events..." className="flex-1" />

          <Select name="status">
            <SelectTrigger className="min-w-56 flex-1 md:flex-grow-0">All Status</SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
    </div>
  )
}

EventsList.layout = (page: ReactElement) => <DashboardLayout title="Events">{page}</DashboardLayout>
