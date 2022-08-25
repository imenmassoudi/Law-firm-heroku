import {Button, Modal} from "react-bootstrap";
import {useState} from "react";

const DeleteDossier = ({refresh,selectedData}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleDelete= () => {
        fetch('https://backend-avocat.herokuapp.com/dossiers/sup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedData)
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
                    <Modal.Body>Voulez vous supprimer le(s) dossier(s) sélectionné(s)?</Modal.Body>
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