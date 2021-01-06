import React, { Component } from 'react'

import Navbar from '../components/Navbar';
import {Link} from 'react-router-dom'
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import Footer from '../components/Footer';
import  'aos/dist/aos.css';
import Aos from 'aos';
import '../components/productlist.css'

export default class Productlist extends Component {
   constructor(props){
       super(props);
       this.state={
           products : []
       }
   }
    // componentDidMount(){
    //     storeProducts.map(eachProduct=>{
    //         Axios.post('http://localhost:2406/AddData/datacheck',eachProduct)
    //         .then(res=>{
    //           let success = res.data;
    //           console.log(success);
    //         })
    //         .catch(err=>{
    //           console.log(err)
    //         })
    //         return true;
    //       })
    // }

    componentDidMount(){
        Axios.get('http://localhost:2406/AddData/')
        .then(res=>{
            console.log(res.data);
            this.setState({
                products : res.data.products
            })
        })
        .catch(err=>{
            alert (err);
        })
        Aos.init();
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
        console.log(this.state.products);
        return (
            <div>
                <Navbar />
                <div id="product-page">
                    <div className="container">
                        {this.state.products.map((product,index)=>{
                            return(
                                <div className="card" style={{borderRadius:'10px',width: '240px',height:'270px',float:'left', margin:'80px',marginLeft:'180px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                    <center><img className="card-img-top mt-5" src={product.img} alt="Card img cap" style={{width:"100px",height:"90px"}}/></center>
                                    <div className="card-body">
                                        <center><h3 style={{fontFamily: 'Luckiest Guy'}} className="card-title">{product.title}</h3></center>
                                        <center><h4 style={{fontFamily:'Acme'}} className="card-text">Price: ${product.price}</h4></center>
                                        <br></br>
                                        <br></br>
                                        <button className="btn btn-info" style={{float:'left',marginLeft:'40px'}} onClick={()=>this.handleAddToCart(product._id,product.title,product.img,product.price,product.company)}>Add to cart</button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Link to={`/home/details/${product._id}`}>
                                            <button className="btn btn-info" style={{float:'right',marginRight:'40px'}} >Details</button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
                <div>
                    <Footer /> 
                </div>
            </div>
        )
        }
            else{
                return(
                    <Redirect to="/" />
                )
                
            }
    }
}
