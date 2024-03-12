import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Dropdown, Button, Form, Image, FormGroup} from 'react-bootstrap';
import AxiosServices from "../../Config/AxiosServices";
import {commentSchema} from "../../lib/validations/post";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import CommentEditModal from "./comment-edit-modal";
import PostEditModal from "./post-edit-modal";

const SinglePost = ({post, setPosts}) => {
    const [comments, setComments] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [commentsCount, setCommentsCount] = useState(0)
    const [commentEditModalOpen, setCommentEditModalOpen] = useState(false);
    const [comment, setComment] = useState({})


    const form = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            content: "",
        }
    });

    async function onsubmit(data) {
        setIsLoading(true)
        let payload = {
            post: post?.id,
            ...data
        }
        try {
            let response = await AxiosServices.post(`/comments/`, payload, false)
            console.log(response.data)
            setIsLoading(false)
            toast.success('Comment add successfully!')
            form.reset()
        } catch (err) {
            setIsLoading(false)
            console.log(err)
        }
    }

    const handleDeletePost = async (post) => {
        try {
            await AxiosServices.remove(`/posts/${post?.id}`)
            setPosts(prev => prev.filter(prevPost => prevPost.id !== post?.id));
            toast.success('Post deleted successfully!')
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeleteComment = async (comment) => {
        try {
            await AxiosServices.remove(`/comments/${comment?.id}`)
            setComments(prev => prev.filter(prevComment => prevComment.id !== comment?.id));
            setCommentsCount(prevCommentsCount => prevCommentsCount - 1)
            toast('Post comment delete successfully!')
        } catch (e) {
            console.log(e)
        }
    }

    async function handleLikePost() {
        try {
            let response = await AxiosServices.post(`/likes/`, {post: post?.id})
            setPosts(posts => posts.map(post => post.id === response.data.post ? {
                ...post,
                like_count: post?.like_count + 1,
                like_id: response.data.id
            } : post))
        } catch (e) {
            console.log(e)
        }
    }

    async function handleUnLikePost() {
        try {
            let response = await AxiosServices.remove(`/likes/${post.like_id}`)
            setPosts(posts => posts.map(prevPost => prevPost.id === post.id ? {
                ...prevPost,
                like_count: prevPost?.like_count - 1,
                like_id: null
            } : prevPost))
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        async function getComments() {
            try {
                let response = await AxiosServices.get(`/comments/?post=${post.id}`)
                setComments(response.data.results)
                setCommentsCount(response.data.count)
            } catch (e) {
                console.log(e)
            }
        }

        getComments()
    }, [isLoading]);

    return (
        <>
            <Container className="bg-white p-4 border rounded-lg shadow-md mb-3 last:mb-0 first:mt-5">
                <Row className="justify-content-between mb-4">
                    <Col xs="auto" className="d-flex align-items-center">
                        <Image
                            src={post?.profile_picture || "https://placekitten.com/40/40"}
                            roundedCircle
                            className="mr-2"
                            alt="User Avatar"
                            width={32}
                            height={32}
                        />
                        <div>
                            <p className="font-bold text-sm">{post?.owner}</p>
                            <p className="text-xs text-gray-500">{post?.created_at}</p>
                        </div>
                    </Col>
                    {post.is_owner && (
                        <Dropdown className="edit">
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                <i className="bi bi-three-dots-vertical ml-2 cursor-pointer"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="right">
                                <Dropdown.Item
                                    onClick={() => {
                                        setModalOpen(true)
                                    }}
                                >
                                    <i className="bi bi-pencil mr-1"></i>
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item
                                    onClick={() => handleDeletePost(post)}
                                >
                                    <i
                                        className="bi bi-trash mr-1"
                                        style={{color: "red", fontWeight: "bold"}}
                                    />
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                </Row>

                <p className="mb-4">
                    {post?.content}
                </p>
                <Image
                    src={post.post_picture || "https://placekitten.com/600/400"}
                    alt="Post Image"
                    className="mw-100 w-100 rounded-lg mb-4"
                />

                <div className="">
                    {comments.length > 0 &&
                        comments.map((comment) => (
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
                        ))}
                </div>

                <Row className="flex items-center text-gray-500">
                    <Col xs="auto" className="d-flex align-items-center mr-4">
                        {
                            post.like_id ?
                                <i
                                    className="bi bi-hand-thumbs-up-fill mr-1 cursor-pointer"
                                    onClick={handleUnLikePost}
                                /> :
                                <i
                                    className="bi bi-hand-thumbs-up mr-1 cursor-pointer"
                                    onClick={handleLikePost}
                                />
                        }
                        <span className="">
                            {post.like_count}
                            {post.like_count > 1 ? " Likes" : " Like"}
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

            </Container>

            {
                commentEditModalOpen &&
                <CommentEditModal
                    setModalOpen={setCommentEditModalOpen}
                    modalOpen={commentEditModalOpen}
                    comment={comment}
                    setComments={setComments}
                    setComment={setComment}
                    url="/comments"
                    item="post"
                />
            }
            {
                modalOpen &&
                <PostEditModal
                    setPosts={setPosts}
                    post={post} modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                />
            }
        </>
    );
};

export default SinglePost;