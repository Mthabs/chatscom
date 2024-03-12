import React, {useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {setSession} from "../../lib/utils";
import {toast} from "react-toastify";
import axios from "axios";
import {baseUrl} from "../../Config/AxiosServices";
import {userAuthLoginSchema} from "../../lib/validations/auth";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useAuth} from "../../Contexts/AuthContext";
import {Helmet} from "react-helmet";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const history = useHistory();
    const {user, setUser, setIsAuthenticated} = useAuth();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(userAuthLoginSchema),
    })

    async function onSubmit(data) {
        try {
            setIsLoading(true)
            let response = await axios.post(baseUrl + '/dj-rest-auth/login/', data)
            if (response.status === 200) {
                setIsAuthenticated(true);
                setUser(response?.data?.user);
                let token = {
                    access: response.data.access_token,
                    refresh: response.data.refresh_token,
                    user: response.data.user
                }
                setSession(token)
                setError("")
                setIsLoading(false)
                toast('Successfully logged in!')
                history.push("/feed/home")
            }
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.log(err.response)
            if (err.response.status === 400) {
                setError(err.response.data.non_field_errors[0])
            }
        }
    }

    useEffect(() => {
        if (user) {
            history.push("/feed/home")
        }
    }, [user]);

    return (
        <div className="container-fluid d-flex min-vh-100 flex-column justify-content-center position-relative">
            <Helmet>
                <title>Login Page</title>
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
                <Link to="/signup" className="d-flex align-items-center">
                    Sign up
                </Link>
            </div>

            <div className="mx-auto w-100 max-w-md text-center">
                <h1 className="text-2xl font-weight-bold">
                    Welcome back
                </h1>
                <p className="mb-3">
                    Enter your email to sign in to your account
                </p>
            </div>

            <div className="mt-6 contentbox mx-auto w-100 border shadow p-5 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {
                        error &&
                        <p className="error-message">{error}</p>
                    }
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
                                autoComplete="name"
                                disabled={false}
                                {...register("username")}
                            />
                            {errors?.username && (
                                <p className="px-1 mt-1 error-message">{errors.username.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="my-3">
                        <label htmlFor="password" className="block text-sm font-weight-bold">
                            Password
                        </label>
                        <div className="">
                            <input
                                id="password"
                                className="form-control"
                                placeholder="Password"
                                type="password"
                                autoComplete="password"
                                disabled={false}
                                {...register("password")}
                            />
                            {errors?.password && (
                                <p className="px-1 mt-1 error-message">{errors.password.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            className="btn btn-primary btn-block"
                            type="submit"
                            disabled={false}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>

            <p className="my-5 text-center text-sm text-muted">
                <Link to="/signup" className="font-weight-bold">
                    Don't have an account? Sign Up
                </Link>
            </p>
        </div>
    );
};

export default Login;