import React, {useEffect, useState} from 'react';
import axios from "axios";
import {baseUrl} from "../../Config/AxiosServices";
import {useAuth} from "../../Contexts/AuthContext";
import {Link, useHistory} from "react-router-dom";
import {userAuthSignupSchema} from "../../lib/validations/auth";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Helmet} from "react-helmet";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const {user} = useAuth()
    const history = useHistory();

    const form = useForm({
        resolver: zodResolver(userAuthSignupSchema),
        defaultValues: {
            username: "",
            email: "",
            password1: "",
            password2: "",
        },
    });

    async function onSubmit(data) {
        try {
            setIsLoading(true)
            let response = await axios.post(baseUrl + '/dj-rest-auth/registration/', data)
            setErrors({})
            setIsLoading(false)
            history.push("/")
            form.reset()
            // console.log(response)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.log(err)
            setErrors(err.response.data)
        }
    }

    console.log(errors)

    useEffect(() => {
        if (user) {
            history.push("/feed/home")
        }
    }, [user]);
    return (
        <div className="container-fluid d-flex min-vh-100 flex-column justify-content-center position-relative">
            <Helmet>
                <title>Sign Up Page</title>
                <meta name="description" content="Helmet application"/>
            </Helmet>
            <div
                className="d-flex justify-content-end align-items-center my-2 position-absolute"
                style={{
                    top: "0",
                    right: "35px",
                    fontSize: "20px"
                }}
            >
                <Link to="/" className="d-flex align-items-center">
                    Sign In
                </Link>
            </div>

            <div className="mx-auto w-100 text-center mb-5">
                <h1 className="font-weight-bold">
                    Sign in to your account
                </h1>
            </div>

            <div className="mt-6 contentbox mx-auto w-100 border shadow p-5 rounded-lg">
                {
                    errors?.username?.map(error => (
                        <p key={error} className="text-sm font-medium error-message">{error}</p>
                    ))
                }
                {
                    errors?.email?.map(error => (
                        <p key={error} className="text-sm font-medium error-message">{error}</p>
                    ))
                }
                {
                    errors?.password1?.map(error => (
                        <p key={error} className="text-sm font-medium error-message">{error}</p>
                    ))
                }
                {
                    errors?.password2?.map(error => (
                        <p key={error} className="text-sm font-medium error-message">{error}</p>
                    ))
                }
                {
                    errors?.non_field_errors?.map(error => (
                        <p key={error} className="text-sm font-medium error-message">{error}</p>
                    ))
                }

                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3">
                    {/* Add error display logic here */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-weight-bold">
                            User Name
                        </label>
                        <div className="">
                            <input
                                id="username"
                                className="form-control"
                                placeholder="user name"
                                type="text"
                                autoComplete="username"
                                disabled={false}
                                {...form.register("username")}
                            />
                            {form.formState.errors?.username && (
                                <p className="px-1 mt-1 error-message">{form.formState.errors.username.message}</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-weight-bold mt-3">
                            Email
                        </label>
                        <div className="">
                            <input
                                id="email"
                                className="form-control"
                                placeholder="email"
                                type="email"
                                autoComplete="email"
                                disabled={false}
                                {...form.register("email")}
                            />
                            {form.formState.errors?.email && (
                                <p className="px-1 mt-1 error-message">{form.formState.errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="my-3">
                        <label htmlFor="password1" className="block text-sm font-weight-bold">
                            Password
                        </label>
                        <div className="">
                            <input
                                id="password1"
                                className="form-control"
                                placeholder="Password"
                                type="password"
                                autoComplete="password"
                                disabled={false}
                                {...form.register("password1")}
                            />
                            {form.formState.errors?.password1 && (
                                <p className="px-1 mt-1 error-message">{form.formState.errors.password1.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="my-3">
                        <label htmlFor="password2" className="block text-sm font-weight-bold">
                            Confirm Password
                        </label>
                        <div className="">
                            <input
                                id="password2"
                                className="form-control"
                                placeholder="Password"
                                type="password"
                                autoComplete="password"
                                disabled={false}
                                {...form.register("password2")}
                            />
                            {form.formState.errors?.password2 && (
                                <p className="px-1 mt-1 error-message">{form.formState.errors.password2.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            className="btn btn-primary btn-block"
                            type="submit"
                            disabled={false}
                        >
                            {isLoading && <i className="fa fa-circle-o-notch fa-spin fa-fw mr-1"/>}
                            Signup
                        </button>
                    </div>
                </form>
            </div>

            <p className="my-5 text-center">
                <Link to="/" className="font-weight-bold">
                    Already have an account? Login
                </Link>
            </p>
        </div>
    );
};

export default SignUp;