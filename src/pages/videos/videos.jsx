import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/layout";
import AxiosServices from "../../Config/AxiosServices";
import {videoCreateSchema} from "../../lib/validations/video";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import VideoItem from "../../components/video/video-item";
import {Helmet} from "react-helmet";
import CardLoader from "../../components/loader/card-loader";

const Videos = () => {
    const [videos, setVideos] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    const form = useForm({
        resolver: zodResolver(videoCreateSchema),
        defaultValues: {
            title: "",
            description: "",
            video_file: ""
        },
    });

    const onsubmit = async (data) => {
        setIsLoading(true)
        let formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        if (data.video_file) {
            formData.append('video_file', data.video_file[0]);
        }
        try {
            let response = await AxiosServices.post('/videos/', formData, true)
            // console.log(response.data)
            setIsLoading(false)
            form.reset()
            toast.success('Video created successfully!')
            setVideos(videos => [response.data, ...videos])
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const getVideos = async () => {
        try {
            let response = await AxiosServices.get('/videos/')
            setVideos(response.data.results)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(() => {
        getVideos()
    }, []);
    return (
        <Layout>
            <Helmet>
                <title>Videos Page</title>
                <meta name="description" content="Helmet application"/>
            </Helmet>
            <div className="contentbox">
                <div className="border p-3 mb-3 rounded">
                    <h4 className="mb-2">Create a video</h4>
                    <form
                        onSubmit={form.handleSubmit(onsubmit)}
                    >
                        <div className="form-group">
                            <input
                                name="title"
                                className="form-control"
                                id="title"
                                placeholder="title...."
                                {...form.register("title")}
                            />
                            {form.formState.errors?.title && (
                                <p className="mt-1 error-message">{form.formState.errors.title.message}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <textarea
                                name="description"
                                className="form-control"
                                id="textarea"
                                rows="3"
                                placeholder="description...."
                                {...form.register("description")}
                            >
                            </textarea>
                            {form.formState.errors?.description && (
                                <p className="mt-1 error-message">{form.formState.errors.description.message}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="fileUpload">Video File</label>
                            <input
                                name="video_file"
                                type="file"
                                accept="video/mp4,video/x-m4v,video/*"
                                className="form-control"
                                id="fileUpload"
                                {...form.register("video_file")}
                            />
                            {form.formState.errors?.video_file && (
                                <p className="">{form.formState.errors?.video_file.message}</p>
                            )}
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">
                                {isLoading && <i className="fa fa-circle-o-notch fa-spin fa-fw mr-1"/>}
                                {isLoading ? "Creating" : "Create"}
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
                        videos.length > 0 ?
                            videos.map(video => (
                                <VideoItem video={video} key={video.id} setVideos={setVideos}/>
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

export default Videos;