import Link from 'next/link'
import { useRouter } from 'next/router'
import { BlogCard } from '../../components'
import { getBlogs } from '../../db/data/query'
import { getTagColor, formatDate } from '../../shared/utils'

function getPages(pageCount) {
  const pages = []
  for (let i = 0; i < pageCount; i++) {
    pages.push(i+1)
  }
  return pages
}

export default function Blog({ blogs, categories, type }) {
  const router = useRouter()
  const recentBlog = blogs.docs.length > 0 && blogs.docs[0]
  const pages = getPages(blogs.pages)
  const currentPage = blogs.page
  const authors = blogs.authors

  const handlePreviousBtnOnClick = (e) => {
    e.preventDefault()
    let url = `/blog?page=${currentPage - 1}`
    if (currentPage === 1) return
    if (type) {
      url = url + `&type=${type}`
    }
    return router.push(url)
  }

  const handleNextBtnOnClick = (e) => {
    e.preventDefault()
    let url = `/blog?page=${currentPage + 1}`
    if (currentPage === pages[pages.length - 1]) return
    if (type) {
      url = url + `&type=${type}`
    }
    return router.push(url)
  }

  const handlePageButnOnClick = (pageNumber) => {
    let url = `/blog?page=${pageNumber}`
    if (type) {
      url = url + `&type=${type}`
    }
    return router.push(url)
  }

  return (
    <div className="px-6 py-8">
      <div className="container flex justify-between mx-auto">
        <div className="w-full lg:w-8/12">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-700 md:text-2xl">Blogs</h1>
            <div>
              <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option>Latest</option>
                <option>Last Week</option>
              </select>
            </div>
          </div>
          {blogs.docs.map(blog => (<BlogCard key={blog.id} blog={blog} />))}
          <div className="mt-8">
            <div className="flex">
              <a onClick={handlePreviousBtnOnClick} className={`px-3 py-2 mx-1 font-medium bg-white rounded-md ${currentPage === 1 ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer text-gray-700 hover:bg-blue-500 hover:text-white'}`}>
                Previous
              </a>
              {pages.map(page => (
                <a key={page} onClick={() => handlePageButnOnClick(page)} className={`px-3 py-2 mx-1 font-medium rounded-md cursor-pointer ${page === currentPage ? 'bg-blue-500 text-white' : 'text-gray-700 bg-white hover:bg-blue-500 hover:text-white'}`}>
                  {page}
                </a>
              ))}
              <a onClick={handleNextBtnOnClick} className={`px-3 py-2 mx-1 font-medium bg-white rounded-md ${currentPage === blogs.pages ? 'cursor-not-allowed text-gray-500' : 'cursor-pointer text-gray-700 hover:bg-blue-500 hover:text-white'}`}>
                Next
              </a>
            </div>
          </div>
        </div>
        <div className="hidden w-4/12 -mx-8 lg:block">
          <div className="px-8">
            <h1 className="mb-4 text-xl font-bold text-gray-700">Authors</h1>
            <div className="flex flex-col max-w-sm px-6 py-4 mx-auto bg-white rounded-lg shadow-md">
              <ul className="-mx-4">
                {
                  authors.map((author, index) => (
                    <li key={index} className={`flex items-center ${index === 0 ? null : 'mt-6'}`}>
                      <img
                        src={author.imageUrl}
                        alt="avatar"
                        className="object-cover w-10 h-10 mx-4 rounded-full"
                      />
                      <p>
                        <Link href={`?author=${author._id}`}><a className="mx-1 font-bold text-gray-700 hover:underline">{author.name}</a></Link>
                        <span className="text-sm font-light text-gray-700">Created {author.blogCount} Posts</span>
                      </p>
                    </li>
                  ))
                }
                <li className="flex items-center mt-6"><img
                        src="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=333&amp;q=80"
                        alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full"/>
                    <p><a href="#" className="mx-1 font-bold text-gray-700 hover:underline">Jane Doe</a><span
                            className="text-sm font-light text-gray-700">Created 52 Posts</span></p>
                </li>
                <li className="flex items-center mt-6"><img
                        src="https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=281&amp;q=80"
                        alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full"/>
                    <p><a href="#" className="mx-1 font-bold text-gray-700 hover:underline">Lisa Way</a><span
                            className="text-sm font-light text-gray-700">Created 73 Posts</span></p>
                </li>
                <li className="flex items-center mt-6"><img
                        src="https://images.unsplash.com/photo-1500757810556-5d600d9b737d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=735&amp;q=80"
                        alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full"/>
                    <p><a href="#" className="mx-1 font-bold text-gray-700 hover:underline">Steve Matt</a><span
                            className="text-sm font-light text-gray-700">Created 245 Posts</span></p>
                </li>
              </ul>
            </div>
          </div>
          <div className="px-8 mt-10">
            <h1 className="mb-4 text-xl font-bold text-gray-700">Categories</h1>
            <div className="flex flex-col max-w-sm px-4 py-6 mx-auto bg-white rounded-lg shadow-md">
              <ul>
                {categories.map((category, index) => (
                  <li className={index === 0 ? null : "mt-2"} key={index}>
                    <Link href={`?type=${category}`}>
                      <a className="mx-1 font-bold text-gray-700 capitalize hover:text-gray-600 hover:underline">
                        - {category}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="px-8 mt-10">
            <h1 className="mb-4 text-xl font-bold text-gray-700">Recent Post</h1>
            <div className="flex flex-col max-w-sm px-8 py-6 mx-auto bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center">
                <Link href="#"><a className={`${getTagColor(recentBlog.type)} px-2 py-1 text-sm capitalize rounded`}>{recentBlog.type}</a></Link>
              </div>
              <div className="mt-4">
                <Link href={`/blog/${recentBlog.id}`}>
                  <a className="text-lg font-medium text-gray-700 hover:underline">{recentBlog.title}</a>
                </Link>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <img
                    src={recentBlog.user.imageUrl}
                    alt="avatar"
                    className="object-cover w-8 h-8 rounded-full"
                  />
                  <a href="#" className="mx-3 text-sm text-gray-700 hover:underline">{recentBlog.user.name}</a>
                </div>
                <span className="text-sm font-light text-gray-600">{formatDate(recentBlog.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Blog.getInitialProps = async (context) => {
  const { query: { page, type, author } } = context
  const blogs = await getBlogs({ limit: 10, page, type, author })
  return {
    blogs,
    type,
    header: {
      title: 'SiteWrite | Blogs',
      description: 'Discover all of our blogs'
    }
  }
}
