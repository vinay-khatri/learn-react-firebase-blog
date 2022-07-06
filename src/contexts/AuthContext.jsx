import React, { createContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {

    const [isAuth, setIsAuth] = useState('')
    const [user, setUser] = useState('')

    useEffect(() => {
        // onAuthStateChanged listener returns an unsubscribe() function
        // which i have stored in authState
        // we call this function to unsubscribe before unmounting
        const authState = auth.onAuthStateChanged(user => {
            if (user) {
                setIsAuth(true)
                setUser(user)
                // store user on session storage(similar to local storage)
                sessionStorage.setItem('user', true)
            } else {
                setIsAuth(false)
                setUser('')
                props.history.push('/')
                // remove user details from session storage on sign out
                sessionStorage.removeItem('user')
            }
        })
        // return inside useEffect hook works as ComponentWillUnmount() lifecycle method
        return () => {
            // unsubscribing auth state change listener before unmount
            authState()
        };
    }, [isAuth])

    const signOut = () => {
        auth.signOut()
            .then()
            .catch(err => console.log(err))
    }

    return (
        <AuthContext.Provider value={{ isAuth, user, signOut }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default withRouter(AuthContextProvider);