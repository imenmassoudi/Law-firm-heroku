import {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";

const UpdateTypedossier = ({refresh,id,data}) => {
    const [show, setShow] = useState(false);
    const [libelle,setLibelle] = useState(data.libelle);
  
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const typedossier = {libelle};
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            fetch('https://backend-avocat.herokuapp.com/typedossiers/'+id,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(typedossier)
            }).then(() => {console.log("updated");
                handleClose();
                refresh();
                // setX(x+1);
            })
        }
        setValidated(true);


    };
    return(
        <div className="row">
            <div className="col-12">
                <i className="fas fa-edit" onClick={handleShow} />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Modification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            
                            
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>libelle</Form.Label>
                              <Form.Control type="text" placeholder="Nom" required value={libelle}
                                            onChange={(e) => setLibelle(e.target.value)}/>
                              <Form.Control.Feedback type="invalid">
                                  Le champ est obligatoire!
                              </Form.Control.Feedback>
                          </Form.Group>
                        
                        
                         

                            <hr/>
                            <div style={{float: "right"}}>
                                <Button variant="btn btn-outline-warning mr-2" type="submit">
                                    Modifier
                                </Button>
                                <Button variant="btn btn-outline-secondary" onClick={handleClose}>
                                    Annuler
                                </Button>
                            </div>

                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )

}

export default UpdateTypedossier