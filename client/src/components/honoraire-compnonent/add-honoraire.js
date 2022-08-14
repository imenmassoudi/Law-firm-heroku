import {Button, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import jwt from "jwt-decode";
import Select from "react-select";


const AddHonoraire = (refresh) => {
    const [mensuel,setMensuel] = useState("");

    const [Surdossier,setSurdossier] = useState("");
   
    const [honoraireAvocat,setHonoraireAvocat] = useState("");
    const [netApayer,setNetApayer] = useState("");
    const [options,setOptions] = useState([]);
    const [id,setId] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        let idDossier=id;
        const form = event.currentTarget;
        const Honoraire = {honoraireAvocat,netApayer,idDossier};
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            fetch('http://localhost:5000/honoraires/add',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(Honoraire)
            }).then(() => {console.log("new blog added");
                handleClose();
                refresh();
                // setX(x+1);
            })
        }
        setValidated(true);
        
          }

    useEffect(() => {
        const token = localStorage.getItem('token')


        const option = []
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
                            console.log(option)
                            if(option.indexOf(res.numAffaire) === -1){
                                console.log("le")
                                option.push({
                                    value: res._id,
                                    label: res.numAffaire,
                                })
                                setOptions(option)
                            }

                        })
                    }).catch(err =>{
                    console.log("errrrr");
                })
            }
        }
    },[])

  
  return(
      <div className="row">
          <div className="col-12">
           
          
                      <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        

     
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>honoraire avocat</Form.Label>
                              <Form.Control type="text" placeholder="montant" required
                                            onChange={(e) => setHonoraireAvocat(e.target.value)}/>
                      
                          </Form.Group>
                        
                        
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>net a payer</Form.Label>
                              <Form.Control type="text" placeholder="type" required
                                            onChange={(e) => setNetApayer(e.target.value)}/>
               
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPassword">
                              <Form.Label>num affaire</Form.Label>
                              <Select options={options}  onChange={(e) => setId(e.value)}/>

                          </Form.Group>
                        
                          <hr/>

                          <Button  type="submit" variant="secondary" size="sm" style={{float:"right"}}>
                              Valider
                          </Button>
                      </Form>

          </div>
      </div>

  )
}
export default AddHonoraire;