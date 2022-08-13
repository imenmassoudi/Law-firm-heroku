import {useState, useEffect} from "react";
import AddUser from "./add-user";
import DeleteUser from "./delete-user";
import jwt from 'jwt-decode'
import { useHistory } from 'react-router-dom'
import UpdateUser from "./update-user";

const User = () => {
    const history = useHistory()
    const [x, setX] = useState(1);
    const [data, setData] = useState([]);
    const [searchTerm,setSearchTerm] = useState("")
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            const user = jwt(token)
            if (!user) {
                localStorage.removeItem('token')
                history.push('/login')
            } else {
                fetch('users', {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`,
                        'host':'https://firm-management-ensi.herokuapp.com/'
                    },
                })
                    .then(res => {
                        return res.json();
                    }).then(data => {
                    setData(data)
                }).catch(err => {
                    console.log("errrrr");
                })
            }
        }

    }, [x])

    const refresh = () => {
        setX(x + 1);
    };

    return (
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">Liste des utilisateurs</h3>
                                <AddUser refresh={refresh}/>

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
                                        <th style={{textAlign:"center"}}>Nom d'utilisateur</th>
                                        <th style={{textAlign:"center"}}>Nom</th>
                                        <th style={{textAlign:"center"}}>Prenom</th>
                                        <th style={{textAlign:"center"}}>Modifier</th>
                                        <th style={{textAlign:"center"}}>Supprimer</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {data.filter((data)=>{
                                            if(searchTerm === ""){
                                                return data
                                            }else  {if (data.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                ( data.nom.toLowerCase().includes(searchTerm.toLowerCase()))||
                                                (  data.prenom.toLowerCase().includes(searchTerm.toLowerCase()))) {
                                                return data
                                            } }
                                        }).map((data) => (
                                            <tr key={data._id}>
                                                <td style={{textAlign:"center"}}>{data.username}</td>
                                                <td style={{textAlign:"center"}}>{data.nom}</td>
                                                <td style={{textAlign:"center"}}>{data.prenom}</td>
                                                <td style={{textAlign:"center"}}>
                                                    <UpdateUser refresh={refresh} id={data._id} data={data}/>

                                                </td>
                                                <td style={{textAlign:"center"}}>
                                                    <DeleteUser refresh={refresh} id={data._id} username={data.username}/>
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
    {/*   <div className='content-wrapper'>
        <br/>
        <div className="row">
            <div className="col-12">
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Liste des utilisateurs</h3>

                <div className="card-tools">

                    <AddUser refresh={refresh}/>
                </div>
            </div>
            <div className="card-body table-responsive p-0" style={{height: "500px"}}>
                <table className="table table-head-fixed text-nowrap">
                    <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map((data) => (
                            <tr key={data._id}>
                                <td>{data.username}</td>
                                <td>{data.nom}</td>
                                <td>{data.prenom}</td>
                                <td>
                                    <DeleteUser refresh={refresh} id={data._id} username={data.username}/>
                                    <UpdateUser refresh={refresh} id={data._id} data={data}/>
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
*/
    }

}
export default User


