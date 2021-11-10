import { useState, useEffect, userCallback } from 'react'
import { getBlog } from '../../db/data/query'
import CommentForm from '../../components/Form/Comment'

export default function BlogDetails({ props }) {
  const [blog, setBlog] = useState(props)

  useEffect(() => setBlog(blog), [])

  return (
    <div className="container mx-auto">
      <p>{blog.title}</p>
      <p>{blog.body}</p>
      <p>{blog.type}</p>
      <h2 className='text-3xl'>Comments</h2>
      <hr />
      {
        blog.comments.reverse().map(({ id, comment }) => (
          <p key={id}>{comment}</p>
        ))
      }
      <CommentForm setBlog={setBlog} blogId={props.id} />
    </div>
  )
}

BlogDetails.getInitialProps = async (context) => {
  const { query: { blogId } } = context
  const blog = await getBlog(blogId)
  return {
    props: blog,
    header: {
      title: `SiteWrite | ${blog.title}`,
      description: blog.body,
    },
  }
}