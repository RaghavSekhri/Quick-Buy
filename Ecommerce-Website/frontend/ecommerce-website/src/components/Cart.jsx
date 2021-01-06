import React, { Component } from 'react';
import Navbar from './Navbar';
import Axios from 'axios';
import { Redirect , Link} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Loader from './Loader';
import Footer from '../components/Footer'
import '../components/cart.css'
import EmptyCart from '../components/Emptycart'

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state={
            phone : [],
            total:0,
            loading: false
        }
    }
    increment=async (index)=>{
        this.setState({
            loading: true
        })
        
       const phone = await this.state.phone.filter(eachPhone=>{
            if(eachPhone.productId === index){
                eachPhone.productQuantity++;
                return true;
            }
            return true
        })

        this.setState({
            phone : phone
        })

        const user = await jwt.decode(localStorage.getItem('user'),'secret');
        let data = await Axios.put(`http://localhost:2406/AddData/updateInc/${user._id}/${index}/1`);
        console.log(data.data);
        this.setState({
            loading: false
        })

      };
      
      decrement=async (index)=>{
        this.setState({
            loading: true
        })
        var flag=1;
        const phone = await this.state.phone.filter(eachPhone=>{
             if(eachPhone.productId === index){
                 if(eachPhone.productQuantity>1)
                {
                 eachPhone.productQuantity--;
                    flag=1;
                    return true;
                }
                else
                {
                    eachPhone.productQuantity=1;
                    flag=0;
                    this.setState({
                        loading: false
                    })
                    alert("Quantity can't be less than one, Please trying removing the item from the cart");  
                    return false;
                }
             }
             return true
         })
        if(flag===1)
        {
            this.setState({
                phone : phone
            })
            const user = await jwt.decode(localStorage.getItem('user'),'secret');
            let data = await Axios.put(`http://localhost:2406/AddData/updateDec/${user._id}/${index}/1`);   
            console.log(data.data);
        }
        this.setState({
            loading: false
        })
       };

      del=async (index)=>{
        this.setState({
            loading: true
        })
        const user = await jwt.decode(localStorage.getItem('user'),'secret');
        Axios.delete(`http://localhost:2406/AddData/deleteCart/${user._id}/${index}`);
        const phone = this.state.phone.filter(eachPhone=>{
            if(eachPhone.productId!==index){
                return eachPhone
            }
            return false
        })

        this.setState({
            phone : phone
        })
        this.setState({
            loading: false
        })
      }

    componentDidMount(){
        Axios.get('http://localhost:2406/AddData/fetchtoCart',{
            headers : {
                'authorization' : "token " + localStorage.user
            }
        })
        .then(res=>{
            console.log(res.data)
            this.setState({
                phone: res.data
            })
        })
    }
    render() {
        if(localStorage.getItem('user'))
        {
            var total=0;

            if(this.state.loading){
                return (
                    <Loader />
                )
            }
            else if(this.state.phone.length===0){
                return(
                    <div>
                        <EmptyCart />
                    </div>
                )
            }
            else{
        return(
            <div>
                <Navbar/>
                <center><h1 id = "title-name" style={{paddingTop:'120px', marginBottom:'-70px'}}>Your Cart&nbsp;&nbsp;<i className="fas fa-shopping-cart"></i></h1></center>
                    <h1 style={{marginTop:'100px'}}>
                    <table border="0" style={{height:'100px', width:'100%', marginTop:'50px'}}>
                                        <tr>
                                            <td id = "column-items" style={{width:'17%'}}><center>Products</center></td>
                                            <td id = "column-items" style={{width:'17%'}}><center>Name Of Product</center></td>
                                            <td id = "column-items" style={{width:'17%'}}><center>Price</center></td>
                                            <td id = "column-items" style={{width:'17%'}}><center>Quantity</center></td>
                                            <td id = "column-items" style={{width:'17%'}}><center>Remove</center></td>
                                            <td id = "column-items" style={{width:'17%'}}><center>Item Total</center></td>
                                        </tr>
                                    </table>    
                        {this.state.phone.map((prod, index) => {

                            return(
                                <div key={index}>
                                    <table border="0" style={{height:'100px', width:'100%', marginTop:'30px'}}>
                                        <tr>
                                            <td id = "cart-items" style={{width:'17%'}}><center>
                                                    <img src={prod.img} alt="loading-img" style={{width:'100px'}} />
                                            </center></td>
                                            <td id = "cart-items" style={{width:'17%'}}><center>{prod.title}</center></td>
                                            <td id = "cart-items" style={{width:'17%'}}><center>${prod.price}</center></td>
                                            <td id = "cart-items" style={{width:'17%'}}>
                                                <center>
                                                    <button className="btn btn-outline-dark" onClick={()=>this.increment(prod.productId)}>+</button>
                                                    &nbsp;&nbsp;&nbsp;{prod.productQuantity}&nbsp;&nbsp;&nbsp;
                                                    <button className="btn btn-outline-dark" onClick={()=>this.decrement(prod.productId)}>-</button>
                                                </center>
                                            </td>
                                            <td id = "cart-items" style={{width:'17%'}}><center><i style={{cursor:'pointer', color:'#b30000'}} onClick={()=>this.del(prod.productId)} class="fas fa-trash"></i></center></td>
                                            <td id = "cart-items" style={{width:'17%'}}><center>${prod.price*prod.productQuantity}</center></td>
                                        </tr>
                                    </table>
                                    <div style={{display:"none"}} >
                                    {total+= prod.price*prod.productQuantity}
                                    </div>
                                </div>
                            )
                        })}
                        <div style={{marginTop:"50px",marginRight:'20px',float:"right", fontFamily:'Acme', fontSize:'30px', color:'#006666'}}>
                            Subtotal: ${total}
                        </div>
                        <br></br><br></br><br></br>
                        <div style={{marginBottom:'30px'}}>
                            <center>
                                <Link to={`/home/buynow/${total}`}>
                                    <button className="buy-bttn">Buy Now</button>
                                </Link>
                            </center>
                        </div>
                    </h1>
                    <Footer />
            </div>
        )
    }}
else
{
    return (
    <Redirect to='/' />
    )
}
}
}