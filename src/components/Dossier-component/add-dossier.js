import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import {Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import jwt from "jwt-decode";

const AddDossier = () => {
    const [data,setData] = useState("");
    const [options,setOptions] = useState([]);
    const [mission,setMission] = useState([]);
    const [typeDossier,setTypeDossier] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const option = []
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
                            if (option.indexOf(res.cin) === -1) {
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


            }
        } },[])

    return(
        <Form>

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

            </Container>
        </Form>

        )
}

export default AddDossier