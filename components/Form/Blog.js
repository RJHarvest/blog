import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getBlogs, insertBlog } from '../../db/data/query'
import Alert from '../Alert'

export default function BlogForm({ setBlogs }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [showAlert, setShowAlert] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const onSubmit = async (data, e) => {
    e.preventDefault()

    try {
      await insertBlog(data)
      const newBlogs = await getBlogs()
      setBlogs(newBlogs)
      e.target.reset()
    } catch (err) {
      setErrorMsg(`${err.status}: ${err.statusText}`)
      setShowAlert(true)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
      <Alert errorMsg={errorMsg} showAlert={showAlert} setShowAlert={setShowAlert} />
      <div className='mb-4'>
        <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
        <input type='text' {...register('title', { required: true })} id='title' placeholder='title' className={`block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500': null}`} />
        {errors.title && <p className="text-red-500 text-xs text-left italic">Please enter a title</p>}
      </div>
      <div className='mb-4'>
        <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="body">Blog Post</label>
        <textarea
          {...register('body', { required: true })}
          id='body'
          rows='4'
          placeholder='Enter your blog post here...'
          className={`block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.body ? 'border-red-500': null}`}
        ></textarea>
        {errors.body && <p className="text-red-500 text-xs text-left italic">Please enter a blog post.</p>}
      </div>
      <div className='mb-4'>
        <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="type">Type</label>
        <select {...register('type', { required: true, value: '' })} id='type' placeholder='type' className={`block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.type ? 'border-red-500': null}`}>
          <option value='' disabled hidden>Select a blog type</option>
          <option value='food'>Food</option>
          <option value='travel'>Travel</option>
          <option value='tech'>Tech</option>
          <option value='lifestyle'>Lifestyle</option>
        </select>
        {errors.type && <p className="text-red-500 text-xs text-left italic">Please select a blog type.</p>}
      </div>
      <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Post</button>
    </form>
  )
}
