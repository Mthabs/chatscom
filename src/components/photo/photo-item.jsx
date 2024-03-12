import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {commentSchema} from "../../lib/validations/post";
import AxiosServices from "../../Config/AxiosServices";
import {toast} from "react-toastify";
import {Button, Col, Dropdown, FormGroup, Row} from "react-bootstrap";
import CommentEditModal from "../post/comment-edit-modal";
import EditModal from "./edit-modal";

const PhotoItem = ({photo, setPhotos}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [commentEditModalOpen, setCommentEditModalOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState({})
    const [commentsCount, setCommentsCount] = useState(0)

    const form = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            content: "",
        }
    });

    async function onsubmit(data) {
        setIsLoading(true)
        let payload = {
            photo: photo?.id,
            ...data
        }
        try {
            let response = await AxiosServices.post(`/photocomments/`, payload, false)
            console.log(response.data)
            setIsLoading(false)
            form.reset()
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const handleDeletePhoto = async (photo) => {
        try {
            await AxiosServices.remove(`/photos/${photo?.id}`)
            setPhotos(prev => prev.filter(prevPhoto => prevPhoto.id !== photo?.id));
            toast.success('Photo deleted successfully!')
        } catch (e) {
            console.log(e)
        }
    }
    const handleDeleteComment = async (comment) => {
        try {
            await AxiosServices.remove(`/photocomments/${comment?.id}`)
            setComments(prev => prev.filter(prevComment => prevComment.id !== comment?.id));
            setCommentsCount(prevCommentsCount => prevCommentsCount - 1)
            toast('Photo comment delete successfully!')
        } catch (e) {
            console.log(e)
        }
    }

    async function handleLikePhoto() {
        try {
            let response = await AxiosServices.post(`/likephotos/`, {photo: photo?.id})
            setPhotos(photos => photos.map(photo => photo.id === response.data.photo ? {
                ...photo,
                like_count: photo?.like_count + 1,
                likephoto_id: response.data.id
            } : photo))
        } catch (e) {
            console.log(e)
        }
    }

    async function handleUnLikePhoto() {
        try {
            let response = await AxiosServices.remove(`/likephotos/${photo.likephoto_id}`)
            setPhotos(photos => photos.map(prevPhoto => prevPhoto.id === photo.id ? {
                ...prevPhoto,
                like_count: prevPhoto?.like_count - 1,
                likephoto_id: null
            } : prevPhoto))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        async function getComments() {
            try {
                let response = await AxiosServices.get(`/photocomments/?photo=${photo.id}`)
                setCommentsCount(response.data.count)
                setComments(response.data.results)
            } catch (e) {
                console.log(e)
            }
        }

        getComments()
    }, [isLoading]);

    return (
        <>
            <div className="bg-white p-4 border rounded-lg shadow-md first:mt-5 mb-4">
                <div className="d-flex justify-content-end">
                    {
                        photo.is_owner &&
                        <Dropdown className="edit mb-3">
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                <i className="bi bi-three-dots-vertical ml-2 cursor-pointer"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="right">
                                <Dropdown.Item
                                    onClick={() => {
                                        setModalOpen(!modalOpen)
                                    }}
                                >
                                    <i className="bi bi-pencil mr-1"></i>
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item
                                    onClick={() => handleDeletePhoto(photo)}
                                >
                                    <i
                                        className="bi bi-trash mr-1"
                                        style={{color: "red", fontWeight: "bold"}}
                                    />
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                </div>

                {/* Photo */}
                <img
                    src={photo.image || "https://placekitten.com/600/400"}
                    alt="User Photo"
                    className="mw-100 w-100 rounded-lg mb-4"
                />
                <p className="text-base mb-4">
                    {photo?.caption}
                </p>
                {/* Photo Details */}
                <div className="d-flex align-items-center mb-2">
                    <img
                        src="https://placekitten.com/40/40"
                        alt="User Avatar"
                        className="rounded-circle mr-2"
                    />
                    <div>
                        <p className="font-bold text-sm">{photo.owner}</p>
                        <p className="text-xs text-gray-500">{photo.created_at}</p>
                    </div>
                </div>

                <div className="">
                    {
                        comments.length > 0 &&
                        comments.map(comment => (
                            <div key={comment.id} className="d-flex align-items-start mb-3">
                                <i className="bi bi-person-circle" style={{fontSize: "32px", marginRight: "16px"}}></i>
                                <div className="bg-light w-100 rounded-md p-3 shadow-sm">
                                    <div className="d-flex align-items-center gap-2">
                                        <div
                                            className="d-flex flex-wrap justify-content-between align-items-center w-100">
                                            <p className="font-weight-bold">{comment.owner}</p>
                                            <p className="text-xs text-muted">{comment?.created_at}</p>
                                        </div>
                                        {comment?.is_owner && (
                                            <>
                                                <Dropdown className="edit">
                                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                                        <i className="bi bi-three-dots-vertical ml-2 cursor-pointer"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu align="right">
                                                        <Dropdown.Item
                                                            onClick={() => {
                                                                setCommentEditModalOpen(!commentEditModalOpen)
                                                                setComment(comment)
                                                            }}
                                                        >
                                                            <i className="bi bi-pencil mr-1"></i>
                                                            Edit
                                                        </Dropdown.Item>
                                                        <Dropdown.Divider/>
                                                        <Dropdown.Item
                                                            onClick={() => handleDeleteComment(comment)}
                                                        >
                                                            <i
                                                                className="bi bi-trash mr-1"
                                                                style={{color: "red", fontWeight: "bold"}}
                                                            />
                                                            Delete
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-muted">{comment.content}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Like, Comment */}
                <Row className="flex items-center text-gray-500">
                    <Col xs="auto" className="d-flex align-items-center mr-4">
                        {
                            photo.likephoto_id ?
                                <i
                                    className="bi bi-hand-thumbs-up-fill mr-1 cursor-pointer"
                                    onClick={handleUnLikePhoto}
                                /> :
                                <i
                                    className="bi bi-hand-thumbs-up mr-1 cursor-pointer"
                                    onClick={handleLikePhoto}
                                />
                        }
                        <span className="">
                            {photo.like_count}
                            {photo.like_count > 1 ? " Likes" : " Like"}
                        </span>
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center">
                        <i className="bi bi-chat-dots mr-1 cursor-pointer"></i>
                        <span>
                        {commentsCount}
                            {commentsCount > 1 ? " Comments" : " Comment"}
                    </span>
                    </Col>
                </Row>

                <div className="mt-3">
                    <form
                        onSubmit={form.handleSubmit(onsubmit)}
                        autoComplete="off"
                        className="d-flex align-items-center justify-content-between"
                    >
                        <FormGroup className="w-100 mb-0">
                            <input
                                className="placeholder:text-gray-400 form-control"
                                type="text"
                                name="content"
                                placeholder="Write a comment"
                                {...form.register("content")}
                            />
                            {form.formState.errors?.content && (
                                <p className="px-1 mt-1 error-message">{form.formState.errors?.content.message}</p>
                            )}
                        </FormGroup>

                        <Button
                            className="bg-secondary cursor-pointer ml-3"
                            disabled={isLoading}
                            type="submit"
                        >
                            <i className="bi bi-send-arrow-up-fill"></i>
                        </Button>
                    </form>
                </div>


            </div>
            {
                commentEditModalOpen &&
                <CommentEditModal
                    setModalOpen={setCommentEditModalOpen}
                    modalOpen={commentEditModalOpen}
                    comment={comment}
                    setComments={setComments}
                    setComment={setComment}
                    url="/photocomments"
                    item="photo"
                />
            }

            {
                modalOpen &&
                <EditModal
                    setPhotos={setPhotos}
                    photo={photo}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}/>
            }
        </>
    );
};

export default PhotoItem;