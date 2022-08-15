import {useEffect} from "react";
import jwt from "jwt-decode";

useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
        const user = jwt(token)
        if (!user) {

            localStorage.removeItem('token')
            history.push('/login')
        } else {
            fetch('https://backend-avocat.herokuapp.com/dossiers',{
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
                const list_id = [];
                data.map((e)=>{
                    fetch('https://backend-avocat.herokuapp.com/emplacements/'+e.emplacement)
                        .then((response) => response.json())

                        .then((res) => {
                            if(list_id.indexOf(res.libelle) === -1) {
                                console.log("**************" + res.libelle)

                                list_id.push(res.libelle);


                            }

                        })
                    setIds(list_id)


                })

            }).catch(err =>{
                console.log("errrrr");
            })
        }
    }

},[x])