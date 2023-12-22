import React from 'react'
import './css/ErrorPage.css'
import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (
        <section class="page_404">
            <div class="container">

                <div class="col-sm-10 col-sm-offset-1  text-center">

                    <Link to="/"> <div class="four_zero_four_bg"></div></Link>


                    <div class="contant_box_404">
                        <h3 class="h2">
                            Looks like you're lost
                        </h3>

                        <p>the page you are looking for is not avaible!</p>

                        <a href="/" class="link_404">Go to Home</a>
                    </div>
                </div>
            </div>

        </section >
    )
}

export default ErrorPage
