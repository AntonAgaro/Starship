import React, { FC } from 'react'
import './error.less'
import NotFound from '../../Components/NotFound/notFound'

type TErrorCode = 404 | 500

type TErrorProps = {
  code: TErrorCode
}

const Error: FC<TErrorProps> = ({ code }) => {
  return (
    <div className="wrapper">
      {code === 404 ? (
        <NotFound />
      ) : (
        <div className="wrapper">Error {code} page</div>
      )}
    </div>
  )
}
export default Error
