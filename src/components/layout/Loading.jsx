import React from 'react'

export const LoadingScreen = () => {

    return (
        <div className="wrap">
            <div className="loading">
                <div className="bounceball"></div>
                <div className="text">Redirecting...</div>
            </div>
        </div>
    )
};

export default LoadingScreen;