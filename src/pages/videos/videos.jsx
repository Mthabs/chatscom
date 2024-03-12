import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/layout";
import AxiosServices from "../../Config/AxiosServices";
import {videoCreateSchema} from "../../lib/validations/video";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import VideoItem from "../../components/video/video-item";
import {Helmet} from "react-helmet";

const Videos = () => {
    const [videos, setVideos] = useState([])
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("")
    const [isLoading, setIsLoading] = useState(false);

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
        console.log(formData)
        try {
            let response = await AxiosServices.post('/videos/', formData, true)
            console.log(response.data)
            setIsLoading(false)
            setImage("")
            setFileName("")
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
            // console.log(response.data)
            setVideos(response.data.results)
        } catch (error) {
            console.log(error)
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
                                className="form-control-file"
                                id="fileUpload"
                                onChange={e => {
                                    setImage(e.target.files[0])
                                }}
                                {...form.register("video_file")}
                            />
                            {form.formState.errors?.video_file && (
                                <p className="">{form.formState.errors?.video_file.message}</p>
                            )}
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                {
                    videos.map(video => (
                        <VideoItem video={video} key={video.id} setVideos={setVideos}/>
                    ))
                }
            </div>
        </Layout>
    );
};

export default Videos;