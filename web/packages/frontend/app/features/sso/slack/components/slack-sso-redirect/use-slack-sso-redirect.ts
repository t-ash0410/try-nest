import { gql, useQuery } from '@apollo/client/index.js'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { localStorageKeys, pagePaths } from '~/consts'
import { handleError } from '~/util/handle-error'

const getSlackSsoResult = gql`
  query GetSession($code: String!, $session: String!) {
    session(code: $code, session: $session) @rest(type: "Session", path: "auth/oidc/slack") {
      slackTeamId
    }
  }
`

export function useSlackSSORedirect() {
  const nav = useNavigate()

  const [params] = useSearchParams()
  const code = params.get('code')
  const state = params.get('state')

  const { data, error, loading } = useQuery(getSlackSsoResult, {
    variables: {
      code,
      state,
    },
  })

  useEffect(() => {
    if (loading) return
    if (error) {
      handleError(new Error('サインインに失敗しました'))
      nav(pagePaths.public.root.path)
      return
    }
    if (data.slackTeamId) {
      localStorage.setItem(localStorageKeys.SLACK_TEAM_ID, data.slackTeamId)
    }
    nav(pagePaths.authorized.tickets.path)
  }, [nav, data, error, loading])
}
