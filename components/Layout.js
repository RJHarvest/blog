import Navbar from './Navbar'
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children, header }) {
  return (
    <>
      <Header props={header} />
      <Navbar />
      <main className="mt-16 bg-gray-200">{children}</main>
      <Footer />
    </>
  )
}