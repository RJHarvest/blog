import Layout from '../components'
import 'tailwindcss/tailwind.css'

const categories = ['food', 'travel', 'tech', 'lifestyle']

function MyApp({ Component, pageProps }) {
  return (
    <Layout header={pageProps.header}>
      <Component {...pageProps} categories={categories} />
    </Layout>
  )
}

export default MyApp
