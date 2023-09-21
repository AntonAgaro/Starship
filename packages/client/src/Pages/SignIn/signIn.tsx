import { FC } from 'react'
import { SignInForm } from '../../Modules/SignInForm'
import './signIn.less'

const SignIn: FC = () => {
  return (
    <div className="wrapper">
      <SignInForm />
    </div>
  )
}

export default SignIn
