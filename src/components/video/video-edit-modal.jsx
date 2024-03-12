import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {videoCreateSchema} from "../../lib/validations/video";
import AxiosServices from "../../Config/AxiosServices";
import {toast} from "react-toastify";
import {Modal} from "react-bootstrap";

const VideoEditModal = ({modalOpen, setModalOpen, video, setVideos}) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(videoCreateSchema),
        defaultValues: {
            title: video.title || "",
            description: video.description || "",
        },
    });
    const onsubmit = async (data) => {
        setIsLoading(true)
        try {
            let response = await AxiosServices.put(`/videos/${video.id}/`, data, false)
            setIsLoading(false)
            form.reset()
            toast.success('Video Updated successfully!')
            setVideos(videos => videos.map(video => video?.id === response.data.id ? response.data : video))
            setModalOpen(false)
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const handleClose = () => setModalOpen(false);

    return (
        <Modal
            show={modalOpen}
            onHide={handleClose}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Video</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form
                    onSubmit={form.handleSubmit(onsubmit)}
                >
                    <div className="form-group">
                        <input
                            name="content"
                            className="form-control"
                            id="title"
                            disabled={isLoading}
                            placeholder="Enter your text here"
                            {...form.register("title")}
                        />

                        {form.formState.errors?.title && (
                            <p className="mt-1 error-message">{form.formState.errors?.title.message}</p>
                        )}
                    </div>
                    <div className="form-group">
                            <textarea
                                name="content"
                                className="form-control"
                                id="textarea"
                                rows="3"
                                placeholder="Enter your text here"
                                {...form.register("description")}
                            >
                            </textarea>
                        {form.formState.errors?.description && (
                            <p className="mt-1 error-message">{form.formState.errors.description.message}</p>
                        )}
                    </div>

                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isLoading}
                        >
                            Update Video
                        </button>
                    </div>
                </form>

            </Modal.Body>
        </Modal>
    );
};

export default VideoEditModal;