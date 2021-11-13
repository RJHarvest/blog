import { useForm } from 'react-hook-form'

export default function CommentForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-white shadow-md rounded px-8 pt-6 pb-8'>
      <p className="text-3xl mb-4">Leave a comment</p>
      <div className='mb-4'>
        <textarea
          {...register('comment', { required: true })}
          id='comment'
          rows='6'
          placeholder='Enter a comment...'
          className={`block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.comment ? 'border-red-500 focus:border-red-500 focus:ring-0': null}`}
        >
        </textarea>
        {errors.comment && <p className="mt-1 text-red-500 text-xs text-left italic">Please enter a comment.</p>}
      </div>
      <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Post Comment</button>
    </form>
  )
}