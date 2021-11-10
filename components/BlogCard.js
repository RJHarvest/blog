import Link from 'next/link'
import { getTagColor, formatDate } from '../shared/utils'

export default function BlogCard({ blog }) {
  const { id, title, body, type, createdAt } = blog
  const tagColor = getTagColor(type)
  return (
    <div className="max-w-4xl px-10 py-6 mx-auto mt-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <span className="font-light text-gray-600">{formatDate(createdAt)}</span>
        <Link href={`/blog?type=${type}`}><a className={`${tagColor} px-2 py-1 font-bold capitalize text-black-100 rounded`}>{type}</a></Link>
      </div>
      <div className="mt-2">
        <Link href={`/blog/${id}`}>
          <a className="capitalize text-2xl font-bold text-gray-700 hover:underline">{title}</a>
        </Link>
        <p className="mt-2 text-gray-600">{body}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <Link href={`/blog/${id}`}>
          <a className="text-blue-500 hover:underline">Read more</a>
        </Link>
          <div>
            <a href="#" className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"
                alt="avatar"
                className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
              />
              <h1 className="font-bold text-gray-700 hover:underline">Alex John</h1>
            </a>
          </div>
      </div>
    </div>
  )
}