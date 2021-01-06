import React, { Component } from 'react';
import Navbar from './Navbar';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../components/details.css';
import Footer from '../components/Footer'
import {Link} from 'react-router-dom'

export default class Details extends Component {
    constructor(props){
        super(props);
        this.state={
            phone : {}
        }
    }
    componentDidMount(){
        console.log(this.props);
        console.log(this.props.match.params.id)
        Axios.get(`http://localhost:2406/AddData/by/${this.props.match.params.id}`)
        .then(res=>{
            console.log(res.data);
            this.setState({
                phone : res.data.phone
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    handleAddToCart = (id,title,img,price,company)=>{
        Axios.post(`http://localhost:2406/AddData/AddToCart`,{
            id :id,
            title:title,
            img:img,
            price:price,
            company:company
        },{
            headers : {
                'authorization' : "token " + localStorage.user
            }
        })
        .then(res=>{
            alert(res.data)
        })
    }

    render() {
        if(localStorage.getItem('user'))
        {
        return (
            <div id="details-page">
                <Navbar />
                <div className="container" style={{paddingTop:'60px'}}>
                    <div style={{paddingTop:'60px'}}>
                        <center><h1 style={{fontFamily:'Abril Fatface', color:'#e65c00'}}>{this.state.phone.title}</h1></center>
                    </div>
                        <div className="left-div">
                            <img src={this.state.phone.img} style={{marginTop:'10px',marginBottom:'30px',width:'auto',height:'400px'}} alt="loading-img"/>
                        </div>
                        <div className="right-div"style={{marginBottom:'30px', paddingTop:'50px'}}>
                            <p > <span id="sub">Model: </span> <span id="obj">{this.state.phone.title}</span></p>
                            <br/>
                            <span id="sub">Made By:</span> <span id="obj">{this.state.phone.company}</span>
                            <br></br><br></br>
                            <span id="sub">Price:</span> <span id="obj">${this.state.phone.price}</span>
                            <br></br><br></br>
                            <span id="sub">Description:</span>
                            <br></br>
                            <span id="obj">{this.state.phone.info}</span>
                            <br></br><br></br><br></br>
                            <button className="btn btn-success" style={{float:'left',marginLeft:'40px'}} onClick={()=>this.handleAddToCart(this.state.phone._id,this.state.phone.title,this.state.phone.img,this.state.phone.price,this.state.phone.company)}>Add to cart</button>
                            <Link to='/home/productlist'>
                                    <button className="btn btn-success" style={{float:'right',marginRight:'300px'}} >Go Back to Products Page</button>
                            </Link>
                        </div>
                </div>
                <Footer />
            </div>
        )
        }
        else
        {
            return(
                <Redirect to='/' />
            )
        }
    }
}
