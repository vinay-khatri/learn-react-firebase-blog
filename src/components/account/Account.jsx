import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'

export const Account = () => {

    const { user } = useContext(AuthContext)

    return (
        <div className="user-card card">
            <div className="name"> Name : {user.displayName}</div>
            <div>Phone Number : {user.phoneNumber}</div>
        </div>
    )
};

export default Account;