import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/layout";
import AxiosServices from "../../Config/AxiosServices";
import {toast} from "react-toastify";
import {userProfileUpdateSchema} from "../../lib/validations/user";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import FollowerItem from "../../components/profile/follower-item";
import {useAuth} from "../../Contexts/AuthContext";
import {useHistory} from "react-router-dom";
import {setSession} from "../../lib/utils";
import {Helmet} from "react-helmet";

const Profile = () => {
    const [user] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null)
    const [followers, setFollowers] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState([])
    const history = useHistory();
    const {setIsAuthenticated, setUser} = useAuth()

    const form = useForm({
        resolver: zodResolver(userProfileUpdateSchema),
        defaultValues: {
            username: user.username || "",
            first_name: user.first_name || "",
            last_name: user.last_name || "",
        }
    })

    const onsubmit = async (data) => {
        setIsLoading(true)
        try {
            let response = await AxiosServices.put('/dj-rest-auth/user/', data, false)
            // console.log(response.data)
            localStorage.setItem("user", JSON.stringify(response.data))
            toast.success("User data update successfully")
            setIsLoading(false)

            setSession(null);
            setIsAuthenticated(false)
            setUser(null)
            history.push("/")
        } catch (e) {
            console.log(e.response.data)
            setError(e.response.data.username)
            setIsLoading(false)
        }
    }


    const getFollowers = async () => {
        try {
            let response = await AxiosServices.get(`/followers/`)
            setFollowers(response.data.results)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getFollowers()
    }, []);


    return (
        <Layout>
            <Helmet>
                <title>Profile Page</title>
                <meta name="description" content="Helmet application"/>
            </Helmet>
            <div className="contentbox py-5">
                <div className="shadow-sm border border-info rounded-lg p-4 mb-5">

                    {
                        error.length > 0 &&
                        error.map(err => (
                            <p key={err} className="error-message">{err}</p>
                        ))
                    }

                    <form onSubmit={form.handleSubmit(onsubmit)}>
                        <div className="form-group">
                            <label htmlFor="username">User Name</label>
                            <input
                                name="username"
                                className="form-control"
                                id="username"
                                placeholder="title...."
                                {...form.register("username")}
                            />
                            {form.formState.errors?.username && (
                                <p className="mt-1 error-message">{form.formState.errors.username.message}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                name="first_name"
                                className="form-control"
                                id="first_name"
                                placeholder="title...."
                                {...form.register("first_name")}
                            />
                            {form.formState.errors?.first_name && (
                                <p className="mt-1 error-message">{form.formState.errors.first_name.message}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                name="last_name"
                                className="form-control"
                                id="last_name"
                                placeholder="title...."
                                {...form.register("last_name")}
                            />
                            {form.formState.errors?.last_name && (
                                <p className="mt-1 error-message">{form.formState.errors.last_name.message}</p>
                            )}
                        </div>
                        <div className="">
                            <button type="submit" className="btn btn-primary btn-block">Update</button>
                        </div>

                    </form>
                </div>
                <div className="shadow-sm border border-info rounded-lg p-4">
                    <div className="row">
                        {
                            followers?.length > 0 ?
                                followers.map(follower => (
                                    <div className="col-sm-6 col-lg-4">
                                        <FollowerItem key={follower.id} follower={follower}/>
                                    </div>
                                ))
                                :
                                <p className="mt-10 font-weight-lighter text-center">No data found</p>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;