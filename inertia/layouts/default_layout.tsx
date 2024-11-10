import { Head } from '@inertiajs/react'
import { HTMLAttributes, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

interface DefaultLayoutProps extends HTMLAttributes<HTMLDivElement> {}

export function DefaultLayout({ children, className, ...props }: DefaultLayoutProps): ReactElement {
  return (
    <div
      className={twMerge(
        'min-h-screen overflow-auto bg-background px-4 text-foreground',
        className
      )}
      {...props}
    >
      <Head>
        <meta head-key="description" name="description" content="Shared Memories" />
      </Head>
      {children}
    </div>
  )
}
