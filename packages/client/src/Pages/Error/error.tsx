import React, { FC } from 'react'
import './error.less'

type TErrorCode = 404 | 500

type TErrorProps = {
  code: TErrorCode
}

const Error: FC<TErrorProps> = ({ code }) => (
  <div className="wrapper">Error {code} page</div>
)
export default Error
