import { useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import { getBlog, updateBlog } from '../../../db/data/query'
import { BlogForm, Alert } from '../../../components'

export default function EditBlog({ blog }) {
  const [showAlert, setShowAlert] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  const handleSubmit = async (data, e) => {
    e.preventDefault()

    try {
      await updateBlog(blog.id, data)
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
        <h1 className="text-5xl leading-normal mb-8">Edit: {blog.title}</h1>
        <BlogForm onSubmit={handleSubmit} blog={blog} />
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
  const blog = await getBlog(context.params.blogId)
  return {
    props: {
      blog,
      header: {
        title: 'SiteWrite | Edit Blog',
        description: 'Edit blog'
      }
    }
  }
}