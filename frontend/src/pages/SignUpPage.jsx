import React, { useState } from 'react'
import { useAuthStore } from '../Store/useAuthStore'
import { Eye, EyeOff, Loader, Lock, Mail, MessageSquare, User } from 'lucide-react'
import { Link } from 'react-router'
import AuthImagePattern from '../components/AuthImagePattern'
import { toast } from 'react-toastify'

export const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { signUp, isSigningUp } = useAuthStore();
    const validateForm = () => {
        if (!formData.name.trim()) return toast.error("Full Name is required");
        if (!formData.email.trim()) return toast.error("Valid Email is required");
        if (!formData.password) return toast.error("Password is required");
        if (!formData.password.length > 6) return toast.error("The should be at least 6 chracters")
        return true
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const success = validateForm();
        if(success === true) return signUp(formData);
    };
    return (
        <>
            <div className="min-h-screen grid lg:grid-cols-2" style={{ paddingTop: `calc(var(--navbar-height, 64px) + 1rem)` }}>
                {/* Left side screen form */}
                <div className="flex flex-col justify-center items-center p-8 sm:p-12">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center mb-8">
                            <div className="flex flex-col items-center gap-2 group">
                                <div className="size-12 rounded-xl bg-primary/10
                            flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <MessageSquare className='size-6 text-primary' />
                                </div>
                                <h1 className="text-2xl font-bold mt-2">
                                    Create Account
                                </h1>
                                <p className="text-base-content/60">Get started with your free Account</p>
                            </div>
                        </div>
                        <form action="" onSubmit={handleSubmit} className="space-y-6">
                            <div className="form-control">
                                <label htmlFor="" className="label">
                                    <span className="label-text font-medium">
                                        Full Name
                                    </span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                        <User className='size-5 text-base-content/40' />
                                    </div>
                                    <input type="text" className={`input input-bordered w-full pl-10`} placeholder='John Doe' name="name" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-control">
                                <label htmlFor="" className="label">
                                    <span className="label-text font-medium">
                                        Email
                                    </span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                        <Mail className='size-5 text-base-content/40' />
                                    </div>
                                    <input type="email" className={`input input-bordered w-full pl-10`} placeholder='you@example.com' name="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-control">
                                <label htmlFor="" className='label'>
                                    <span className="label-text font-medium">
                                        Password
                                    </span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex z-10 items-center pointer-events-none">
                                        <Lock className='size-5 text-base-content/40' />
                                    </div>
                                    <input type={showPassword ? "text" : "password"} name="password" id="password" className={`input input-bordered w-full pl-10`} placeholder='******' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                    <button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? (<EyeOff className='size-5 text-base-content/40' />) :
                                            (<Eye className='size-5 text-base-content/40' />)}
                                    </button>
                                </div>
                            </div>
                            <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp} >
                                {isSigningUp ? (<><Loader className='size-5 animate-spin' />
                                    Loading...</>) : ("Create A Account")}
                            </button>
                        </form>
                        <div className="text-center">
                            <p className="text-base-content/60">
                                Already have an Account? {" "}
                                <Link to={"/login"} className='link link-primary'>
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                {/* right side */}
                <AuthImagePattern
                    title="Join Our Community"
                    subtitle="Connect  with friends, share moment, and stay in touch with the loved ones" />
            </div>
        </>
    )
}

