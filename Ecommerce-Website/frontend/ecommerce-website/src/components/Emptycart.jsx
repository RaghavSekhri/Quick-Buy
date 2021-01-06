import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import '../components/emptycart.css'
import {Link} from 'react-router-dom'

export default class Emptycart extends Component {
    render() {
        return (
            <div id="emp-page">
                <Navbar />
                <div>
                    <center><h1 style={{paddingTop:'150px', fontFamily:'Fredoka One',color:'white', fontSize:'50px'}} >Your Cart is Empty</h1></center>
                    <br></br><br></br>
                    <center>
                    <Link to='/home/productlist'>
                        <button className="btn btn-info"style={{fontSize:'25px', borderRadius:'20px'}}>Go back to Products Page</button>
                    </Link>
                    </center>
                </div>
            </div>
        )
    }
}
