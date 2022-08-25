
import {useState, useEffect} from "react";
import AddTypedossier from "./add-typedossier";
import UpdateTypedossier from "./update-typedossier";
import DeleteTypedossier from "./delete-typedossier";
import jwt from 'jwt-decode';
import { useHistory } from 'react-router-dom';
const Typedossier  = () => {
    const [query, setQuery] = useState("");
   const keys = ["libelle"];
    const [searchTerm,setSearchTerm] = useState("")

    const history = useHistory()
    const [x,setX] = useState(1);
    const [data,setData]= useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            const Primegreffier = jwt(token)
            if (!Primegreffier) {
                localStorage.removeItem('token')
                history.push('/login')
            } else {
                fetch('https://backend-avocat.herokuapp.com/typedossiers',{
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
        <form className="form-inline ml-3">
                    <div className="input-group input-group-sm">
                     
                        <div className="input-group-append">
                            <button className="btn btn-navbar" type="submit">
                                <i className="fas fa-search" />
                            </button>
                        </div>
                    </div>
                </form>
        <div className="row">
            <div className="col-12">
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">type de dossiers</h3>
                <div className="card-tools">
                    {/*<Button variant="primary" onClick={handleShow}>
                        Ajouter un utilisateur
                    </Button>*/}
                    <AddTypedossier refresh={refresh}/>
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
                       
                        <th>Libelle</th>
                        <th>supprimer</th>
                        <th>Modifier</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.filter((data)=>{
                            if(searchTerm === ""){
                                return data
                            }else  {if (data.libelle.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return data
                            } }
                        }).map((data) => (
                            <tr key={data._id}>
                              
                                <td>{data.libelle}</td>
                               
                               
                                
                                <td>
                                    {/*  <i className="fas fa-trash" />*/}
                                    <DeleteTypedossier refresh={refresh} id={data._id} />
                                </td>
                                <td>
                                    {/*  <i className="fas fa-trash" />*/}
                                    <UpdateTypedossier refresh={refresh} id={data._id} data={data} />
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
export default Typedossier