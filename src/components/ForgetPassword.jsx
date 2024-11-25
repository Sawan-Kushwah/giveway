import Navbar from './Navbar'
import Footer from './Footer'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

const ForgetPassword = () => {
    const [serverOtp, setserverOtp] = useState("")
    const [email, setemail] = useState("")
    const [userOtp, setuserOtp] = useState("")
    const [error, seterror] = useState("")
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const hideEmailBoxShowOtpBox = () => {
        let emailBox = document.getElementsByClassName("emailBox");
        let otpBox = document.getElementsByClassName("otpBox");
        emailBox[0].classList.add("hidden");
        otpBox[0].classList.remove("hidden");
    }

    const getOtpFromServer = async (data) => {
        seterror("")
        let res = await fetch("https://authportal.onrender.com/forgetPasswordEmailVerification", {
            method: "POST",
            headers: { "content-type": "application/json", },
            body: JSON.stringify({ ...data })
        });

        let r = await res.json();
        if (res.ok) {
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
            setserverOtp(r.otp);
            hideEmailBoxShowOtpBox()
            reset()
        } else {
            // seterror(r.message);
            toast.warn(r.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const handleUserOtp = (e) => {
        setuserOtp(e.target.value);
    }

    const onSubmit = async (data) => { // email submission
        setemail(data.Email);
        getOtpFromServer(data)
    }

    const onSubmitOtp = () => {
        if (userOtp === serverOtp) {
            navigate("/reset", { state: email });
        } else {
            seterror("Invaild OTP")
        }
    }
    const resendOtp = (mail) => {
        seterror("")
        getOtpFromServer({ Email: mail })
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


            <section className="text-gray-400 bg-gray-900 body-font relative min-h-[79vh]">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Forget Password</h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">

                        {/* email sending and receiving form  */}
                        <div className="emailBox">
                            <form className="flex flex-wrap -m-2 " onSubmit={handleSubmit(onSubmit)}>
                                <div className="p-2 w-3/4 m-auto max-md:w-full">
                                    <div className="relative">
                                        <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
                                        <input type="email" id="email" name="email" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"  {...register("Email", { required: { value: true, message: "This field is required" }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid Email address" } })} />
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Send OTP</button>
                                </div>
                            </form>
                        </div>

                        <div className="otpBox hidden">
                            <form className=" w-full md:justify-start justify-center items-end shadow-md rounded px-8 pl-0 py-4">
                                <div className="relative mr-4 w-full">
                                    <div className="max-w-md mx-auto">
                                        <div className="mb-7">
                                            <label className="block text-white text-sm font-bold pl-1 mb-2" htmlFor="otp">OTP :{email && <span className=' text-gray-500 text-sm font-thin'> has been sent on {email}</span>}</label>
                                            <input className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-blue-900 focus:bg-transparent focus:border-blue-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" id="otp" type="text" placeholder="Enter OTP" onChange={handleUserOtp} value={userOtp ? userOtp : ""} />
                                        </div>
                                        {error && <div className=' text-red-500 pb-2'>{error}</div>}
                                        {errors && <div className=' text-red-500 pb-2'>{errors.message}</div>}
                                        <div className="flex items-center justify-between">
                                            <button className="inline-flex text-white bg-blue-500 border-0 py-1 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg" type="button" onClick={onSubmitOtp}>
                                                Verify OTP
                                            </button>
                                            <div className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer" onClick={() => resendOtp(email)}>
                                                Resend OTP
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>















            <Footer />


        </>

    )
}

export default ForgetPassword