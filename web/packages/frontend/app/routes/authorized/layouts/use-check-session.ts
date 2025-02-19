import { gql, useQuery } from '@apollo/client/index.js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { pagePaths } from '~/consts'

const GET_SESSION = gql`
  query GetSession {
    getSession {
      userId
    }
  }
`

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
