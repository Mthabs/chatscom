import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Modal} from "react-bootstrap";
import {photo1Schema} from "../../lib/validations/photo";
import AxiosServices from "../../Config/AxiosServices";
import {toast} from "react-toastify";

const EditModal = ({modalOpen, setModalOpen, photo, setPhotos}) => {
    const [isLoading, setIsLoading] = useState(false);

    // console.log(photo)

    const form = useForm({
        resolver: zodResolver(photo1Schema),
        defaultValues: {
            caption: photo?.caption || "",
        },
    });

    const onsubmit = async (data) => {
        setIsLoading(true)
        try {
            let response = await AxiosServices.put(`/photos/${photo.id}/`, data, false)
            setIsLoading(false)
            form.reset()
            toast.success('Photo Uudated successfully!')
            setPhotos(photos => photos.map(photo => photo?.id === response.data.id ? response.data : photo))
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
                <Modal.Title>Edit Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form
                    onSubmit={form.handleSubmit(onsubmit)}
                >
                    <div className="form-group">
                        <input
                            name="caption"
                            className="form-control"
                            id="content"
                            disabled={isLoading}
                            placeholder="Enter your text here"
                            {...form.register("caption")}
                        />

                        {form.formState.errors?.caption && (
                            <p className="mt-1 error-message">{form.formState.errors?.caption.message}</p>
                        )}
                    </div>
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isLoading}
                        >
                            Update Photo
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditModal;
