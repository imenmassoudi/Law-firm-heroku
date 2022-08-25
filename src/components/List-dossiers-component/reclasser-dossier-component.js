import {Button, Form, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import jwt from "jwt-decode";
import Select from "react-select";

const ReclasserDossier = ({refresh,selectedData}) => {
    const date1 = new Date();
    const futureDate = date1.getDate() ;
    date1.setDate(futureDate);
    const defaultValue = date1.toLocaleDateString('en-CA');

    const [options,setOptions] = useState([]);
    const [emplacement,setEmplacement] = useState("");
    const [date,setDate] = useState(defaultValue);
    const [refreshKey, setRefreshKey] = useState(0);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(false);
    useEffect(()=>{
        const token = localStorage.getItem('token')
        const option = []
        if (token) {
            const Collaborateurs = jwt(token)
            if (!Collaborateurs) {
                localStorage.removeItem('token')
                //   history.push('/login')
            } else {
                fetch('https://backend-avocat.herokuapp.com/emplacements', {
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
                            if (option.indexOf(res.libelle) === -1) {
                                console.log("le")
                                option.push({
                                    value: res._id,
                                    label: res.libelle
                                })
                                setOptions(option)
                            }

                        })
                    }).catch(err => {
                    console.log("errrrr");
                })
            }
        } },[refreshKey])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const dossier = {emplacement,date,selectedData};
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            fetch('https://backend-avocat.herokuapp.com/dossiers/',{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(dossier)
            }).then(() => {console.log("modified");
                handleClose();
                refresh();
                window.location.reload(true);

                // setX(x+1);
            })
        }
        //event.preventDefault()
        setRefreshKey(oldKey => oldKey +1)

        setValidated(true);
    };
    return(
        <div className="row">
            <div className="col-12">
                <p style={{textAlign:"center"}}>
                    <Button variant="btn btn-outline-secondary" onClick={handleShow} >
                        Reclasser un dossier
                    </Button>
                </p>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Reclasser un dossier</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <label>Emplacement</label>
                            <Select options={options}   onChange={(e)=>setEmplacement(e.value)}  />

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Date d'effet</Form.Label>
                                <Form.Control type="date" defaultValue={date}
                                              onChange={(e) => setDate(e.target.value)}/>
                                <Form.Text className="text-muted">
                                    minimum 3 caractères
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    Le nom d'utilisateur est obligatoire!
                                </Form.Control.Feedback>
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
export default ReclasserDossier;