import { useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import { insertBlog } from '../../db/data/query'
import { BlogForm, Alert } from '../../components'

export default function CreateBlog() {
  const [showAlert, setShowAlert] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  const handleSubmit = async (data, e) => {
    e.preventDefault()

    try {
      await insertBlog(data)
      return router.push('/profile')
    } catch (err) {
      setErrorMsg(`${err.extensions.code}: ${err.message}`)
      setShowAlert(true)
    }
  }

  return (
    <div className="h-screen flex flex-col content-center justify-center flex-wrap text-center -mt-16">
      <Alert errorMsg={errorMsg} showAlert={showAlert} setShowAlert={setShowAlert} />
      <div className="container lg:px-16">
        <h1 className="text-5xl leading-normal mb-8">Create A New Blog</h1>
        <BlogForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      }
    }
  }
  return {
    props: {
      session,
      header: {
        title: 'SiteWrite | Create Blog',
        description: 'Create a new blog'
      }
    }
  }
}
