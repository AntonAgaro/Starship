import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { TProfileInfo } from '../../Redux/user/types'

type CheckAuthorizedProps = {
  children: JSX.Element
  unauthView: JSX.Element
}

const CheckAuthorized = (props: CheckAuthorizedProps) => {
  const { children, unauthView } = props
  const currentProfile = useSelector(
    (rootState: RootState) => rootState.user
  ) as TProfileInfo

  return <>{currentProfile ? children : unauthView}</>
}

export default CheckAuthorized
