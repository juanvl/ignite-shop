import '../common/styles/globals.css'

import { AppProps } from 'next/app'
import Image from 'next/image'

import logo from '../common/assets/logo.svg'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen flex-col items-start justify-center ">
      <header className="my-0 mx-auto w-full max-w-[1180] py-8">
        <Image src={logo} alt="Ignite shop logo" />
      </header>

      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
