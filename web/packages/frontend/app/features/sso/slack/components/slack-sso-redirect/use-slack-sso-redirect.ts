import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import useSWR from 'swr'
import { localStorageKeys, pagePaths } from '~/consts'
import { handleError } from '~/util/handle-error'

export function useSlackSSORedirect() {
  const nav = useNavigate()

  const [params] = useSearchParams()
  const code = params.get('code')
  const state = params.get('state')

  const qp = new URLSearchParams({
    code: code || '',
    state: state || '',
  })
  const url = `${import.meta.env.VITE_BACKEND_URL}/auth/oidc/slack?${qp}`

  const { data, error, isLoading } = useSWR(url, (url) => {
    return fetch(url, { credentials: 'include' }).then((res) => res.json())
  })
  useEffect(() => {
    if (isLoading) {
      return
    }
    if (error) {
      handleError(error)
      nav(pagePaths.public.root.path)
      return
    }
    localStorage.setItem(localStorageKeys.SLACK_TEAM_ID, data.slackTeamId)
    nav(pagePaths.authorized.tickets.path)
  }, [nav, data, error, isLoading])
}
