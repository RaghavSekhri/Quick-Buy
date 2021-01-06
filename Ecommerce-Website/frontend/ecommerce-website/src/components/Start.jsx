import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import {Redirect} from 'react-router-dom';
import  'aos/dist/aos.css';
import Aos from 'aos';
import Footer from '../components/Footer'
import '../components/start.css'

export default class Start extends Component {
componentDidMount(){
    Aos.init();
}
handleexplore = () =>{
    window.location='/home/productlist'
}
    render() {
        if(localStorage.getItem('user')){
            return (
                <div>
                    <Navbar />
                    <div className="overall-start" style={{marginTop:0, paddingBottom : 20, background : "#f8f9fa"}}>
                        <div className="homepage">
                                <button className="explore-products-button" onClick={()=>this.handleexplore()}><span><i className="fas fa-dungeon"></i>&nbsp;&nbsp;Explore Our Items</span></button>
                        </div>
                        <br></br><br></br>
                        <div className="first-scroll" data-aos="fade-right">
                            <div className="first-scroll-image"></div>
                            <div className="first-scroll-text">
                                <center>60%-70% off</center>
                                <center>on Watches</center>
                            </div>
                        </div>
                        <br></br>
                        <div data-aos="flip-left">
                            <div className="fixed-photo"></div>
                        </div>
                        <br></br>
                        <div className="second-scroll" data-aos="fade-left">
                            <div className="second-scroll-text">
                                <center>40%-50% off</center>
                                <center>on Mobiles</center>
                            </div>
                            <div className="second-scroll-image"></div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        }
        else
        {
            return(
                <Redirect to="/" />
            )  
        }
    }
}
