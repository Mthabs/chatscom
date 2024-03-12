import {commentSchema} from "../../lib/validations/post";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import AxiosServices from "../../Config/AxiosServices";
import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import {toast} from "react-toastify";

const CommentEditModal = ({modalOpen, setModalOpen, comment, setComments, setComment, url, item}) => {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            content: comment.content || "",
        }
    });

    async function onsubmit(data) {
        setIsLoading(true)
        let id = item === "photo" ? comment.photo : item === "post" ? comment.post : comment.video
        let payload = {
            [item]: id,
            ...data
        }
        try {
            let response = await AxiosServices.put(`${url}/${comment.id}/`, payload, false)
            setComments(comments => comments.map(com => com.id === response.data.id ? response.data : com))
            setComment({})
            setIsLoading(false)
            setModalOpen(false)
            form.reset()
            toast.success("Comment update successfully!")
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
                <Modal.Title>Edit Comment</Modal.Title>
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
                            Update Comment
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default CommentEditModal;