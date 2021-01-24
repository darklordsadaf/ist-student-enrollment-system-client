import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const MakeAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        fetch('https://enigmatic-wildwood-13681.herokuapp.com/addAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(success => {
                if (success) {
                    alert("Admin Added");
                    window.location.reload();
                }
            })

    }
    useEffect(() => {
        setIsAdmin(JSON.parse(localStorage.getItem("admin")) || {});
    }, [])
    return (
        <>
            {
                isAdmin === true ?
                    <div>
                        <Header></Header>
                        <div className="row">
                            <div className="col-md-2">
                                <Sidebar></Sidebar>
                            </div>
                            <div style={{ backgroundColor: '#F4F7FC', height: '87vh' }} className="col-md-10 pt-4">
                                <div className="col-md-6">
                                    <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                            <label for=""><b>Email</b></label>
                                            <input type="text" ref={register({ required: true })} name="email" placeholder="jon@gmail.com" className="form-control" />
                                            {errors.name && <span className="text-danger">This field is required</span>}

                                        </div>
                                        <div className="form-group">
                                            <button type="submit" style={{ padding: '10px 40px', background: '#111430' }} className="btn text-white">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div> : <Unauthorized />
            }
        </>
    );
};

export default MakeAdmin;