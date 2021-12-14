import Header from '../components/Header'
import FormLayout from '../components/FormLayout'

export default function Home() {
  return (
    <>
      <Header />
      <div className="container max-w-screen-xl mx-auto">
        <FormLayout />
      </div>
    </>
  )
}
