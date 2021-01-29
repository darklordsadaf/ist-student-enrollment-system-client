import { faUserPlus, faUserCog, faPlus, faUserGraduate, faCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './Sidebar.css';

const Sidebar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [dept, setDept] = useState([]);
    const logout = () => {
        window.location.assign("/");
        localStorage.clear();
        setLoggedInUser({})
    }
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
    return (
        <div className="sidebar d-flex flex-column justify-content-between align-items-center col-md-2 py-5 px-4" style={{ height: "100vh" }}>

            <ul className="list-unstyled py-3">
                <li>
                    <Link onClick={() => { window.location.href = "/student/allstudent" }} style={{ textDecoration: 'none' }} to="/student/allstudent" className="">
                        <span><FontAwesomeIcon icon={faUserGraduate} /> All Student</span>
                    </Link>
                    <div className="">

                        <li className="subMenu">
                            {
                                dept.length === 0 && <p>Loading...</p>
                            }

                            {

                                dept.map(department => <Link onClick={() => { window.location.href = `/students/allstudent/${department.department}` }} style={{ textDecoration: 'none' }} key={department._id} to={`/students/allstudent/${department.department}`} className="subMenu">
                                    <small style={{ display: "block", marginBottom: "2px" }}><FontAwesomeIcon icon={faCircle} />{department.department}</small>
                                </Link>)
                            }
                        </li>
                    </div>
                </li>


                <li>
                    <Link onClick={() => { window.location.href = "/students/enrollment" }} style={{ textDecoration: 'none' }} to="/students/enrollment" className="">
                        <span><FontAwesomeIcon icon={faUserPlus} /> Enroll A Student</span>
                    </Link>
                </li>

                <li>
                    <Link onClick={() => { window.location.href = "/students/department" }} style={{ textDecoration: 'none' }} to="/students/department" className="">
                        <span><FontAwesomeIcon icon={faPlus} /> Add Department</span>
                    </Link>
                </li>

                <li>
                    <Link onClick={() => { window.location.href = "/students/admin" }} style={{ textDecoration: 'none' }} to="/students/admin" className="">
                        <span> <FontAwesomeIcon icon={faUserCog} /> Make Admin</span>
                    </Link>
                </li>
                <button to='/' onClick={logout} className="fixed-bottom ml-3 btn-danger mb-3 btn btn-sm">Log Out  <FontAwesomeIcon icon={faSignOutAlt} /></button>
            </ul>

        </div >
    );
};

export default Sidebar;