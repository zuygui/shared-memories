import { router, usePage } from '@inertiajs/react'

export function useForm() {
  const { errors } = usePage().props

  return {
    errors: errors || {},
    post: router.post.bind(router),
    put: router.put.bind(router),
    delete: router.delete.bind(router),
  }
}
