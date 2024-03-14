import {Button, Modal} from "react-bootstrap";

const DeleteModal = ({modalOpen, setModalOpen, item, itemName, handleDelete, loader}) => {
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
                    Delete <span>{item === "post" ? "post" : item === "photo" ? "photo" : "video"}</span>
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

export default DeleteModal;