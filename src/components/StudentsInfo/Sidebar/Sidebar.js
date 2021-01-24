import { faUserPlus, faUserCog, faPlus, faUserGraduate, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const [dept, setDept] = useState([]);
    function MyComponent() {
        useEffect(() => {
            setDept(JSON.parse(localStorage.getItem("dept")) || {});
        }, [])
    }

    function MyComponent2() {
        useEffect(() => {
            fetch('http://localhost:5000/departments')
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
        <div className="sidebar d-flex flex-column justify-content-between col-md-2 py-5 px-4" style={{ height: "100vh" }}>

            <ul className="list-unstyled py-3">
                <li>
                    <Link onClick={() => { window.location.href = "/student/allstudent" }} style={{ textDecoration: 'none' }} to="/student/allstudent" className="">
                        <span><FontAwesomeIcon icon={faUserGraduate} /> All Student</span>
                    </Link>
                    <div className="mt-2">

                        <li className="subMenu">
                            {
                                dept.length === 0 && <p>Loading...</p>
                            }

                            {

                                dept.map(department => <Link onClick={() => { window.location.href = `/students/allstudent/${department.department}` }} style={{ textDecoration: 'none' }} key={department._id} to={`/students/allstudent/${department.department}`} className="subMenu">
                                    <small style={{ display: "block" }}><FontAwesomeIcon icon={faCircle} />{department.department}</small>
                                </Link>)
                            }
                            {/* <Link style={{ textDecoration: 'none' }} to="/student/allstudent" className="subMenu">
                                <small style={{ display: "block", color: '#FB9937' }}><FontAwesomeIcon icon={faCircle} />CSE</small>
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to="/student/allstudent" className="">
                                <small style={{ display: "block", color: '#FB9937' }}><FontAwesomeIcon icon={faCircle} />BBA</small>
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to="/student/allstudent" className="">
                                <small style={{ display: "block", color: '#FB9937' }}><FontAwesomeIcon icon={faCircle} />ECE</small>
                            </Link> */}
                        </li>
                    </div>
                </li>


                <li>
                    <Link style={{ textDecoration: 'none' }} to="/students/enrollment" className="">
                        <span><FontAwesomeIcon icon={faUserPlus} /> Enroll A Student</span>
                    </Link>
                </li>

                <li>
                    <Link style={{ textDecoration: 'none' }} to="/students/department" className="">
                        <span><FontAwesomeIcon icon={faPlus} /> Add Department</span>
                    </Link>
                </li>

                <li>
                    <Link style={{ textDecoration: 'none' }} to="/students/admin" className="">
                        <span> <FontAwesomeIcon icon={faUserCog} /> Make Admin</span>
                    </Link>
                </li>

            </ul>

        </div >
    );
};

export default Sidebar;