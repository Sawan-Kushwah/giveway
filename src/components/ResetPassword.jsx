import Navbar from './Navbar'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const [error, seterror] = useState("")
    const navigate = new useNavigate();
    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data.password + "  ,  " + data.confirmPassword)
        if (data.password !== data.confirmPassword) {
            seterror("Password and confirm Password does not match")
        } else {
            seterror("");
            const response = await fetch('https://authportal.onrender.com/resetPassword',
                {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ ...data })
                })
            await response.json();
            if (response.ok) {
                reset()
                if (confirm("Password updated successfully , Go to login page ? ")) {
                    navigate("/login");
                }
            }

        }
    }
    const location = useLocation(); // verified email got after verifying it at verifyEmail
    console.log(location.state);
    return (
        <>
            <Navbar />

            <section className="text-gray-400 bg-gray-900 body-font relative min-h-[79vh]">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Reset Password</h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <form className="flex flex-wrap -m-2" onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
                                    <input type="text" id="email" name="email" {...register('email')}
                                        className="w-full  bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none bg-stone-900 text-gray-400 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        value={location.state} readOnly />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="password" className="leading-7 text-sm text-gray-400">Password</label>
                                    <input type="text" id="password" name="password" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" {...register("password", { required: { value: true, message: "This field is required" }, minLength: { value: 6, message: "Minimum length is 6" } })} />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="password" className="leading-7 text-sm text-gray-400">Confirm password</label>
                                    <input type="password" id="confirmPassword" name="confirmPassword" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-blue-500 focus:bg-gray-900 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" {...register("confirmPassword", { required: { value: true, message: "This field is required" }, minLength: { value: 6, message: "Minimum length is 6" } })} />
                                </div>
                            </div>
                            {error && <div className=" text-red-500 pl-2">{error}</div>}
                            <div className="p-2 w-full">
                                <button className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Reset password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />


        </>
    )
}

export default ResetPassword