"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import Link from 'next/link';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be 6 characters or longer').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { error, registerUser, clearErrors } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema,
        onSubmit: (values) => {
            registerUser(values);
        },
    });

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearErrors();
        }
    }, [error]);

    return (
        <div
            style={{ maxWidth: "480px" }}
            className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
        >
            <form onSubmit={formik.handleSubmit}>
                <h2 className="mb-5 text-2xl font-semibold">Register Account</h2>

                <div className="mb-4">
                    <label className="block mb-1"> Full Name </label>
                    <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Type your name"
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? <div style={{ color: 'red' }}>{formik.errors.name}</div> : null}
                </div>

                <div className="mb-4">
                    <label className="block mb-1"> Email </label>
                    <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="text"
                        placeholder="Type your email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}
                </div>

                <div className="mb-4">
                    <label className="block mb-1"> Password </label>
                    <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type={showPassword ? "text" : "password"}
                        placeholder="Type your password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}
                    <button onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'} password</button>
                </div>

                <div className="mb-4">
                    <label className="block mb-1"> Confirm Password </label>
                    <input
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div> : null}
                </div>

                <button
                    type="submit"
                    className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                    Register
                </button>

                <hr className="mt-4" />

                <p className="text-center mt-5">
                    Already have an account?
                    <Link href="/login" className="text-blue-500">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;