import Navbar from './Navbar'
import Footer from './Footer'
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifiyEmail = () => {
    const [otp, setotp] = useState(""); // otp from database
    const [userOtp, setuserOtp] = useState("") // user entered otp
    const [error, seterror] = useState("");
    const [userEmail, setuserEmail] = useState("")
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleSendOTP = () => { // showing otp box after email box after otp has been sent
        let emailBox = document.querySelector(".verifyEmail");
        let otpBox = document.querySelector(".verifyOTP");
        emailBox.classList.add("hidden");
        otpBox.classList.add("flex");
        otpBox.classList.remove("hidden");
    }

    const getOtpFromServer = async (data) => {
        // console.log(data)
        let res = await fetch("https://authportal.onrender.com/verifyEmail", {
            method: "POST",
            headers: { "content-type": "application/json", },
            body: JSON.stringify({ ...data })
        });

        let r = await res.json();
        if (res.ok) {
            seterror("")
            toast.success('OTP sent successfully 🚀', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setotp(r.otp);
            handleSendOTP();
            reset()
        } else {
            // alert(r.message)
            if (res.status === 500) {
                seterror(r.message);
            } else {
                if (confirm(r.message)) {
                    navigate("/login");
                }
            }
        }
    }

    const onSubmitEmail = async (data) => {
        setuserEmail(data);
        console.log(data);
        getOtpFromServer(data);
    }

    const handleUserOtp = async (e) => {
        setuserOtp(e.target.value);
    }

    const resendOtp = async (mail) => {
        getOtpFromServer(mail);
    }

    const onSubmitOtp = async () => {
        if (userOtp === otp) {
            navigate("/signUp", { state: userEmail })
        } else {
            seterror("Enter a vaild OTP");
        }
    }




    return (
        <>
            <Navbar />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            {/* Same as */}
            <ToastContainer />
            <section className="text-gray-400 bg-gray-900 body-font min-h-[79vh]">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center max-sm:py-8 max-sm:px-1">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-5 md:mb-0">
                        <img className="object-cover object-center rounded" alt="hero" src="https://img.freepik.com/free-photo/beautiful-mountainous-nature-landscape_23-2150705718.jpg" />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center max-sm:w-11/12">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Verify your E-mail</h1>


                        {/* Email form which will get verified */}
                        <div className='verifyEmail w-full'>
                            <form className="flex w-full md:justify-start justify-center max-sm:flex-col items-center" onSubmit={handleSubmit(onSubmitEmail)}>
                                <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 max-sm:w-full max-sm:m-0 ">
                                    <label htmlFor="hero-field" className="leading-7 text-sm text-gray-400">Enter your email</label>
                                    <input type="text" id="hero-field" name="hero-field" className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-blue-900 focus:bg-transparent focus:border-blue-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out " {...register("verifyEmail", { required: { value: true, message: "This field is required" }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid Email address" } })} />
                                    <p className="text-sm mt-2 text-gray-500 mb-5 w-full ">OTP will be send on this Email.</p>
                                    {errors.email && <div className=" text-red-500 pl-1">{errors.email.message}</div>}
                                    {error && <div className=' text-red-500 pb-2'>{error}</div>}
                                </div>
                                <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 relative -top-3 focus:outline-none hover:bg-blue-600 rounded text-lg">Send OTP</button>
                            </form>

                            <div className="flex lg:flex-row md:flex-col text-gray-300">
                                <button className="bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-700 hover:text-white focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 512 512">
                                        <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                                    </svg>
                                    <span className="ml-4 flex items-start flex-col leading-none">
                                        <span className="text-xs text-gray-400 mb-1">GET IT ON</span>
                                        <span className="title-font font-medium">Google Play</span>
                                    </span>
                                </button>
                                <button className="bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-700 hover:text-white focus:outline-none lg:ml-4 md:ml-0 ml-4 md:mt-4 mt-0 lg:mt-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 305 305">
                                        <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
                                        <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
                                    </svg>
                                    <span className="ml-4 flex items-start flex-col leading-none">
                                        <span className="text-xs text-gray-400 mb-1">Download on the</span>
                                        <span className="title-font font-medium">App Store</span>
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* opt submiting form */}

                        <form className="verifyOTP hidden w-full md:justify-start justify-center items-end shadow-md rounded px-8 pl-0 py-4 max-sm:p-0">
                            <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4  max-md:w-full max-md:m-0">

                                <div className="max-w-md mx-auto">
                                    <div className="mb-7">
                                        <label className="block text-white text-sm font-bold pl-1 mb-2" htmlFor="otp">OTP :{userEmail.verifyEmail && <span className=' text-gray-500 text-sm font-thin'> has been sent on {userEmail.verifyEmail}</span>}</label>
                                        <input className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-blue-900 focus:bg-transparent focus:border-blue-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" id="otp" type="text" placeholder="Enter OTP" onChange={handleUserOtp} value={userOtp ? userOtp : ""} />
                                    </div>
                                    {error && <div className=' text-red-500 pb-2'>{error}</div>}
                                    <div className="flex items-center justify-between">
                                        <button className="inline-flex text-white bg-blue-500 border-0 py-1 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg" type="button" onClick={onSubmitOtp}>
                                            Verify
                                        </button>
                                        <div className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer" onClick={() => resendOtp(userEmail)}>
                                            Resend OTP
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>





                    </div>
                </div>
            </section>

            <Footer />

        </>
    )
}

export default VerifiyEmail