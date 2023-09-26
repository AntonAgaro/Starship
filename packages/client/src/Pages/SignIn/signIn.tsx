import { FC, useEffect } from 'react'
import { SignInForm } from '../../Modules/SignInForm'
import './signIn.less'
import ApiAuth from '../../Api/auth'

const SignIn: FC = () => {
  return (
    <div className="wrapper">
      <SignInForm />
    </div>
  )
}

export default SignIn
