import { FC, useEffect } from 'react'
import { SignInForm } from '../../Modules/SignInForm'
import './signIn.less'
import ApiAuth from '../../Api/auth'

const SignIn: FC = () => {
  const auth = new ApiAuth()
  auth.login({ login: 'burdenkof@yandex.ru', password: '12345' })
  return (
    <div className="wrapper">
      <SignInForm />
    </div>
  )
}

export default SignIn
