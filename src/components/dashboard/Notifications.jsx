import React, { useEffect, useRef, useState, useContext } from 'react';
import { auth } from '../../firebase'
import { AuthContext } from '../../contexts/AuthContext'

export const Notifications = () => {

    const { isAuth, user } = useContext(AuthContext)
    const aboutRef = useRef('about')

    const [about, setAbout] = useState('About')
    const [message, setMessage] = useState('For Testing Pruposes, If you face any bug or bad user experience, please leave a note here')

    useEffect(() => {
        if (!sessionStorage.getItem('animated')) {
            aboutRef.current.classList.add('animate-about')
            // If component mounts first time then add animate class
            // And create this session storage 
            sessionStorage.setItem('animated', true)
        } else {
            aboutRef.current.classList.remove('animate-about')
        }
    }, [])

    useEffect(() => {
        if (user) {
            const name = user.displayName.split(' ')
            setAbout(`Welcome ${name[0]}`)
            setMessage(`Your ${user.phoneNumber} has been successfuly registered, Enjoy!`)
        } else {
            setAbout('About')
            setMessage('For Testing Pruposes, If you face any bug or bad user experience, please leave a note here')
        }
    }, [isAuth])

    return (
        <div className="about" ref={aboutRef}>
            <div className="container">
                <h5>{about}</h5>
                <p>{message}</p>
            </div>
        </div>
    )
};

export default Notifications;