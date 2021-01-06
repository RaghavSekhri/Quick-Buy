import React, { Component } from 'react'
import '../components/footer.css'
import {Link} from 'react-router-dom'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer-css">
              <div className="pb-5 footer">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-5 col-xs-12 about-company mt-5">
                      <h2>About Us</h2>
                      <br></br>
                      <p className="pr-5 text-white-50">This is an Ecommerce Website where you can <br></br>get genuine products at greatest discounts!!!!</p>
                    </div>
                    <div className="col-lg-3 col-xs-12 links mt-5">
                      <h4 className="mt-lg-0 mt-sm-3">Links</h4>
                        <ul className="m-0 p-0">
                          <li>- <Link to="/home/productlist">Mobiles</Link></li>
                          <li>- <Link to="/home/productlist">Cameras</Link></li>
                          <li>- <Link to="/home/productlist">Accessories</Link></li>
                          <li>- <Link to="/home/productlist">Home Products</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-xs-12 location mt-5">
                      <h4 className="mt-lg-0 mt-sm-4">Location</h4>
                      <p>33, Type-V, DMW Colony, Patiala, India</p>
                      <p className="mb-0"><i className="fa fa-phone mr-3"></i>(+91) 97792-66885</p>
                      <p><i className="fa fa-envelope-o mr-3"></i>quickbuysupport@gmail.com</p>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col copyright">
                      <hr style={{border: '1px solid grey'}} />
                      <p className=""><small className="text-white-50">© 2020. All Rights Reserved.</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}
