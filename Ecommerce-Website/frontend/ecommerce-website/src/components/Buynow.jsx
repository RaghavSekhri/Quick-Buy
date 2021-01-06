import React, { Component } from 'react'
import Navbar from './Navbar';
import { Redirect } from 'react-router-dom';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';
import '../components/buynow.css'
import Footer from './Footer'

const initialState = {
    address:"",
    street:"",
    city:"",
    pincode:"",
    emailError: "",
    user:"",
    err:"",
}

export default class Buynow extends Component {
 
    state = initialState;

    handleAddressChange = event => {
        this.setState({
            address:event.target.value
        })
    }
    handleStreetChange = event => {
        this.setState({
            street:event.target.value
        })
    }
    handleCityChange = event => {
        this.setState({
            city:event.target.value
        })
    }
    handlePincodeChange = event => {
        this.setState({
            pincode:event.target.value
        })
    }
componentDidMount(){
    console.log(this.props);
}
    handleSubmit = event => {
        event.preventDefault();
        if(this.state.address.length===0 || this.state.street.length===0 || this.state.city.length===0 || this.state.pincode.length===0){
            alert('Please enter the values');
        }
        else{
        const order ={
            address : this.state.address,
            street :this.state.street,
            city :this.state.city,
            pincode: this.state.pincode,
            token : localStorage.getItem('user')
        }
        axios.post(`http://localhost:2406/AddData/AddtoOrder/${this.props.match.params.id}`,order);
        alert('You Order has been Placed')
        window.location='/home/productlist';
        }
}

    render() {
        if(localStorage.getItem('user'))
        {
        return (
            <div>
                <Navbar />
                <div id="buy-page" >
            <Form className="buy-form" onSubmit={this.handleSubmit} style={{float:'right', paddingTop:'130px', marginRight:'70px'}} >
            <center>
                <h2 id="enter" className="text-center">
                    Enter Shipment Details
                </h2>
                <FormGroup>
                    <Label>Address</Label>
                    <Input type="text" name="text" placeholder="Enter address" value = {this.state.address} onChange={this.handleAddressChange}/>
                    <div style={{fontSize: 15, color: "#ffffcc"}}></div>
                </FormGroup>
                <FormGroup>
                    <Label>Street</Label>
                    <Input type="text" name="text" placeholder="Enter street" value = {this.state.street} onChange={this.handleStreetChange}/>
                    <div style={{fontSize: 15, color: "#ffffcc"}}></div>
                </FormGroup>
                <FormGroup>
                    <Label>City</Label>
                    <Input type="text" name="text" placeholder="Enter city" value = {this.state.city} onChange={this.handleCityChange}/>
                    <div style={{fontSize: 15, color: "#ffffcc"}}></div>
                </FormGroup>
                <FormGroup>
                    <Label>PinCode</Label>
                    <Input type="text" name="text" placeholder="Enter pincode" value = {this.state.pincode} onChange={this.handlePincodeChange}/>
                    <div style={{fontSize: 15, color: "#ffffcc"}}></div>
                </FormGroup>
                <br />
                <button className="btn btn-info" style={{fontSize:'18px', width:'150px', borderRadius:'20px'}}>Place Order</button>
                <br></br>
                </center>
            </Form>
            </div>
            <Footer />
            </div>
        )
        }
        else
        {
            return (
                <Redirect to='/' />
            )
        }
    }
}
