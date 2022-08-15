import {Button, Form, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import jwt from "jwt-decode";
import Select from "react-select";

const Archive = ({refresh,idDossier}) => {

    const [options,setOptions] = useState([]);
    const [emplacement,setEmplacement] = useState("");
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
        } },[])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const dossier = {emplacement,idDossier};
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            fetch('https://backend-avocat.herokuapp.com/archives/add',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(dossier)
            }).then(() => {console.log("added");
                handleClose();
                refresh();
                // setX(x+1);
            })
        }
        //event.preventDefault()
        setValidated(true);


    };
    return(
        <div className="row">
            <div className="col-12">
                <p style={{textAlign:"center"}}>
                    <Button variant="btn btn-outline-secondary" onClick={handleShow} >
                        Archiver un dossier
                    </Button>
                </p>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Archiver un dossier</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <label>Emplacement</label>
                            <Select options={options}   onChange={(e)=>setEmplacement(e.value)}  />


                            <hr/>
                            <div style={{float: "right"}}>
                                <Button variant="btn btn-outline-primary mr-2" type="submit">
                                    Archiver
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
export default Archive;