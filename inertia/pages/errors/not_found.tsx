import { Head } from '@inertiajs/react'

export default function NotFound() {
  return (
    <>
      <Head title="Page not found" />
      <div className="container">
        <div className="title">Page not found</div>

        <span>This page does not exist.</span>
      </div>
    </>
  )
}
