import {Button, Form, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Select from 'react-select';
import jwt from "jwt-decode";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddCollaborateurdossier = (refresh) =>{
 
   const [checked, setChecked] = useState([]);
   const [checked1, setChecked1] = useState([]);
   const [checked2, setChecked2] = useState([]);
   const [checked3, setChecked3] = useState([]);
   const [verif1, setVerif1] = useState(false);
   const [verif2, setVerif2] = useState(false);
   const [forfait,setForfait] = useState("");
   const [pourcentage,setPourcentage] = useState("");
   const [verif3, setVerif3] = useState(false);
   const [verif4, setVerif4] = useState(false);
    const [nom,setNom] = useState("");
    const [part,setPart] = useState("");
    const [type,setType] = useState("");
    const [mode,setMode] = useState("");
    const [num,setNum] = useState("");
    const [code_postale,setCode_postale] = useState("");
    const [activite,setActivite] = useState("");
    const [tel,setTel] = useState("");
    const [modeReglement,setModeReglement] = useState([]);
    const [partCollaborateur,setPartCollaborateur] = useState([]);
    const [typeReglement,setTypeReglement] = useState([]);
     const [options,setOptions] = useState([]);
     const [options1,setOptions1] = useState([]);
    const [show, setShow] = useState(false);
    const [idCollab, setIdCollab] = useState("");
    const [data, setData] = useState([]);

    const [idDossier,setIdDossier] = useState("");



    useEffect(()=>{
        const token = localStorage.getItem('token')


        const option1 = []
        if (token) {
            const dossiers = jwt(token)
            if (!dossiers) {
                localStorage.removeItem('token')
                //   history.push('/login')
            } else {
                fetch('http://localhost:5000/dossiers',{
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization" : `Bearer ${token}`
                    },
                }) .then(res => {
                    return res.json();
                })
                    .then(res => {
                        res.map((res) => {
                            console.log(res)
                            if(option1.indexOf(res.cin) === -1){
                                console.log("le")
                                option1.push({
                                    value: res._id,
                                    label: res.numAffaire,
                                })
                                setOptions1(option1)
                            }

                        })
                    }).catch(err =>{
                    console.log("errrrr");
                })}}
        const option = []
        if (token) {
            const Collaborateurs = jwt(token)
            if (!Collaborateurs) {
                localStorage.removeItem('token')
                //   history.push('/login')
            } else {
                fetch('http://localhost:5000/collaborateurs', {
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
                            if (option.indexOf(res.nom) === -1) {
                                console.log("le")
                                option.push({
                                    value: res._id,
                                    label: res.nom + ":" + res.cin,
                                })
                                setOptions(option)
                            }

                        })
                    }).catch(err => {
                    console.log("errrrr");
                })
            }
        } },[])

    const handleClose = () => setShow(false);
    const handleShow = () =>  {
        setShow(true)

    const token = localStorage.getItem('token')
   
        
        const option = []
        if (token) {
            const collaborateurs = jwt(token)
            if (!collaborateurs) {
                localStorage.removeItem('token')
                //   history.push('/login')
            } else {
                fetch('http://localhost:5000/collaborateurs',{
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization" : `Bearer ${token}`
                    },
                }) .then(res => {
                    return res.json();
                })
                    .then(res => {
                        res.map((res) => {
                            console.log(res)
                            console.log(option)
                            if(option.indexOf(res.cin) === -1){
                                console.log("le")
                                option.push({
                                    value: res._id,
                                    label: res.nom+":"+res.cin,
                                })
                                setOptions(option)
                            }

                        })
                    }).catch(err =>{
                    console.log("errrrr");
                })
            }
        }
    
    };
 
      
        const [validated, setValidated] = useState(false);

        const handleSubmit = (event) => {
            const mode = checked[0];
            const type = checked2[0];
            console.log(mode)
                    const collaborateurdossier = {idCollab,part,mode,type,idDossier};
                    alert(collaborateurdossier)
                    fetch('http://localhost:5000/reglementCollab/add',{
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body: JSON.stringify(collaborateurdossier)
                    }).then(() => {console.log("new Collaborateur dossier added");
                      //  handleClose();
                        //refresh();

                    })

            setValidated(true);


    };
    const handleChange = (e) => {
        var updatedList = [...checked];
        var updatedList1 = [...checked1];
      
        let isChecked = e.target.checked;
        if (isChecked) {
            if (e.target.value === "mensuel") {
                setVerif2(true)

                updatedList.push("Mensuel")

                //   setTabAudience(tab=> [tab, "Lundi"])
            } else if (e.target.value === "surdossier") {
                setVerif1(true)
                updatedList.push("Mensuel")


            }
           
        } else {
            if (e.target.value === "mensuel") {
                setVerif2(false)
                updatedList.splice(checked.indexOf("Mensuel"), 1);

            } else if (e.target.value === "surdossier") {
                setVerif1(false)
                updatedList.splice(checked.indexOf("Mensuel"), 1);


            }
          
            
        }
       
        setChecked(updatedList);

        // do whatever you want with isChecked value
    }
  
  
    const handleonChange = (e) => {
        let isChecked = e.target.checked;
        var updatedList2 = [...checked2];
        var updatedList3 = [...checked3];
    if(isChecked){
       
        
        if (e.target.value === "forfait") {
           setVerif4(true)
           updatedList2.push("Forfait")



       } else if (e.target.value === "pourcentage") {
           setVerif3(true)
           updatedList2.push("pourcentage")


       }}else{  if (e.target.value === "forfait") {
           setVerif4(false)
           updatedList2.splice(checked.indexOf("Forfait"), 1);


       } else if (e.target.value === "pourcentage") {
           setVerif3(false)
           updatedList2.splice(checked.indexOf("pourcentage"), 1);

       } }
    
       setChecked2(updatedList2);


    }
  return(
      <div className="row">
          <div className="col-12">

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Container>
                      <Row>
                          <Col>
                              <label>Client</label>
                              <Select options={options}   onChange={(e) => {
                                  fetch('http://localhost:5000/Collaborateurs/findCollab/'+e.value)
                                      .then((response) => response.json())
                                      .then((data) => {
                                          setData(data)
                                          setIdCollab(data._id)
                                      })
                              }}  />
                          </Col>
                          <Col>
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                  <Form.Label>Nom collaborateur</Form.Label>
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
                      </Row>
                  </Container>


                  <Container>
                      <Row>
                          <Col>
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                                  <Form.Label>Part collaborateur</Form.Label>
                                  <Form.Control type="number" placeholder="Entrer un tel .." required minLength="3"
                                                onChange={(e)=>setPart(e.target.value)}
                                  />
                              </Form.Group>
                          </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Code dossier</Form.Label>
                                <Select options={options1}        onChange={(e) => setIdDossier(e.value)}/>

                            </Form.Group>
                        </Col>

                      </Row>
                  </Container>

                          {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Label>mode reglement</Form.Label><br/>
                                <Form.Check  onChange={e => handleChange(e)}
                                    inline
                                    label="Mensuel"
                                             value="mensuel"
                                             disabled={verif1}
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />

                                <Form.Check onChange={e => handleChange(e)}
                                    inline
                                    label="sur Dossier"
                                    value="surdossier"
                                    disabled={verif2}
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />

                            </div>
                        ))}
                      {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                                <Form.Label>Type Réglement</Form.Label><br/>
                                <Form.Check  onChange={e => handleonChange(e)}
                                    inline
                                    label="forfait"
                                             value="forfait"
                                             disabled={verif3}
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />

                                <Form.Check onChange={e => handleonChange(e)}
                                    inline
                                    label="pourcentage"
                                    value="pourcentage"
                                    disabled={verif4}
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                />

                            </div>
                        ))}



                  <Button  type="submit" variant="secondary" size="sm" style={{float:"right"}}>
                      Valider dossier
                  </Button>

                      </Form>

          </div>
      </div>

  )
}
export default AddCollaborateurdossier;