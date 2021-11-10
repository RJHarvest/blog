import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getBlog, insertComment } from '../../db/data/query'
import Alert from '../Alert'

export default function CommentForm({ setBlog, blogId }) {
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
      await insertComment(blogId, data.comment)
      const newBlog = await getBlog(blogId)
      setBlog(newBlog)
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
        <label className="block text-left text-gray-700 text-sm font-bold mb-2" htmlFor="comment">Comment</label>
        <textarea
          {...register('comment', { required: true })}
          id='comment'
          rows='6'
          placeholder='Enter a comment...'
          className={`block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.comment ? 'border-red-500': null}`}
        >
        </textarea>
        {errors.comment && <p className="text-red-500 text-xs text-left italic">Please enter a comment.</p>}
      </div>
      <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Comment</button>
    </form>
  )
}