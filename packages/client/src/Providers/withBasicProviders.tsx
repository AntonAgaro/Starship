import { ComponentType, PropsWithChildren } from 'react'

type ProviderFunction = ({ children }: PropsWithChildren) => JSX.Element

export const withBasicProviders =
  (...providers: ProviderFunction[]) =>
  (WrappedComponent: ComponentType) =>
  <P extends JSX.IntrinsicAttributes>(props: P) =>
    providers.reduceRight((acc, Provider) => {
      return <Provider>{acc}</Provider>
    }, <WrappedComponent {...props} />)

export default withBasicProviders
