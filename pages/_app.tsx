import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { getSessionId } from '../utils/session'
import { getDeviceInfo } from '../utils/deviceInfo'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const sessionId = getSessionId()
    const deviceInfo = getDeviceInfo()

    console.log('Session ID:', sessionId)
    console.log('Device Info:', deviceInfo)

    // In the future, you will send this info to your backend here

  }, [])

  return <Component {...pageProps} />
}
