import { useNavigate } from 'react-router'
import { pagePaths } from '~/consts'

const useSignout = () => {
  const nav = useNavigate()
  const handleSignout = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/session`, {
      method: 'DELETE',
    })
    nav(pagePaths.public.signin.path)
  }
  return { handleSignout }
}

export { useSignout }
