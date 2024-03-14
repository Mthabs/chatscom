import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {postSchema} from "../../lib/validations/post";
import {zodResolver} from "@hookform/resolvers/zod";
import AxiosServices from "../../Config/AxiosServices";
import {toast} from "react-toastify";
import {Modal} from "react-bootstrap";

const PostEditModal = ({modalOpen, setModalOpen, post, setPosts}) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            content: post.content || "",
        },
    });

    const onsubmit = async (data) => {
        setIsLoading(true)
        try {
            let response = await AxiosServices.put(`/posts/${post.id}/`, data, false)
            setIsLoading(false)
            form.reset()
            toast.success('Post Updated successfully!')
            setPosts(photos => photos.map(photo => photo?.id === response.data.id ? response.data : photo))
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
                <Modal.Title>Edit Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form
                    onSubmit={form.handleSubmit(onsubmit)}
                >
                    <div className="form-group">
                        <input
                            name="content"
                            className="form-control"
                            id="content"
                            disabled={isLoading}
                            placeholder="Enter your text here"
                            {...form.register("content")}
                        />

                        {form.formState.errors?.content && (
                            <p className="mt-1 error-message">{form.formState.errors?.content.message}</p>
                        )}
                    </div>
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading &&
                            <i className="fa fa-circle-o-notch fa-spin fa-fw mr-1"/>}
                            Update Post
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default PostEditModal;