import React from 'react'
import './css/ErrorPage.css'
import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (

        <div id="container1">

            <div className="col-sm-10 col-sm-offset-1 text-center " id='mainPart'>

                <Link to="/"> <div className="four_zero_four_bg"></div></Link>


                <div className="contant_box_404">
                    <h3 className="h2">
                        Looks like you're lost
                    </h3>

                    <p>the page you are looking for is not avaible!</p>

                    <Link to="/" className="link_404">Go to Home</Link>
                </div>
            </div>
        </div>


    )
}

export default ErrorPage
