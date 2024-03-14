import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/layout";
import {toast} from "react-toastify";
import AxiosServices from "../../Config/AxiosServices";
import {photoSchema} from "../../lib/validations/photo";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import PhotoItem from "../../components/photo/photo-item";
import {Helmet} from "react-helmet";
import CardLoader from "../../components/loader/card-loader";

const Photos = () => {
    const [photos, setPhotos] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
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
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
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
                    <h4 className="mb-2">Create a Photo</h4>
                    <form
                        onSubmit={handleSubmit(onsubmit)}
                    >
                        <div className="form-group">
                            <textarea
                                name="caption"
                                className="form-control"
                                id="textarea"
                                rows="3"
                                placeholder="Enter type here photo caption"
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
                                className="form-control"
                                id="fileUpload"
                                {...register("image")}
                            />
                            {errors?.image && (
                                <p className="">{errors.image.message}</p>
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
                    loading ? <>
                            <CardLoader/>
                            <CardLoader/>
                            <CardLoader/>
                        </> :
                        photos.length > 0 ?
                            photos.map(photo => (
                                <PhotoItem photo={photo} key={photo.id} setPhotos={setPhotos}/>
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

export default Photos;