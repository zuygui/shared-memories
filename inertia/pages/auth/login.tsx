import hash from '@adonisjs/core/services/hash'
import { Head, Link, useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { FormControl } from '~/components/form'
// import { ThemeToggle } from "~/components/theme_toggle"
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
// import { useForm } from '~/lib/form'

export default function Login() {
  const { data, setData, processing, errors, post } = useForm({
    email: '',
    password: '',
  })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/auth/login', {})
  }

  return (
    <>
      <Head title="Login" />
      <div className="flex h-screen w-full items-center justify-center px-4 bg-background dark:bg-background">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
              <div className="grid gap-4">
                <FormControl className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="john.doe@me.com"
                    required
                  />
                </FormControl>
                <FormControl className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    required
                  />
                </FormControl>
                <Button type="submit" disabled={processing} className="w-full">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
