import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import {Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import jwt from "jwt-decode";
import { useGlobalState } from 'use-global-state-react';

const AddDossier = ({idc}) => {

    const [data,setData] = useState("");
    const [options,setOptions] = useState([]);
    const [optionsE,setOptionsE] = useState([]);
    const [optionsL,setOptionsL] = useState([]);
    const [optionsS,setOptionsS] = useState([]);
    const [mission,setMission] = useState("");
    const [typeDossier,setTypeDossier] = useState("");
    const [emplacement,setEmplacement] = useState("");
    const [lieu,setLieu] = useState("");
    const [service,setService] = useState("");
    const [aff,setAff] = useState("");
    const [observation,setObservation] = useState("");
    const [code,setCode] = useState("");
    const [x, setX] = useState(1);
    const [validated, setValidated] = useState(false);


    function tribS(id){
        const token = localStorage.getItem('token')

        fetch('http://localhost:5000/tribunaux/services/'+id, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },

        }).then(res => {
            return res.json();
        })
            .then(res => {
                console.log("prforefr "+res)
                let option = []
                res.map((res) => {
                    if (option.indexOf(res.libelle) === -1) {
                        option.push({
                            value: res._id,
                            label: res.libelle,
                        })
                        setOptionsS(option)
                    }

                })
            }).catch(err => {
            console.log("errrrr");
        })
    }
    useEffect(()=>{
        const token = localStorage.getItem('token')
        const option = []
        const optionE = []
        const optionL = []
        if (token) {
            const Collaborateurs = jwt(token)
            if (!Collaborateurs) {
                localStorage.removeItem('token')
                //   history.push('/login')
            } else {
                fetch('http://localhost:5000/typedossiers', {
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
                                    label: res.libelle,
                                })
                                setOptions(option)
                            }

                        })
                    }).catch(err => {
                    console.log("errrrr");
                })


                fetch('http://localhost:5000/emplacements', {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },

                }).then(res => {
                    return res.json();
                })
                    .then(res => {
                        res.map((res) => {
                            if (optionE.indexOf(res.libelle) === -1) {
                                console.log("le")
                                optionE.push({
                                    value: res._id,
                                    label: res.libelle,
                                })
                                setOptionsE(optionE)
                            }

                        })
                    }).catch(err => {
                    console.log("errrrr");
                })
                fetch('http://localhost:5000/tribunaux', {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },

                }).then(res => {
                    return res.json();
                })
                    .then(res => {
                        res.map((res) => {
                            if (optionL.indexOf(res.lieu) === -1) {
                                optionL.push({
                                    value: res._id,
                                    label: res.lieu,
                                })
                                setOptionsL(optionL)
                            }

                        })
                    }).catch(err => {
                    console.log("errrrr");
                })



            }
        } },[x])
    const refresh = () => {
        setX(x + 1);
    };
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        let idClient = idc
        let numAffaire = aff
        const dossier = {typeDossier,
            mission,
            emplacement,
            lieu,
            service,
            observation,
            numAffaire,
        idClient};
        if (form.checkValidity() === false ) {

            event.preventDefault();
            event.stopPropagation();
        }
        else{

            fetch('http://localhost:5000/dossiers/addDonnees',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(dossier)
            }).then(res => {
                return res.json();
            }).then(data =>
            {
                alert("dossier ajouté")

            })
            event.preventDefault()

        }
        event.preventDefault()
        setValidated(true);


    };

    return(
        <Form onSubmit={handleSubmit}  validated={validated} >

            <Container>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Type Dossier</Form.Label>
                            <Select options={options} onChange={(e) => setTypeDossier(e.value)} />

                            </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Mission</Form.Label>
                            <Form.Control type="text" placeholder="Entrer une mission .." required minLength="3"
                                          onChange={(e) => setMission(e.target.value)}/>
                            <Form.Text className="text-muted">
                                minimum 3 caractères
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                La mission  est obligatoire!
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Emplacement</Form.Label>
                            <Select options={optionsE} onChange={(e) => setEmplacement(e.value)} />

                            </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Lieu</Form.Label>
                            <Select options={optionsL} onChange=
                                {(e) =>
                                {
                                    setLieu(e.value)
                                    tribS(e.value)
                                }


                            } />

                            </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Serivce</Form.Label>
                            <Select options={optionsS} onChange={(e) => setService(e.value)}  />

                            </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Numéro affaire</Form.Label>
                            <Form.Control type="text" placeholder="Entrer un numéro .." required minLength="3"
                                          onChange={(e) => setAff(e.target.value)}/>
                            <Form.Text className="text-muted">
                                minimum 3 caractères
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Le champ  est obligatoire!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Observation</Form.Label>
                            <Form.Control type="text" placeholder="Entrer une observation .." required minLength="3"
                                          onChange={(e) => setObservation(e.target.value)}/>
                            <Form.Text className="text-muted">
                                minimum 3 caractères
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Le champ  est obligatoire!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                </Row>

            </Container>
            <Button  type="submit" variant="secondary" size="sm" style={{float:"right"}}>
                Valider dossier
            </Button>
        </Form>

        )
}

export default AddDossier