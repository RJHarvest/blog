import Head from 'next/head'

export default function Header({ props }) {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name='title' content={props.title} />
      <meta name='description' content={props.description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:url" content="https://rj-blog.herokuapp.com" />
      <meta property="og:site_name" content="SiteWrite | A simple blog site" />
      <meta name="twitter:card" content="summary" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}