import { Provider } from 'next-auth/client'
import Layout from '../components'
import 'tailwindcss/tailwind.css'

const categories = ['food', 'travel', 'tech', 'lifestyle']

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider session={session}>
      <Layout header={pageProps.header}>
        <Component {...pageProps} categories={categories} />
      </Layout>
    </Provider>
  )
}

export default MyApp
