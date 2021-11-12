import React from 'react';
import './aboutpage.css'

function AboutPage() {
    return(
        <>
        <h2 className="aboutApp">About the App:</h2>
            <p className="about-p">Welcome to the YarnNotes! This app was developed by Rachel White, and is intended to keep track of all of your crochet/knitting projects and ideas. Check out the links below!</p>
        <div className="social-media">
            <a href="https://github.com/rcwhite96" className="media-links">
                <i class="fab fa-github-square"></i>
            </a>
            <a href="https://www.linkedin.com/in/rachel-white-419370156/" className="media-links">
                <i class="fab fa-linkedin"></i>
            </a>
        </div>
        </>
    )
}

export default AboutPage
