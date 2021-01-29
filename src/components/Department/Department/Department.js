import React, { useContext, useEffect, useState } from 'react';
import DepartmentCard from '../DepartmentCard/DepartmentCard';
import { Link } from 'react-router-dom';
import logo from '../../../images/ICON/ist.png';
import { UserContext } from '../../../App';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import './Department.css';


const Department = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [dept, setDept] = useState([]);

    function MyComponent() {
        useEffect(() => {
            setDept(JSON.parse(localStorage.getItem("dept")) || {});
        }, [])
    }

    function MyComponent2() {
        useEffect(() => {
            fetch('https://enigmatic-wildwood-13681.herokuapp.com/departments')
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        localStorage.setItem('dept', JSON.stringify(data));
                    }
                    setDept(data)
                })
        }, [])
    }


    if (localStorage.getItem("dept")) {
        MyComponent();
    }
    else {
        MyComponent2()
    }

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

    return (
        <div>
            {
                isAdmin === true ? <section className=" container">
                    <Link to='/'>
                        <div className="d-flex justify-content-center ">
                            <img style={{ width: "200px", height: "200px" }} src={logo} alt="" />

                        </div>
                    </Link>
                    <h2 className="text-center">All <span className="text-yellow">Department</span> </h2>
                    <div class="department-underline mb-2"></div>
                    {
                        dept.length === 0 && <img className="rounded mx-auto d-block mt-4 pt-3" src="https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="" />
                    }
                    <div className="row">

                        {
                            dept.map(department => <DepartmentCard key={department._id} department={department}></DepartmentCard>)
                        }
                    </div>
                </section>
                    : <Unauthorized />
            }

        </div>
    );
};

export default Department;