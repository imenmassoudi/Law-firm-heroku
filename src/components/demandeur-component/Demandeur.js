
import {useState, useEffect} from "react";
import AddDemandeur from "./add-demandeur";
import DeleteDemandeur from "./delete-demandeur";
import jwt from 'jwt-decode'
import { useHistory } from 'react-router-dom'

const Demandeur  = () => {
    const history = useHistory()
    const [x,setX] = useState(1);
    const [data,setData]= useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            const Demandeur = jwt(token)
            if (!Demandeur) {
                localStorage.removeItem('token')
                history.push('/login')
            } else {
                fetch('https://backend-avocat.herokuapp.com/demandeur',{
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
    <div className=''>

<br />
        <div className="row">

            <div className="col-12">
        <div className="card">
            <div className="card-header">
             

                <div className="card-tools">
                    {/*<Button variant="primary" onClick={handleShow}>
                        Ajouter un utilisateur
                    </Button>*/}
                    <AddDemandeur refresh={refresh}/>
                </div>
            </div>
            <div className="card-body table-responsive p-0" style={{height: "300px"}}>
                <table className="table table-head-fixed text-nowrap">
                    <thead>
                    <tr>
                       
                        <th>Nom</th>
                        <th>CIN</th>
                        <th>adresse</th>
                        <th>adresse designé</th>
                        <th>Tel</th>
                        <th>fax</th>

                        <th>supprimer</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map((data) => (
                            <tr key={data._id}>
                              
                                <td>{data.nom}</td>
                                <td>{data.cin}</td>
                                <td>{data.adresse}</td>
                                <td>{data.adressedesigne}</td>
                                <td>{data.tel}</td>
                                <td>{data.fax}</td>


                                
                                <td>
                                    {/*  <i className="fas fa-trash" />*/}
                                    <DeleteDemandeur refresh={refresh} id={data._id} />
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
export default Demandeur