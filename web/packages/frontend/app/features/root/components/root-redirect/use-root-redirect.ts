import { gql, useQuery } from '@apollo/client/index.js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { pagePaths } from '~/consts'
import { handleError } from '~/util/handle-error'

const getSession = gql`
  query {
    session @rest(type: "Session", path: "auth/session") {
      userId
    }
  }
`

const useRootRedirect = () => {
  const nav = useNavigate()

  const { data, loading, error } = useQuery(getSession)

  useEffect(() => {
    if (loading) return
    if (error) {
      handleError(new Error('エラーが発生しました'))
      return
    }
    if (data.status === 401) {
      nav(pagePaths.public.signin.path)
      return
    }
    nav(pagePaths.authorized.tickets.path)
  }, [nav, data, loading, error])
}

export { useRootRedirect }
