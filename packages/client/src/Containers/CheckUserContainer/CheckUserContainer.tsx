import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Layout } from 'antd'
import Loading from '../../Components/Loading/Loading'
import { RootState, store } from '../../Redux/store'
import { TProfileInfo } from '../../types'
import { asyncGetProfile, asyncOAuthLogin } from '../../Redux/user/userState'
import { RouteUrls, redirect_uri } from '../../Routes/Router'
import {} from 'react-router'
interface iCheckUserContainerProps {
  children: JSX.Element
}

const CheckUserContainer = (props: iCheckUserContainerProps) => {
  const { children } = props
  const [loading, setLoading] = useState(true)
  const currentProfile = useSelector(
    (rootState: RootState) => rootState.user
  ) as TProfileInfo

  const getProfile = async () => {
    await store.dispatch(asyncGetProfile())
    setLoading(false)
  }

  useEffect(() => {
    const asyncDispatch = async () => {
      const code = new URLSearchParams(window.location.search).get('code')

      if (code != null) {
        try {
          await store.dispatch(asyncOAuthLogin({ code, redirect_uri }))
        } catch (e) {
          window.location.href = redirect_uri + RouteUrls.signIn
        }
      } else {
        getProfile()
      }
    }

    asyncDispatch()
  }, [])

  if (loading && !currentProfile) {
    return (
      <Layout
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#23252B',
        }}>
        <Loading>Загрузка...</Loading>
      </Layout>
    )
  }

  return <>{children}</>
}

export default CheckUserContainer
