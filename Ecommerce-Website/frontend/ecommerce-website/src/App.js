import React from 'react';
import './App.css';
import RenderLogin from './components/Renderlogin';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import Register from './components/Register'
import {Switch} from 'react-router-dom';
import ProductList from './components/Productlist';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default'
import Start from './components/Start';
import Buynow from './components/Buynow';

function App() {
  return (
    <div className="hello">
      <Router>
        <Switch>
        <Route exact path="/" component={RenderLogin} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home/cart/:id" component={Cart}/>
        <Route exact path="/home/cart/" component={Cart}/>
        <Route exact path="/home" component={Start} />
        <Route exact path="/home/productlist" component={ProductList} />
        <Route exact path="/home/details/:id" component={Details} />
        <Route exact path="/home/buynow/:id" component={Buynow} />
        <Route component={Default} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
