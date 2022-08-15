import {Button, Modal} from "react-bootstrap";
import {useState} from "react";

const DeleteDossier = ({refresh,id}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleDelete= () => {
        fetch('https://backend-avocat.herokuapp.com/dossiers/'+id, {
            method: 'DELETE',
        }).then(() => {
            handleClose()
            refresh()
        })
    };
    return(
        <div className="row">
            <div className="col-12">
                <Button variant="outline-secondary" onClick={handleShow} >Supprimer</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Supression</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Voulez vous supprimer ce dossir?</Modal.Body>
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
export default DeleteDossier;