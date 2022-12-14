
import {useState, useEffect} from "react";
import AddGreffier from "./add-greffier";
import UpdateGreffier from "./update-greffier";
import DeleteGreffier from "./delete-greffier";
import jwt from 'jwt-decode'
import { useHistory } from 'react-router-dom'

const Greffier  = () => {
    const history = useHistory()
    const [x,setX] = useState(1);
    const [data,setData]= useState([]);
    const [searchTerm,setSearchTerm] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            const Greffier = jwt(token)
            if (!Greffier) {
                localStorage.removeItem('token')
                history.push('/login')
            } else {
                fetch('https://backend-avocat.herokuapp.com/greffiers',{
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization" : `Bearer ${token}`
                    },
                })
                    .then(res => {
                        return res.json();
                    }).then(data => {
                    setData(data)
                }).catch(err =>{
                    console.log("errrrr");
                })
            }
        }

        },[x])

    const refresh = () => {
        setX(x+1);
    };

return(
    <div className='content-wrapper'>
        <br/>
        <br/>
        <div className="row">
            <div className="col-12">
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Liste des Greffiers</h3>

                <div className="card-tools">
                    {/*<Button variant="primary" onClick={handleShow}>
                        Ajouter un utilisateur
                    </Button>*/}
                    <AddGreffier refresh={refresh}/>
                </div>
            </div>
            <div className="card-body table-responsive p-0" style={{height: "300px"}}>
                <p style={{float:"right"}}>
                    <div className="input-group input-group-sm mb-3 right floated " >

                        <input type="text" className="form-control-sm" aria-label="Small" onChange={event => {setSearchTerm(event.target.value)}}
                               aria-describedby="inputGroup-sizing-sm" placeholder="chercher..." style={{borderTop:"none",borderRight:"none",borderLeft:"none"}}/>
                        <div className="input-group-prepend" >
                            <span className="input-group-text" id="inputGroup-sizing-sm" ><i className="fa fa-search"/></span>
                        </div>
                    </div>

                </p>
                <table className="table table-head-fixed text-nowrap table-hover">
                    <thead>
                    <tr>
                       
                        <th>Nom</th>
                        <th>prenom</th>
                        <th>date_nais</th>
                        <th>adresse</th>
                        <th>etat_civile</th>
                        <th>nombre_e</th>
                        <th>type_paye</th>                        
                        <th>base</th>
                        <th>cin</th>
                        <th>Tel</th>
                        <th>categorie</th>
                        <th>echelon</th>
                        <th>cnss</th>
                        <th>contrat</th>
                        <th>sexe</th>
                        <th>date_emb</th>
                        <th>modalite</th>
                        <th>actif</th>                        
                        <th>chef</th>
                        <th>gerant</th>
                        <th>supprimer</th>
                        <th>Modifier</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.filter((data)=>{
                            if(searchTerm === ""){
                                return data
                            }else  {if (data.cin.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                                ( data.nom.toLowerCase().includes(searchTerm.toLowerCase()))||
                                ( data.contrat.toLowerCase().includes(searchTerm.toLowerCase()))||
                                (  data.prenom.toLowerCase().includes(searchTerm.toLowerCase()))) {
                                return data
                            } }
                        }).map((data) => (
                            <tr key={data._id}>
                              
                                <td>{data.nom}</td>
                                <td>{data.prenom}</td>
                                <td>{data.date_nais}</td>
                                <td>{data.adresse}</td>
                                <td>{data.etat_civile}</td>
                                <td>{data.nombre_e}</td>
                                <td>{data.type_paye}</td>
                                <td>{data.base}</td>
                                <td>{data.cin}</td>
                                <td>{data.tel}</td>
                                <td>{data.categorie}</td>
                                <td>{data.echelon}</td>
                                <td>{data.cnss}</td>
                                <td>{data.contrat}</td>
                                <td>{data.sexe}</td>
                                <td>{data.date_emb}</td>
                                <td>{data.modalite}</td>
                                <td>{data.actif}</td>
                                <td>{data.chef}</td>
                                <td>{data.gerant}</td>
                                
                                <td>
                                    {/*  <i className="fas fa-trash" />*/}
                                    <DeleteGreffier refresh={refresh} id={data._id} />
                                </td>
                                <td>
                                    {/*  <i className="fas fa-trash" />*/}
                                    <UpdateGreffier refresh={refresh} id={data._id} data={data} />
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


)}
export default Greffier