import React from 'react';
import './Home.css';
import Cards from './Cards';
import Footer from './Footer';
import { Container, Typography, Button } from '@material-ui/core';

function Home() {
    return (
        <>
            <div className='section-container'>
                <br />
                <br />
                <br />
                <h1>ADVENTURE AWAITS</h1>
                <p>What are you waiting for?</p>
                <Button size="large" type="button" variant="contained" color="primary">GET STARTED</Button>
            </div>
            <Cards />
            <Footer />
        </>
    );
}

export default Home;
