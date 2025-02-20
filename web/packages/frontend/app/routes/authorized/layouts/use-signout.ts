import { useMutation } from '@apollo/client/index'
import { useNavigate } from 'react-router'
import { gql } from '~/__generated__'
import { pagePaths } from '~/consts'

const DELETE_SESSION = gql(`
  mutation DeleteSession {
    deleteSession {
      userId
    }
  }
`)

const useSignout = () => {
  const nav = useNavigate()
  const [deleteSession] = useMutation(DELETE_SESSION)
  const handleSignout = async () => {
    await deleteSession()
    nav(pagePaths.public.signin.path)
  }
  return { handleSignout }
}

export { useSignout }
