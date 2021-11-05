import React from 'react'
import logo from '../../yarniconwhite.png'
import './splashpage.css'

function SplashPage() {
    return(
        <div className="logo-div">
            <img src={logo} alt="Logo" className="splash-logo"/>
            <h2 className="h2">Keep your inspirations here.</h2>
        </div>
    )
}

export default SplashPage
