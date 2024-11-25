
import './App.css'

function App() {

  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font min-h-[79vh]">
        <div className="container mx-auto flex px-5 py-10 items-center justify-center flex-col">
          <img className=" lg:w-1/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded invert " alt="hero" src="assets/horse.png" />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Join and Access Your Account with Ease</h1>
            <p className="leading-relaxed mb-8"> Welcome to Authportal Enjoy quick and secure access with our effortless signup and reliable login features. Our user-friendly interface ensures a seamless experience, while robust security measures protect your data. Join us today for a smooth, secure, and convenient digital journey.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
