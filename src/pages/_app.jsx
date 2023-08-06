import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>slf-auth</title>
        <meta name="description" content="slf-auth" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
