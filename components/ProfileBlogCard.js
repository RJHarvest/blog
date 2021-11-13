import Link from 'next/link'
import { getTagColor, formatDate } from '../shared/utils'

export default function ProfileBlogCard({ blog }) {
  const { id, title, body, type, createdAt } = blog
  return (
    <Link href={`/blog/edit/${id}`}>
      <div className="group max-w-4xl px-10 py-6 mx-auto mt-6 bg-gray-100 rounded-lg shadow-md text-left cursor-pointer">
        <div className="flex items-center justify-between">
          <p>{blog.title}</p>
          <p className="hidden group-hover:block text-yellow-500">Edit</p>
        </div>
      </div>
    </Link>
  )
}