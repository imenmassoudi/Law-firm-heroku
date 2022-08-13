import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const history = useHistory()

    const [username, setUserName] = useState('')
    const [pwd, setMdp] = useState('')
    const [data, setData] = useState(null)

    const handleSubmit = async (event) => {
        //  alert(username)
        event.preventDefault()

        /*  const user = {username,pwd};
                fetch('http://localhost:5000/users/login',{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(user)
                }).then(res => {
                    res.map(r => alert(r.username))
                    // setX(x+1);
                })*/
        const response = await fetch('users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                pwd,
            }),
        })

        const data = await response.json()

        if (response.ok) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', data.username)
            window.location.href = '/user'

           
        } else {
            alert('Please check your username and password')
        }
    }
    return (
        <div className='hold-transition login-page'>
            <div className='login-box'>
                <div className='card card-outline card-primary'>
                    <div className='card-header text-center'>
                        <a  className='h1'>
                            <b>Login</b>
                        </a>
                    </div>
                    <div className='card-body'>
                        <p className='login-box-msg'>
                            Connectez-vous
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className='input-group mb-3'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Email'
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                <div className='input-group-append'>
                                    <div className='input-group-text'>
                                        <span className='fas fa-envelope'></span>
                                    </div>
                                </div>
                            </div>
                            <div className='input-group mb-3'>
                                <input
                                    type='password'
                                    className='form-control'
                                    placeholder='Password'
                                    onChange={(e) => setMdp(e.target.value)}
                                />
                                <div className='input-group-append'>
                                    <div className='input-group-text'>
                                        <span className='fas fa-lock'></span>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-7'>
                                    <div className='icheck-primary'>
                                        <input type='checkbox' id='remember' />
                                        <label htmlFor='remember'>Se souvenir de moi</label>
                                    </div>
                                </div>
                                <div className='col-5'>
                                    <button type='submit' className='btn btn-primary btn-block'>
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login