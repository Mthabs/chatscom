import React from 'react';
import {Button, Modal} from "react-bootstrap";

const CommentDeleteModal = ({modalOpen, setModalOpen, itemName, handleDelete, loader}) => {
    const handleClose = () => setModalOpen(false);
    const deleteItem = () => {
        handleDelete()
    }
    return (
        <Modal
            show={modalOpen}
            onHide={handleClose}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete Comment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you want sure to delete this <b>{itemName}</b>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={deleteItem}>
                    {loader && <i className="fa fa-circle-o-notch fa-spin fa-fw mr-1"/>}
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CommentDeleteModal;