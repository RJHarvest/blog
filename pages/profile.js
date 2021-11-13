import { useState, useEffect } from 'react'
import { getSession, useSession } from 'next-auth/client'
import Link from 'next/link'
import { getProfile } from '../db/data/query'
import { ProfileBlogCard } from '../components'

export default function Profile() {
  const [session] = useSession()
  const [profile, setProfile] = useState({})
  const [blogs, setBlogs] = useState([])

  useEffect(async () => {
    const user = await getProfile(session.user.uid)
    setProfile(user)
    setBlogs(user.blogs)
  }, [])

  return (
    <div>
      <section className="relative block" style={{ height: '400px' }}>
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')" }}
        >
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: "translateZ(0px)" }}>
          <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      <section className="relative pt-16 pb-4 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-2 lg:px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 lg:order-2 flex justify-center">
                  <div className="relative h-48 w-48 lg:h-56 lg:w-56">
                    <img src={profile.imageUrl} className="shadow-xl rounded-full h-full align-middle border-none absolute -mt-24 max-w-150-px" />
                  </div>
                </div>
              </div>
              <div className="-mt-12">
                <div className="text-center">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {profile.name}
                  </h3>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{profile.blogs && profile.blogs.length}</span>
                    <span className="text-sm text-blueGray-400">Blogs</span>
                  </div>
                  <Link href='/blog/create'>
                    <button className="mt-3 bg-green-400 active:bg-green-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-3 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                      Create New Blog
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                  {
                    blogs.map(blog => (
                      <ProfileBlogCard key={blog.id} blog={blog} />
                    ))
                  }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
        title: 'SiteWrite | Profile',
        description: 'User Profile'
      }
    }
  }
}