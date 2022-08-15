import {Button, Form, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Select from 'react-select';
import jwt from "jwt-decode";



const AddSousDossier = ({refresh}) => {
    const [options,setOptions] = useState([]);
    const [idDossier,setIdDossier] = useState("");
    const [x, setX] = useState(1);

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () =>  {
    setShow(true)

};
    useEffect(()=>{
        const token = localStorage.getItem('token')
        const option = []
        if (token) {
            const Collaborateurs = jwt(token)
            if (!Collaborateurs) {
                localStorage.removeItem('token')
                //   history.push('/login')
            } else {
                fetch('https://backend-avocat.herokuapp.com/dossiers', {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                }).then(res => {
                    return res.json();
                })
                    .then(res => {
                        res.map((res) => {
                            console.log(res)
                            console.log(option)
                            if (option.indexOf(res.numAffaire) === -1) {
                                console.log("le")
                                option.push({
                                    value: res._id,
                                    label: res.numAffaire,
                                })
                                setOptions(option)
                            }

                        })
                    }).catch(err => {
                    console.log("errrrr");
                })





            }
        } },[x])

const [validated, setValidated] = useState(false);
        let option = []
        const handleSubmit = (event) => {
            const form = event.currentTarget;
    
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            else{
                const token = localStorage.getItem('token')

                const SousDossier = {
                    idDossier
                };
                    fetch('https://backend-avocat.herokuapp.com/sousdossier/add',{
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body: JSON.stringify(SousDossier)
                    }).then(() => {console.log("new sous dossier added");
                      //  handleClose();
                        refresh();
                })



            }
            setValidated(true);

    };


return(
    <div className="row">
        <div className="col-12">
            <p style={{textAlign:"center"}}>
                <Button variant="btn btn-outline-secondary" onClick={handleShow} >
                    Sous dossier
                </Button>
            </p>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Sousdossier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Code dossier</Form.Label>
                            <Select options={options}        onChange={(e) => setIdDossier(e.value)}/>

                        </Form.Group>
                        <hr/>
                        <div style={{float: "right"}}>
                            <Button variant="btn btn-outline-primary mr-2" type="submit">
                                Classer
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
export default AddSousDossier;