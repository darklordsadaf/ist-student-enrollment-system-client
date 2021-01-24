import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import logo from '../../../images/ICON/ist.png';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [adminName, setAdminName] = useState([]);
    useEffect(() => {
        fetch('https://enigmatic-wildwood-13681.herokuapp.com/adminName', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                setAdminName(data[0]);
            })
    }, [loggedInUser.email])
    return (
        <div style={{ position: 'sticky', top: '0', background: 'white', zIndex: '1' }}>
            <section className='row'>
                <div className="col-md-2 mt-3">
                    <Link className="pl-5 ml-5" to="/">
                        <img style={{ width: "", height: "90px" }} src={logo} alt="" />
                    </Link>
                </div>
                <div className="col-md-8 mt-3 pl-1 pt-4">
                    <h1 style={{ color: "#7AB259" }}>IST <span style={{ color: "#FB9937" }}>Student Enrollment System</span> </h1>
                </div>
                <div className="col-md-2 mt-2">
                    <div className="mt-5 ml-3 pl-5" style={{ margin: '', color: '#7AB259' }}>
                        <h6>{loggedInUser.email && <p>{JSON.parse(localStorage.getItem("adminName"))}</p>}{" "}</h6>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Header;