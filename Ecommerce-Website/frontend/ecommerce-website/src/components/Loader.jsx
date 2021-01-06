import React from 'react';
import Navbar from '../components/Navbar';

import './loader.css'

const loader = () => {
    return(
        <div>
            <Navbar />
            <div className="loader"></div>
        </div>
    )
}

export default loader;