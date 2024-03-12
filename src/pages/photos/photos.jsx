import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/layout";
import {toast} from "react-toastify";
import AxiosServices from "../../Config/AxiosServices";
import {photoSchema} from "../../lib/validations/photo";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import PhotoItem from "../../components/photo/photo-item";
import {Helmet} from "react-helmet";

const Photos = () => {
    const [photos, setPhotos] = useState([])
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState([])

    const {
        reset,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(photoSchema),
        defaultValues: {
            caption: "",
            image: "",
        },
    });

    const onsubmit = async (data) => {
        setIsLoading(true)
        let formData = new FormData();
        formData.append('caption', data.caption);
        if (data.image) {
            formData.append('image', data.image[0]);
        }
        try {
            let response = await AxiosServices.post('/photos/', formData, true)
            setIsLoading(false)
            setImage("")
            setFileName("")
            reset()
            toast.success('Photo created successfully!')
            setPhotos(photos => [response.data, ...photos])
            setError([])
        } catch (err) {
            setIsLoading(false)
            setError(err.response.data.image)
            console.log(err)
        }
    }
    const getPhotos = async () => {
        try {
            let response = await AxiosServices.get('/photos/')
            setPhotos(response.data.results)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getPhotos()
    }, []);

    return (
        <Layout>
            <Helmet>
                <title>Photos Page</title>
                <meta name="description" content="Helmet application"/>
            </Helmet>
            <div className="contentbox">
                <div className="border p-3 mb-3 rounded">
                    {
                        error?.map(error => (
                            <p key={error} className="font-weight-lighter error-message">{error}</p>
                        ))
                    }
                    <form
                        onSubmit={handleSubmit(onsubmit)}
                    >
                        <div className="form-group">
                            <textarea
                                name="caption"
                                className="form-control"
                                id="textarea"
                                rows="3"
                                placeholder="Enter your text here"
                                {...register("caption")}
                            >
                            </textarea>
                            {errors?.caption && (
                                <p className="mt-1 error-message">{errors.caption.message}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                name="image"
                                type="file"
                                accept="image/*"
                                className="form-control-file"
                                id="fileUpload"
                                onChange={e => {
                                    setImage(e.target.files[0])
                                }}
                                {...register("image")}
                            />
                            {errors?.image && (
                                <p className="">{errors.image.message}</p>
                            )}
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>

                {
                    photos.map(photo => (
                        <PhotoItem photo={photo} key={photo.id} setPhotos={setPhotos}/>
                    ))
                }

            </div>
        </Layout>
    );
};

export default Photos;