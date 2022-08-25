import {useState, useEffect} from "react";
import AddCollaborateurdossier from "./add-collaborateurdossier";

import jwt from 'jwt-decode'
import { useHistory } from 'react-router-dom'

const Collaborateurdossier  = () => {
    const history = useHistory()
    const [x,setX] = useState(1);
    const [data,setData]= useState([]);

    const refresh = () => {
        setX(x+1);
    };

    return(
        <div className=''>
            <br/>
            <br/>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Liste des collaborateur</h3>
                            <br />
                            <br />


                            <AddCollaborateurdossier refresh={refresh}/>
                        </div>



                    </div>
                </div>
            </div>
        </div>


    )}
export default Collaborateurdossier