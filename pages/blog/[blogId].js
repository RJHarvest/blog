import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getBlog, insertComment } from '../../db/data/query'
import { CommentForm, Alert } from '../../components'

export default function BlogDetails({ props }) {
  const [blog, setBlog] = useState(props)
  const [comments, setComments] = useState(props.comments)
  const [showAlert, setShowAlert] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleCommentSubmit = async (data, e) => {
    e.preventDefault()

    try {
      await insertComment(blog.id, data.comment)
      const newBlog = await getBlog(blog.id)
      setBlog(newBlog)
      setComments(newBlog.comments.reverse())
      e.target.reset()
    } catch (err) {
      setErrorMsg(`${err.extensions.code}: ${err.message}`)
      setShowAlert(true)
    }
  }

  return (
    <div className="container mx-auto pt-10">
      <Alert errorMsg={errorMsg} showAlert={showAlert} setShowAlert={setShowAlert} />
      <div className="mb-4 md:mb-0 w-full mx-auto relative">
        <div className="px-4 lg:px-0">
          <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
            {blog.title}
          </h2>
          <Link href={`/blog?type=${blog.type}`}>
            <a className="py-2 capitalize text-green-700 inline-flex items-center justify-center mb-2">
              {blog.type}
            </a>
          </Link>
        </div>
        <img
          src="https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
          className="w-full object-cover lg:rounded"
          style={{ height: "28em" }}
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
          <p>{blog.body}</p>
        </div>
        <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
          <div className="p-4 border-t border-b border-gray-400 md:border md:rounded">
            <div className="flex py-2">
              <img src={blog.user.imageUrl}
                className="h-10 w-10 rounded-full mr-2 object-cover" />
              <div>
                <p className="font-semibold text-gray-700 text-sm">{blog.user.name}</p>
                <p className="font-semibold text-gray-600 text-xs">Editor</p>
              </div>
            </div>
            <p className="text-gray-700 py-3">
              Jeff writes about technology
              Yourself required no at thoughts delicate landlord it be. Branched dashwood do is whatever it.
            </p>
            <button className="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded">
              Follow
              <i className='bx bx-user-plus ml-2' ></i>
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="pt-10">
        <CommentForm onSubmit={handleCommentSubmit} />
      </div>
      <div className="bg-white px-8">
        <h2 className='text-3xl mb-4'>Comments ({blog.comments.length})</h2>
        {
          comments.map(({ id, comment }) => (
            <p key={id} className="pb-2">{comment}</p>
          ))
        }
      </div>
    </div>
  )
}

BlogDetails.getInitialProps = async (context) => {
  const { query: { blogId } } = context
  const blog = await getBlog(blogId)
  blog.comments = blog.comments.reverse()
  return {
    props: blog,
    header: {
      title: `SiteWrite | ${blog.title}`,
      description: blog.body,
    },
  }
}