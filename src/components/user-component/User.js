import {useState, useEffect} from "react";
import AddUser from "./add-user";
import DeleteUser from "./delete-user";
import jwt from 'jwt-decode'
import { useHistory } from 'react-router-dom'

const User = () => {
    const history = useHistory()
    const [x,setX] = useState(1);
    const [data,setData]= useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            const user = jwt(token)
            if (!user) {
                localStorage.removeItem('token')
                history.push('/login')
            } else {
                fetch('http://localhost:5000/users',{
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
                <h3 className="card-title">Liste des utilisateurs</h3>

                <div className="card-tools">
                    {/*<Button variant="primary" onClick={handleShow}>
                        Ajouter un utilisateur
                    </Button>*/}
                    <AddUser refresh={refresh}/>
                </div>
            </div>
            <div className="card-body table-responsive p-0" style={{height: "300px"}}>
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
                                    {/*  <i className="fas fa-trash" />*/}
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


)}
export default User


