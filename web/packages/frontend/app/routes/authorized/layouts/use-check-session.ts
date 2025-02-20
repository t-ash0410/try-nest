import { useQuery } from '@apollo/client/index'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { gql } from '~/__generated__'
import { pagePaths } from '~/consts'

const GET_SESSION = gql(`
  query GetSession {
    session {
      userId
    }
  }
`)

const useCheckSession = () => {
  const nav = useNavigate()

  const { loading, error } = useQuery(GET_SESSION)

  useEffect(() => {
    if (loading) return
    if (error) {
      nav(pagePaths.public.signin.path)
      return
    }
  }, [nav, loading, error])
}

export { useCheckSession }
