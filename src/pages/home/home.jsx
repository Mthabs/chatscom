import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/layout";
import {postSchema} from "../../lib/validations/post";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import AxiosServices from "../../Config/AxiosServices";
import {toast} from "react-toastify";
import SinglePost from "../../components/post/singlePost";
import {Helmet} from "react-helmet";
import CardLoader from "../../components/loader/card-loader";

const Home = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const {
        reset,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            content: "",
            post_picture: "",
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true)
        let formData = new FormData();
        formData.append('content', data.content);

        if (data.post_picture) {
            formData.append('post_picture', data.post_picture[0]);
        }

        try {
            let response = await AxiosServices.post('/posts/', formData, true)
            setIsLoading(false)
            reset()
            toast.success('Post created successfully!')
            setPosts(posts => [response.data, ...posts])
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const getAllPosts = async () => {
        try {
            let response = await AxiosServices.get('/posts/')
            // console.log(response.data)
            setPosts(response.data.results)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllPosts()
    }, []);


    return (
        <Layout>
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="Helmet application"/>
            </Helmet>
            <div className="contentbox">
                <div className="border p-3 mb-3 rounded">
                    <h4 className="mb-2">Create a Post</h4>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <textarea
                                name="content"
                                className="form-control"
                                id="textarea"
                                rows="3"
                                placeholder="Enter your text here"
                                {...register("content")}
                            >
                            </textarea>
                            {errors?.content && (
                                <p className="mt-1 error-message">{errors.content.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <input
                                name="post_picture"
                                type="file"
                                accept="image/*"
                                className="form-control "
                                id="fileUpload"
                                // onChange={e => {
                                //     setImage(e.target.files[0])
                                // }}
                                {...register("post_picture")}
                            />
                            {errors?.post_picture && (
                                <p className="">{errors.post_picture.message}</p>
                            )}
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">
                                {isLoading && <i className="fa fa-circle-o-notch fa-spin fa-fw mr-1"/>}
                                {isLoading ? "Posting" : "Post"}
                            </button>
                        </div>
                    </form>
                </div>

                {
                    loading ?
                        <>
                            <CardLoader/>
                            <CardLoader/>
                            <CardLoader/>
                            <CardLoader/>
                        </>
                        :
                        posts.length > 0 ?
                            posts.map(post => (
                                <SinglePost key={post.id} post={post} setPosts={setPosts}/>
                            ))
                            :
                            <div className="border p-3 mb-3 rounded contentbox">
                                <p className="mt-10 font-weight-bold text-center">No data found</p>
                            </div>
                }
            </div>
        </Layout>
    );
};

export default Home;