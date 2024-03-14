import React, {useEffect, useState} from 'react';
import {Button, Col, Dropdown, FormGroup, Row} from "react-bootstrap";
import AxiosServices from "../../Config/AxiosServices";
import {commentSchema} from "../../lib/validations/post";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import CommentEditModal from "../post/comment-edit-modal";
import VideoEditModal from "./video-edit-modal";
import DeleteModal from "../modal/delete-modal";
import CommentDeleteModal from "../modal/comment-delete-modal";

const VideoItem = ({video, setVideos}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([])
    const [commentsCount, setCommentsCount] = useState(0)
    const [commentEditModalOpen, setCommentEditModalOpen] = useState(false);
    const [comment, setComment] = useState({})
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteVideoLoader, setDeleteVideoLoader] = useState(false);
    const [deleteVideo, setDeleteVideo] = useState(null)

    const [commentDeleteModalOpen, setCommentDeleteModalOpen] = useState(false);
    const [deleteCommentLoader, setDeleteCommentLoader] = useState(false)
    const [deleteComment, setDeleteComment] = useState(null)

    const form = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            content: "",
        }
    });

    async function onsubmit(data) {
        setIsLoading(true)
        let payload = {
            video: video?.id,
            ...data
        }
        try {
            await AxiosServices.post(`/videocomments/`, payload, false)
            setIsLoading(false)
            form.reset()
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const handleDeleteVideo = async () => {
        setDeleteVideoLoader(true)
        try {
            await AxiosServices.remove(`/videos/${deleteVideo?.id}`)
            setVideos(prev => prev.filter(prevVideo => prevVideo.id !== deleteVideo?.id));
            toast('Video deleted successfully!')
            setDeleteVideoLoader(false)
            setDeleteModalOpen(false)
        } catch (e) {
            console.log(e)
            setDeleteVideoLoader(false)
        }
    }

    const handleDeleteComment = async () => {
        setDeleteCommentLoader(true)
        try {
            await AxiosServices.remove(`/videocomments/${deleteComment?.id}`)
            setComments(prev => prev.filter(prevComment => prevComment.id !== deleteComment?.id));
            setCommentsCount(prevCommentsCount => prevCommentsCount - 1)
            toast('Video comment delete successfully!')
            setDeleteCommentLoader(false)
            setCommentDeleteModalOpen(false)
            setDeleteComment(null)
        } catch (e) {
            console.log(e)
            setDeleteCommentLoader(false)
        }
    }

    async function handleLikeVideo() {
        try {
            let response = await AxiosServices.post(`/likevideos/`, {video: video?.id})
            setVideos(videos => videos.map(video => video.id === response.data.video ? {
                ...video,
                like_count: video?.like_count + 1,
                likevideo_id: response.data.id
            } : video))
        } catch (e) {
            console.log(e)
        }
    }

    async function handleUnLikeVideo() {
        try {
            await AxiosServices.remove(`/likevideos/${video.likevideo_id}`)
            setVideos(videos => videos.map(prevVideo => prevVideo.id === video.id ? {
                ...prevVideo,
                like_count: prevVideo?.like_count - 1,
                likevideo_id: null
            } : prevVideo))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        async function getComments() {
            try {
                let response = await AxiosServices.get(`/videocomments/?video=${video.id}`)
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
                        video.is_owner &&
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
                                    onClick={() => {
                                        setDeleteModalOpen(true)
                                        setDeleteVideo(video)
                                    }}
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

                <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="font-bold text-lg">{video.title}</p>
                </div>

                <p className="font-weight-normal">
                    {video.description}
                </p>

                {/* Date */}
                <p className="text-xs text-gray-500 mb-4">{video.created_at}</p>

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
                                                            onClick={() => {
                                                                setCommentDeleteModalOpen(true)
                                                                setDeleteComment(comment)
                                                            }}
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
                            video.likevideo_id ?
                                <i
                                    className="bi bi-hand-thumbs-up-fill mr-1 cursor-pointer like_comment"
                                    onClick={handleUnLikeVideo}
                                /> :
                                <i
                                    className="bi bi-hand-thumbs-up mr-1 cursor-pointer like_comment"
                                    onClick={handleLikeVideo}
                                />
                        }
                        <span className="">
                            {video.like_count}
                            {video.like_count > 1 ? " Likes" : " Like"}
                        </span>
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center">
                        <i className="bi bi-chat-dots mr-1 cursor-pointer like_comment"></i>
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
                            <div className="d-flex align-items-center justify-content-between">
                                {isLoading && <i className="fa fa-circle-o-notch fa-spin fa-fw mr-1"/>}
                                <i className="bi bi-send-arrow-up-fill"></i>
                            </div>
                        </Button>
                    </form>
                </div>

            </div>

            {
                deleteModalOpen &&
                <DeleteModal
                    handleDelete={handleDeleteVideo}
                    modalOpen={deleteModalOpen}
                    setModalOpen={setDeleteModalOpen}
                    loader={deleteVideoLoader}
                    item="video"
                    itemName={video.title}
                />
            }

            {
                commentDeleteModalOpen &&
                <CommentDeleteModal
                    loader={deleteCommentLoader}
                    modalOpen={commentDeleteModalOpen}
                    setModalOpen={setCommentDeleteModalOpen}
                    itemName={deleteComment.content}
                    handleDelete={handleDeleteComment}
                />
            }

            {
                commentEditModalOpen &&
                <CommentEditModal
                    setModalOpen={setCommentEditModalOpen}
                    modalOpen={commentEditModalOpen}
                    comment={comment}
                    setComments={setComments}
                    setComment={setComment}
                    url="/videocomments"
                    item="video"
                />
            }

            {
                modalOpen &&
                <VideoEditModal
                    setModalOpen={setModalOpen}
                    modalOpen={modalOpen}
                    setVideos={setVideos}
                    video={video}/>
            }

        </>
    );
};

export default VideoItem;