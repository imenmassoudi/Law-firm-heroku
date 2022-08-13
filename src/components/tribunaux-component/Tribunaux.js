import {Card} from "react-bootstrap"
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import jwt from "jwt-decode";
import AddTribunaux from "./add-tribunaux";
import DeleteTribunal from "./delete-tribunal";
import UpdateTribunal from "./update-tribunal";
import {Link} from "react-router-dom";

const Tribunaux = () => {
    const history = useHistory()
    const [x,setX] = useState(1);
    const [data,setData]= useState([]);
    const [searchTerm,setSearchTerm] = useState("")
    const p = "/services/"
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            const user = jwt(token)
            if (!user) {
                localStorage.removeItem('token')
                history.push('/login')
            } else {
                fetch('http://localhost:5000/tribunaux',{
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
            <div className="card " style={{marginLeft:"250px",width:"800px"}}>
                <div className="card-header" style={{backgroundColor:"rgb(209 203 183)",color:"white"}}>
                    <h3 className="card-title" >Tribunaux</h3>
                    <p style={{float:"right"}}>
                        <div className="input-group input-group-sm mb-3 right floated " >

                            <input type="text" className="form-control-sm" aria-label="Small" onChange={event => {setSearchTerm(event.target.value)}}
                                   aria-describedby="inputGroup-sizing-sm" placeholder="chercher..." style={{borderTop:"none",borderRight:"none",borderLeft:"none"}}/>
                            <div className="input-group-prepend" >
                                <span className="input-group-text" id="inputGroup-sizing-sm" ><i className="fa fa-search"/></span>
                            </div>
                        </div>

                    </p>
                </div>
<br/>
                <div className="row" >
                    {data.filter((data)=>{
                        if(searchTerm === ""){
                            return data
                        }else  {if (data.lieu.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return data
                        } }
                    }).map((data) => (
                        <div className="col-lg-3 col-6" key={data._id} style={{marginLeft:"20px"}}>
                            <div className="small-box " style={{backgroundColor:"#c4c6c7"}}>
                                <div className="inner" >

                                    <span className="inner" style={{display:"flex"}}>
                                        <h5 style={{color:"white"}}>
                                            {data.lieu} &nbsp;</h5>
                                        <span style={{color:"white"}}>
                                            <UpdateTribunal refresh={refresh} id={data._id} data={data}/>

                                        </span>
                                        <span style={{color:"white"}}>
                                            <DeleteTribunal refresh={refresh} id={data._id} />
                                        </span>
                                    </span>
                                    <br/>


                                </div>
                                <div className="icon">
                                    <i className="fas fa-building"/>
                                </div>
                                <Link to={p+data._id} className="small-box-footer">
                                    Consulter Services <i className="fas fa-arrow-circle-right"/>
                                </Link>
                            </div>

                        </div>

                    ))}<br/>
                    <AddTribunaux refresh={refresh}/>

                </div>
                     </div>
        </div>)
            {/*    <card >
                <Card.Body className="row">

    {data.map((data) => (
                        <div className="col-lg-3 col-6" key={data._id}>
                            <div className="small-box " style={{backgroundColor:"#81c4da"}}>
                                <div className="inner">
                                    <h4 style={{color:"white",display:"inline-block"}}>
                                        {data.lieu} &nbsp;
                                        <UpdateTribunal refresh={refresh} id={data._id} data={data}/>

                                    </h4>

                                    <p style={{color:"white"}}>
                                        <DeleteTribunal refresh={refresh} id={data._id} />
                                    </p>
                                </div>
                                <div className="icon">
                                    <i className="fas fa-building"/>
                                </div>
                                <Link to={p+data._id} className="small-box-footer">
                                    Consulter Services <i className="fas fa-arrow-circle-right"/>
                                </Link>
                            </div>

                        </div>

                    ))}<br/>
              <AddTribunaux refresh={refresh}/>
                </Card.Body>


    </card>*/}

            }



export default Tribunaux