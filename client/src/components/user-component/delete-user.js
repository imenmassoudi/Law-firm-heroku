import {Button, Modal} from "react-bootstrap";
import {useState} from "react";

const DeleteUser = ({refresh,id,username}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleDelete= () => {
            fetch('http://localhost:5000/users/'+id, {
                method: 'DELETE',
            }).then(() => {
                handleClose()
                refresh()
            })
    };
    return(
        <div className="row">
            <div className="col-12">
                <i className="fas fa-trash" onClick={handleShow} style={{color:"red"}} />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Supression</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Voulez vous supprimer l'utilisateur {username}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Annuler
                        </Button>
                        <Button variant="btn btn-outline-danger" onClick={handleDelete}>
                            Supprimer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>

    )
}
export default DeleteUser;