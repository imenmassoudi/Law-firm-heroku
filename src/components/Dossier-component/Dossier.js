import React, {useEffect, useState} from 'react'
import {Button, Form, Tab, Tabs} from 'react-bootstrap'
import Select from "react-select";
import jwt from "jwt-decode";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddDossier from "./add-dossier";
import Tache from "../tache-component/Tache";
import Reglement from "../reglement-component/Reglement";
import Collaborateurdossier from "../collaborateurdossier-component/Collaborateurdossier";
import SousDossier from "../sousdossier-component/SousDossier";
import Demandeur from "../demandeur-component/Demandeur";

export default function ReactTabs() {
    const [username,setUserName] = useState("");
    const [nom,setNom] = useState("");
    const [prenom,setPrenom] = useState("");
    const [mdp,setMdp] = useState("");
    const [mdpConf,setMdpConf] = useState("");
    const [data,setData] = useState("");
    const [show, setShow] = useState(false);
    const [verif,setVerif] = useState("hidden");
    const [x, setX] = useState(1);
    const [options,setOptions] = useState([]);
    const [id,setId] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(false);
    const refresh = () => {
        setX(x + 1);
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
                fetch('https://backend-avocat.herokuapp.com/clients', {
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
                                    label: res.nom + ":" + res.codeClient,
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
        alert("client séléctionné")
        const form = event.currentTarget;
        const user = {username,nom,prenom,mdp};
        if (form.checkValidity() === false ) {
            //    alert("mdp: "+mdp+" "+mdpConf)
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            let idClient = id;

        /*    fetch('http://localhost:5000/dossiers/'+id,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(idClient)
            }).then(() => {console.log("updated");

                // setX(x+1);
            })*/
            event.preventDefault()
        }

    };
    const [tabKey, initTabKey] = useState('one')
    return (
        <div className="content-wrapper">
            <div>
                <h2 className="mb-3">Ajouter dossier</h2>
                <Tabs activeKey={tabKey} onSelect={(e) => initTabKey(e)}>
                    <Tab eventKey="one" title="Client & demandeur">

                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Container>
                                <Row>
                                    <Col>
                                        <label>Client</label>
                                        <Select options={options}   onChange={(e) => {
                                            fetch('https://backend-avocat.herokuapp.com/clients/findClient/'+e.value)
                                                .then((response) => response.json())
                                                .then((data) => {
                                                    setData(data)
                                                    setId(data._id)
                                                })
                                        }}  />
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Nom Complet</Form.Label>
                                            <Form.Control type="text" placeholder="Entrer un nom .." required minLength="3"
                                                          value={data.nom}/>
                                        </Form.Group>

                                    </Col>
                                </Row>

                            </Container>

                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>CIN</Form.Label>
                                            <Form.Control type="text" placeholder="Entrer un cin .." required minLength="8"
                                                          value={data.cin}/>

                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Situation fiscale</Form.Label>
                                            <Form.Control type="text" placeholder="Entrer un cin .." required minLength="8"
                                                          value={data.situationFisc}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Container>

                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Type client</Form.Label>
                                            <Form.Control type="text" placeholder="Entrer un cin .." required minLength="8"
                                                          value={data.typeClient}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Adresse</Form.Label>
                                            <Form.Control type="text" placeholder="Entrer un nom .." required minLength="3"
                                                          value={data.adresse}/>

                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Container>

                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Tel</Form.Label>
                                            <Form.Control type="number" placeholder="Entrer un tel .." required minLength="3"
                                                          value={data.tel}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Fax</Form.Label>
                                            <Form.Control type="number" placeholder="Entrer un fax .." required minLength="3"
                                                          value={data.fax}/>

                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Entrer un email .." required minLength="3"
                                                          value={data.email}/>

                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Container>
                            <Button  type="submit" variant="secondary" size="sm" style={{float:"right"}}>
                                Valider dossier
                            </Button>
                        </Form>
                    <Demandeur/>
                    </Tab>
                    <Tab eventKey="two" title="Données dossier">
                        <AddDossier idc={id}/>
                    </Tab>
                    <Tab eventKey="three" title="Tache">
                        <Tache/>
                    </Tab>
                    <Tab eventKey="four" title="Reglement">
                        <Reglement/>
                    </Tab>
                    <Tab eventKey="five" title="Collaborateur">
                        <Collaborateurdossier/>
                    </Tab>
                    <Tab eventKey="six" title="Sous dossier">
                        <SousDossier/>
                    </Tab>
                </Tabs>

            </div>
        </div>
    )
}