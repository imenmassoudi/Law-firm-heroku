import {useHistory} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import jwt from "jwt-decode";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ReclasserDossier from "./reclasser-dossier-component";
import Archive from "../Archive-component/Archive";
import DeleteDossier from "./Supprimer-dossier";
import ReactToPrint from "react-to-print";
import PrintComponent from "../print/PrintComponent";

const Dossiers = () => {
    const ids = ["1"];

    const history = useHistory()
    const [x, setX] = useState(1);
    const [data, setData] = useState([]);
    const [nom, setNom] = useState([]);
    const [emplacement, setEmplacement] = useState([]);
    const [tel, setTel] = useState([]);

    const [searchTerm,setSearchTerm] = useState("")

    function findEmplacement(id){
        fetch('http://localhost:5000/emplacements/'+id)
            .then((response) => response.json())

            .then((res) => {

                    setEmplacement(res.libelle)


            })

        return emplacement
    }

    function findClientByID(id)  {
        fetch('http://localhost:5000/clients/'+id)
        .then((response) => response.json())
        .then((res) => {
            console.log(res)
            setNom(res.nom)
            setTel(res.tel)
        })
        return nom
    }
    let componentRef = useRef();

    // const dispatch = useDispatch();
     // const stableDispatch = useCallback(dispatch, []);

    // useEffect(() => {
    //     const script = document.createElement('script');
    //
    //     script.src = "test.js";
    //     script.async = true;
    //
    //     document.body.appendChild(script);
    //     script.innerHTML = "document.write('This is output by document.write()!')";
    //
    //     // return () => {
    //     //     document.body.removeChild(script);
    //     // }
    // }, []);
    useEffect(() => {

        const token = localStorage.getItem('token')

        if (token) {
            const user = jwt(token)
            if (!user) {

                localStorage.removeItem('token')
                history.push('/login')
            } else {
                fetch('http://localhost:5000/dossiers/all',{
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization" : `Bearer ${token}`
                    },
                })
                    .then(res => {
                       return res.json();
                    }).then(data =>
                {
                    setData(data)
                    console.log(data)
                }).catch(err =>{
                    console.log("errrrr");
                })
            }
        }
        //stableDispatch();

    },[x])

    const refresh = () => {
        setX(x+1);
    };

    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-12">

                    <div className="card" ref={el =>(componentRef=el)}>
                        <div className="card-header">
                            <h3 className="card-title">Liste des dossiers</h3>
                           <span style={{float:"right"}}>
                                <ReactToPrint
                                    trigger={() => {
                                        // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                                        // to the root node of the returned component as it will be overwritten.
                                        return <a href="#">Imprimer la liste</a>;
                                    }}
                                    content={() => componentRef}
                                />
                           </span>
                        </div>
                        <div className="card-body">
                            <p style={{float:"right"}}>
                                <div className="input-group input-group-sm mb-3 right floated " >

                                    <input type="text" className="form-control-sm" aria-label="Small" onChange={event => {setSearchTerm(event.target.value)}}
                                           aria-describedby="inputGroup-sizing-sm" placeholder="chercher..." style={{borderTop:"none",borderRight:"none",borderLeft:"none"}}/>
                                    <div className="input-group-prepend" >
                                        <span className="input-group-text" id="inputGroup-sizing-sm" ><i className="fa fa-search"/></span>
                                    </div>
                                </div>

                            </p>

                        <table id="example2" className="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th style={{textAlign:"center"}}>Numéro affaire</th>
                                    <th style={{textAlign:"center"}}>Lieu</th>
                                    <th style={{textAlign:"center"}}>Type dossier</th>
                                    <th style={{textAlign:"center"}}>Emplacement</th>
                                    <th style={{textAlign:"center"}}>Client</th>
                                    <th style={{textAlign:"center"}}>Tel</th>
                                    <th style={{textAlign:"center"}}>Mission</th>
                                    <th style={{textAlign:"center"}}>Reclasser</th>
                                </tr>
                                </thead>
                                <tbody>

                                {data.filter((data)=>{
                                    if(searchTerm === ""){
                                        return data
                                    }else  {if (data.numAffaire.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        ( data.lieu.toLowerCase().includes(searchTerm.toLowerCase()))||
                                        (  data.typeDossier.toLowerCase().includes(searchTerm.toLowerCase()))||
                                        (data.mission.toLowerCase().includes(searchTerm.toLowerCase()))||
                                        (data.emplacement.toLowerCase().includes(searchTerm.toLowerCase()))) {
                                        return data
                                    } }
                                })
                                .map((data, index) =>(
                                    <tr key={data._id} >
                                        <td style={{textAlign:"center"}}>{data.numAffaire}</td>
                                        <td style={{textAlign:"center"}}>{data.lieu}</td>
                                        <td style={{textAlign:"center"}}>{data.typeDossier}</td>
                                        <td style={{textAlign:"center"}}>
                                            {data.lib[0].libelle}

                                        </td>
                                        <td style={{textAlign:"center"}}>
                                            {data.clientC[0].nom}

                                        </td>
                                        <td style={{textAlign:"center"}}>
                                            {data.clientC[0].tel}

                                    </td>
                                        <td style={{textAlign:"center"}}>{data.mission}</td>
                                        <td style={{textAlign:"center"}}>
                                            <p style={{textAlign:"center"}}>
                                                <ButtonGroup className="mb-2">
                                                    <ReclasserDossier refresh={refresh} id={data._id}/>
                                                    <Archive refresh={refresh} idDossier={data._id}/>
                                                    <DeleteDossier refresh={refresh} id={data._id} username={data.username}/>

                                                </ButtonGroup>
                                            </p>

                                        </td>

                                    </tr>

                                ))}


                                </tbody>

                            </table>

                        </div>
                    </div>

                </div>
            </div>

        </div>

)
}
export default Dossiers