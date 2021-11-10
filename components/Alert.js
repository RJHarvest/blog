import { useEffect } from 'react'

export default function Alert({ errorMsg, showAlert, setShowAlert }) {

  useEffect(() => {
    const timer = setTimeout(() => setShowAlert(false), 3000)
    return () => clearTimeout(timer)
  }, [showAlert])

  return showAlert ? (
    <div className="fixed top-20 right-6 text-left z-50 w-96 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
      <p className="font-bold">Error</p>
      <p>{errorMsg}</p>
    </div>
  ) : null
}