import React from 'react'
import { useState, useEffect } from 'react'
import jwt from 'jwt-decode'
import { useHistory } from 'react-router-dom'
import AddRecetteFinance from './add-recetteFinance'
import DeleteRecetteFinance from './delete-recetteFinance'
import UpdateRecetteFinance from './update-recetteFinance'

const RecetteFinance = () => {
  const history = useHistory()
  const [x, setX] = useState(1)
  const [data, setData] = useState([])
  const [searchTerm,setSearchTerm] = useState("")

  const refresh = () => {
    setX(x + 1)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      const user = jwt(token)
      if (!user) {
        localStorage.removeItem('token')
        history.push('/login')
      } else {
        fetch('https://backend-avocat.herokuapp.com/parametre/recette_fin', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            console.log(data)
            setData(data)
          })
          .catch((err) => {
            console.log('errrrr')
          })
      }
    }
  }, [x])

  return (
    <section className='content-wrapper'>
      <br />
      <br />
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-header'>
              <h1 className='card-title'>Recette de Finance</h1>

              <div className='card-tools'>
                <AddRecetteFinance refresh={refresh}></AddRecetteFinance>
              </div>
            </div>
            <div
              className='card-body table-responsive p-0'
              style={{ height: '500px' }}
            >
              <p style={{float:"right"}}>
                <div className="input-group input-group-sm mb-3 right floated " >

                  <input type="text" className="form-control-sm" aria-label="Small" onChange={event => {setSearchTerm(event.target.value)}}
                         aria-describedby="inputGroup-sizing-sm" placeholder="chercher..." style={{borderTop:"none",borderRight:"none",borderLeft:"none"}}/>
                  <div className="input-group-prepend" >
                    <span className="input-group-text" id="inputGroup-sizing-sm" ><i className="fa fa-search"/></span>
                  </div>
                </div>

              </p>
              <table className='table table-head-fixed text-nowrap table-hover'>
                <thead>
                  <tr>
                    <th>Libell??</th>
                    <th>Montant</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.filter((data)=>{
                    if(searchTerm === ""){
                      return data
                    }else  {if (data.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ) {
                      return data
                    } }
                  }).map((data) => (
                    <tr key={data._id}>
                      <td>{data.libelle}</td>
                      <td>{data.montant}</td>
                      <td style={{ display: 'flex' }}>
                        <DeleteRecetteFinance
                          refresh={refresh}
                          id={data._id}
                          libelle={data.libelle}
                        ></DeleteRecetteFinance>
                        &nbsp;&nbsp;&nbsp;
                        <UpdateRecetteFinance
                          refresh={refresh}
                          id={data._id}
                          data={data}
                        ></UpdateRecetteFinance>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RecetteFinance