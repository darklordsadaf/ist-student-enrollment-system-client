import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import Navbar from '../../Home/Navbar/Navbar';


const Unauthorized = () => {
    const [isAdmin, setIsAdmin] = useState(true);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    const logout = () => {
        localStorage.clear();
        setLoggedInUser({})
    }
    // function MyComponent3() {
    //     useEffect(() => {
    //         setIsAdmin(JSON.parse(localStorage.getItem("admin")) || {});
    //     }, [])
    // }
    function MyComponent3() {
        useEffect(() => {
            setIsAdmin(JSON.parse(localStorage.getItem("admin")) || {});
        }, [])
    }
    function MyComponent4() {
        useEffect(() => {
            fetch('https://enigmatic-wildwood-13681.herokuapp.com/isAdmin', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ email: loggedInUser.email })
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('admin', JSON.stringify(data));
                    setIsAdmin(data);
                });
        }, [])
    }
    if (localStorage.getItem("admin")) {
        MyComponent3();
    }
    else {
        MyComponent4();
    }
    // function MyComponent4() {

    // }
    // if (localStorage.getItem("admin")) {
    //     MyComponent3();
    // }
    // else {
    //     MyComponent4();
    // }
    return (
        <div >

            {
                isAdmin === false ? <div >
                    {/* <div className="text-right mt-2"><Link to='/' style={{ background: '#111430', borderRadius: '5px' }} className="" className="btn mr-4 text-white " onClick={logout}>Log Out</Link></div> */}
                    <Navbar />
                    <h1 style={{ fontSize: '200px', marginTop: '70px', color: 'red' }} class="text-center " >Access Denied</h1>
                    <br />
                    {/* <div className="text-center mt-3"><Link style={{ fontSize: '50px', borderRadius: '50px' }} className=" btn btn-warning" to="/">Go to Home</Link></div> */}
                </div> : <img style={{ width: '500px' }} className="rounded mx-auto d-block mt-4 pt-5" src="https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="" />
            }
        </div>
    );
};

export default Unauthorized;