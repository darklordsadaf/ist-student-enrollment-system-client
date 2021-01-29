import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import header from '../../../images/Photos/header.png'

const HeaderMain = () => {
    const history = useHistory();

    const handleLoginRoute = () => {

        history.push("/department");
    };
    return (
        <div className="">
            <main style={{ height: 'auto' }} className="d-flex align-items-center">
                <div className="col-md-4 offset-md-1 ">
                    <div className="d-flex">

                        <div class="title-bar "></div>
                        <div className="app-title">
                            <div className="animated infinite pulse">
                                <h1 style={{ color: '#111430' }}><b>IST<br />Student Enrollment <br />System</b></h1>

                            </div>

                        </div>

                    </div>
                    <br />
                    <br />
                    <Link href='/department' onClick={handleLoginRoute} style={{ background: '#111430', padding: '10px' }} className="btn text-white"><div className="button-yellow">All Department</div></Link>



                </div>
                <div className="col-md-6">
                    <img src={header} alt="" className="img-fluid " />
                </div>

            </main >
            <p style={{ marginTop: '9vh' }} className="text-center color-yellow"><small>Copyright Sadaf {(new Date()).getFullYear()} All Rights Reserved</small></p>
        </div>
    );
};

export default HeaderMain;