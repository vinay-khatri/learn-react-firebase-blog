import React, { useState, useRef, useEffect } from 'react';
import firebase from 'firebase/app'
import { auth } from '../../firebase'
import M from "materialize-css"

export const SignUp = (props) => {

    const captchaRef = useRef('sign-in-button');
    const otpFormRef = useRef('otp-form');

    const [phone, setPhone] = useState('')
    const [otp, setOTP] = useState('')
    const [verifier, setVerifier] = useState('')
    const [result, setResult] = useState('')

    useEffect(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(captchaRef.current, {
            'size': 'invisible',
            'callback': function (response) {
                console.log('reCAPTCHA solved')
            }
        });
        setVerifier(window.recaptchaVerifier)
    }, [])

    const sendOTP = e => {
        e.preventDefault();
        // auth.useDeviceLanguage();
        otpFormRef.current.style.display = 'block';
        auth.signInWithPhoneNumber(`+91${phone}`, verifier)
            .then(function (confirmationResult) {
                window.confirmationResult = confirmationResult;
                setResult(confirmationResult)
            }).catch(err => alert(err));
    }

    const verifyOTP = e => {
        e.preventDefault();
        result.confirm(otp)
            .then(result => {
                props.history.push('/signup-details')
                const dummyEmail = result.user.phoneNumber + '@dummyExec.com';
                result.user.updateEmail(dummyEmail);
            }).catch(err => alert(err));
    }



    return (
        <div className="container">
            <form onSubmit={sendOTP} className="blue-grey darken-3">
                <h5 className="grey-text text-lighten-1">Signup With Mobile</h5>
                <div className="input-field">
                    <label htmlFor="phone">Mobile Number</label>
                    <input type="text" pattern="^[6-9][0-9]{9}$" id="phone" name="phone" value={phone} onChange={e => setPhone(e.target.value)} required autoComplete='off' />
                </div>
                <div className="input-field">
                    <button ref={captchaRef} className="btn pink lighten-1 z-depth-0">Sign Up</button>
                </div>
            </form>
            <form onSubmit={verifyOTP} ref={otpFormRef} className="blue-grey darken-3" style={{ display: 'none' }}>
                <div className="input-field">
                    <label htmlFor="otp">Enter OTP</label>
                    <input type="text" pattern="^[0-9]{6}$" id="otp" name="otp" value={otp} onChange={e => setOTP(e.target.value)} required autoComplete='off' />
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Confirm OTP</button>
                </div>
            </form>
        </div>
    )
};


export const SignUpDetails = (props) => {

    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [name, setName] = useState('')

    const signUpDetails = e => {
        e.preventDefault();
        // set password on user account. So user can sign-in with phone(dummyEmail) and password without otp again
        auth.currentUser.updateProfile({
            displayName: name.trim().toLowerCase(),
        }).then(() => {
            auth.currentUser.updatePassword(password)
                .then(() => props.history.push('/'))
        })
    }

    return (
        <div className="container">
            <form onSubmit={signUpDetails} className="blue-grey darken-3">
                <h5 className="grey-text text-lighten-1">Create New Account</h5>

                <div className="input-field">
                    <label htmlFor="password">Set Password</label>
                    <input type="password" pattern="^[\w@]{8,20}$" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="input-field">
                    <label htmlFor="rePassword">Confirm Password</label>
                    <input type="password" pattern="^[\w@]{8,20}$" id="rePassword" name="rePassword" value={rePassword} onChange={e => setRePassword(e.target.value)} required />
                </div>
                <div className="input-field">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" pattern="^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$" id="name" value={name} name="name" onChange={e => setName(e.target.value)} required autoComplete='off' />
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
                </div>
            </form>
        </div>
    )
};


export default SignUp;