import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../components/navbar.css'
import {Link} from 'react-router-dom'
import {Nav} from 'react-bootstrap'

export default class Navbar extends Component {

    handlelogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
    }

    render() {
        return (
            <div className="navbar-fixed-top">
                <Nav className="navbar navbar-inverse nav" style={{marginBottom :0}} role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        </div>
                        <Link style={{paddingTop:"8px"}} className="navbar-brand" to="/home"><span style={{fontFamily: 'Dancing Script', fontSize:'30px'}}>Quick Buy</span></Link>
                        <div className="collapse navbar-collapse" id="navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-left">
                            <li className="prod-bttn"><Link to="/home/productlist"><i className="fas fa-store"></i>&nbsp;Products</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right list " style={{display:"inline"}}>
                            <li className="cart-button"><Link to="/home/cart"><i className="fab fa-opencart"></i>&nbsp;My cart</Link></li>
                            <li><Link className="logout-button"onClick={this.handlelogout} to="/"><i className="fas fa-sign-out-alt"></i>&nbsp;Logout</Link></li>
                        </ul>
                        </div>
                    </div>
                </Nav>
            </div>
        )
    }
}