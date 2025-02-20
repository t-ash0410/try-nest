import { SigninForm } from '~/features/signin'
import type { Route } from './+types/signin'

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Sign in' },
    { name: 'description', content: 'Welcome to Try Nest!' },
  ]
}

export default () => {
  return <SigninForm />
}
