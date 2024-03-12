import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/layout";
import {postSchema} from "../../lib/validations/post";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import AxiosServices from "../../Config/AxiosServices";
import {toast} from "react-toastify";
import SinglePost from "../../components/post/singlePost";
import {Helmet} from "react-helmet";

const Home = () => {
    const [posts, setPosts] = useState([])
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
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

        let formData = new FormData();
        formData.append('content', data.content);

        if (data.post_picture) {
            formData.append('post_picture', data.post_picture[0]);
        }

        try {
            let response = await AxiosServices.post('/posts/', formData, true)
            // console.log(response.data)
            setIsLoading(false)
            setImage("")
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
        } catch (error) {
            console.log(error)
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
                                className="form-control-file"
                                id="fileUpload"
                                onChange={e => {
                                    setImage(e.target.files[0])
                                }}
                                {...register("post_picture")}
                            />
                            {errors?.post_picture && (
                                <p className="">{errors.post_picture.message}</p>
                            )}
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>

                {
                    posts.map(post => (
                        <SinglePost key={post.id} post={post} setPosts={setPosts}/>
                    ))
                }
            </div>
        </Layout>
    );
};

export default Home;