import React, { useState } from 'react'
import { auth } from '../../firebase'
import M from "materialize-css"

export const SignIn = (props) => {

    const [phoneLogin, setPhoneLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')

    const signIn = (e) => {
        e.preventDefault();
        console.time('login')
        console.time('login-projectFetched')
        props.history.push('/redirecting')
        auth.signInWithEmailAndPassword(`+91${phoneLogin}@dummy.com`, passwordLogin)
            .then(() => {
                props.history.push('/')
                console.timeEnd('login')
                console.time('authChange')
            })
            .catch(err => {
                alert(err)
                props.history.push('/signin')
            })
    }

    return (
        <div className="container">
            <form onSubmit={signIn} className="blue-grey darken-3">
                <h5 className="grey-text text-lighten-1">SignIn</h5>
                <div className="input-field">
                    <label htmlFor="phoneLogin">Phone Number</label>
                    <input type="text" pattern="^[6-9][0-9]{9}$" name="phoneLogin" id="phoneLogin" value={phoneLogin} onChange={e => setPhoneLogin(e.target.value)} required autoComplete='off' />
                </div>
                <div className="input-field">
                    <label htmlFor="passwordLogin">Password</label>
                    <input type="password" pattern="^[\w@]{8,20}$" name="passwordLogin" id="passwordLogin" value={passwordLogin} onChange={e => setPasswordLogin(e.target.value)} required />
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Login</button>
                </div>
            </form>
        </div>
    )
};

export default SignIn;