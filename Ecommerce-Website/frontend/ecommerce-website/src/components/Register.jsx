import React, { Component } from 'react'
import axios from 'axios';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

const initialState = {
    name: "",
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    user:"",
    err:"",
}

export default class Register extends Component {

    state = initialState;

    validate = () => {
        let emailError = "";
        let passwordError = "";
    
        if(!this.state.email.includes("@")){
            emailError = "Email id is incorrect";
        }
        if(!this.state.password){
            passwordError = "Password is incorrect";
        }
        if(emailError || passwordError){
            this.setState({emailError});
            this.setState({passwordError});
            return false;
        }
        return true;
    }

    handleNameChange = event => {
        this.setState({
            name:event.target.value
        })
    }

    handleEmailChange = event => {
        this.setState({
            email:event.target.value
        })
    }

    handlePasswordChange = event => {
        this.setState({
            password:event.target.value
        })
    }

    handleLoginPage = () => {
        window.location='/';
    }

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if(this.state.email.length===0|| this.state.password.length===0){
            alert('Please enter the values');
        }
        else{
        const user ={
            email : this.state.email,
            password:this.state.password
        }
        if(!this.state.email.includes("@")){
        }
        else{
        axios.post('http://localhost:2406/users/register',user)
        .then(res=>{
            console.log(res.data);
            if(res.data.error){
                this.setState({
                    err:res.data.error
                })
                localStorage.removeItem('user');
            }else{
                this.setState({
                    user:res.data
                })

                localStorage.setItem('user',this.state.user);

                window.location = '/';
                
            }

        })
    }
        if (isValid)
        {
            console.log(this.state);
            this.setState(initialState);
        }
    }
    }

    render() {
        return (
            <div className="overall">
                <div className="all">
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                    <Form className="login-form" onSubmit={this.handleSubmit} >
                        <h1>
                        <span className="font-weight-bold"><center>Quick Buy</center></span>
                        </h1>
                        <h2 className="text-center">
                            Welcome
                        </h2>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input name="email" placeholder="Enter email id" value = {this.state.email} onChange={this.handleEmailChange}/>
                            <div style={{fontSize: 15, color: "#ffffcc"}}>{this.state.emailError}</div>
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input type="password" name="password" placeholder="Enter password" value = {this.state.password} onChange={this.handlePasswordChange}/>
                            <div style={{fontSize: 15, color: "#ffffcc"}}>{this.state.passwordError}</div>
                        </FormGroup>
                        <Button type="submit" className="btn-lg btn-dark btn-block" style={{marginTop:"15px"}}>
                            Register
                        </Button>
                        <Button type="submit" className="btn-lg btn-dark btn-block" onClick = {()=>this.handleLoginPage()} style={{marginTop:"10px"}}>
                            Go back to Login Page
                        </Button>
                        <p style = {{color:'red'}}>{this.state.err}</p>
                    </Form>
                </div>
            </div>
        )
    }
}
