import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getBlogs, getTypeCount } from '../db/data/query'
import { formatDate } from '../shared/utils'

export default function Home({ props, categories, typeCount }) {
  const [blogs, setBlogs] = useState(props.docs)

  useEffect(() => setBlogs(props.docs), [])

  return (
    <div className="p-3 lg:p-12">
      <div className="block md:flex md:space-x-2 px-2 lg:p-0">
        <Link href="/blog">
          <a className="mb-4 md:mb-0 h-96 w-full md:w-2/3 relative rounded inline-block">
            <div className="absolute left-0 bottom-0 w-full h-full z-10" style={{ backgroundImage: "linear-gradient(180deg,transparent,rgba(0,0,0,.8))" }}></div>
            <img src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" className="absolute left-0 top-0 w-full h-full rounded z-0 object-cover" />
            <div className="p-6 absolute bottom-0 left-0 z-20">
              <span className="px-4 py-1 bg-black text-black-200 bg-green-300 inline-flex items-center justify-center mb-2">Food</span>
              <h2 className="text-4xl font-semibold text-gray-100 leading-tight">Pellentesque a consectetur velit, ac molestie ipsum. Donec sodales, massa et auctor.</h2>
              <div className="flex mt-3">
                <img src="https://randomuser.me/api/portraits/men/97.jpg" className="h-10 w-10 rounded-full mr-2 object-cover" />
                <div>
                  <p className="font-semibold text-gray-200 text-sm">Mike Sullivan</p>
                  <p className="font-semibold text-gray-400 text-xs">14 Aug</p>
                </div>
              </div>
            </div>
          </a>
        </Link>

        <Link href="/blog">
          <a className="w-full md:w-1/3 h-96 relative rounded hidden lg:block">
            <div className="absolute left-0 top-0 w-full h-full z-10" style={{ backgroundImage: "linear-gradient(180deg,transparent,rgba(0,0,0,.8))" }}></div>
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80" className="absolute left-0 top-0 w-full h-full rounded z-0 object-cover" />
            <div className="p-6 absolute bottom-0 left-0 z-20">
              <span className="px-4 py-1 bg-black text-black-200 bg-yellow-300 inline-flex items-center justify-center mb-2">Tech</span>
              <h2 className="text-3xl font-semibold text-gray-100 leading-tight">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <div className="flex mt-3">
                <img src="https://images-na.ssl-images-amazon.com/images/M/MV5BODFjZTkwMjItYzRhMS00OWYxLWI3YTUtNWIzOWQ4Yjg4NGZiXkEyXkFqcGdeQXVyMTQ0ODAxNzE@._V1_UX172_CR0,0,172,256_AL_.jpg" className="h-10 w-10 rounded-full mr-2 object-cover" />
                <div>
                  <p className="font-semibold text-gray-200 text-sm">Chrishell Staus</p>
                  <p className="font-semibold text-gray-400 text-xs">15 Aug</p>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>

      <div className="block lg:flex lg:space-x-2 px-2 lg:p-0 mt-10 mb-10">
        <div className="w-full lg:w-2/3">
        {blogs.map(blog => (
          <Link href={`/blog/${blog.id}`} key={blog.id}>
            <a className="block rounded w-full lg:flex mb-10">
              <div
                className="h-56 lg:w-56 flex-none bg-cover text-center overflow-hidden opacity-75"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80')" }}
                title="deit is very important"
              >
              </div>
              <div className="bg-white w-full rounded p-4 flex flex-col justify-between leading-normal">
                <div>
                  <div className="mt-3 md:mt-0 text-gray-700 font-bold text-2xl mb-2">{blog.title}</div>
                  <p className="text-gray-700 text-base">{blog.body}</p>
                </div>
                <div className="flex mt-3">
                  <img src={blog.user.imageUrl} className="h-10 w-10 rounded-full mr-2 object-cover" />
                  <div>
                    <p className="font-semibold text-gray-700 text-sm capitalize">{blog.user.name}</p>
                    <p className="text-gray-600 text-xs">{formatDate(blog.createdAt)}</p>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
        </div>

        <div className="w-full lg:w-1/3 px-5">
          <div className="mb-4">
            <h5 className="font-bold text-lg uppercase text-gray-700 px-1 mb-2">Popular Topics</h5>
            <ul>
              {categories.map((category, index) => {
                const colors = ["bg-green-300", "bg-indigo-300", "bg-yellow-300", "bg-blue-300"]
                return (
                  <li key={index} className="px-1 py-4 border-b border-t border-white hover:border-gray-200 transition duration-300">
                    <Link href={`/blog?type=${category}`}>
                      <a className="flex items-center capitalize text-gray-600 cursor-pointer">
                        <span className={`inline-block h-4 w-4 mr-3 ${colors[index]}`}></span>
                          {category}
                        <span className="text-gray-500 ml-auto">{typeCount[category]} articles</span>
                        <i className='text-gray-500 bx bx-right-arrow-alt ml-1'></i>
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="border border-dotted"></div>

          <div className="p-1 mt-4 mb-4">
            <h5 className="font-bold text-lg uppercase text-gray-700 mb-2">Subscribe</h5>
            <p className="text-gray-600">Subscribe to our newsletter. We deliver the best health related articles to your inbox</p>
            <input placeholder="your email address" className="text-gray-700 bg-gray-100 rounded-t hover:outline-none p-2 w-full mt-4 border" />
            <button className="px-4 py-2 bg-indigo-600 text-gray-200 rounded-b w-full capitalize tracking-wide">Subscribe</button>
          </div>

          <div className="border border-dotted"></div>
        </div>

      </div>
    </div>
  )
}

Home.getInitialProps = async () => {
  const blogs = await getBlogs({ limit: 3, page: 1 })
  const typeCount = await getTypeCount()
  return {
    typeCount,
    props: blogs,
    header: {
      title: 'SiteWrite | A simple blog site',
      description: 'A simple blog site made with Next.js'
    },
  }
}
