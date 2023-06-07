import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ModalHeader, ModalTitle } from "react-bootstrap";
import axios from "axios";

const Editprofile = (props, getdetails) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mailID, setMailID] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const Createhandler = (e) => {
        // e.preventDefault();
        const body = {
            firstName: firstName,
            lastName: lastName,
            mobileNo: mobileNumber,
            email: mailID,
            password: password,
            role: "User"
        }
        axios.post('https://motionless-cowboy-hat-ant.cyclic.app/admin/signupAdmin', body)
            .then((response) => {
                console.log("user is added")
                getdetails()

            })
            .catch((error) => console.log(error));
    }
    return (
        <>

            <Modal
                {...props}
                size="300px"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton >
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body className="ebody-add">
                    <div>
                        <form className="edit" >
                            <label>Enter First Name:</label><br />
                            <input type="text"
                                onChange={(e) => setFirstName(e.target.value)} /><br />
                            <label>Enter Last Name:</label><br />
                            <input type="text"
                                onChange={(e) => setLastName(e.target.value)} /><br />
                            <label>Enter Mail:</label><br />
                            <input
                                type="email"
                                onChange={(e) => setMailID(e.target.value)} /><br />
                            <label>Enter Mobile Number:</label><br />
                            <input
                                type="number"
                                onChange={(e) => setMobileNumber(e.target.value)} /><br />

                            <label>Enter Password:</label><br />
                            <input type="text"
                                onChange={(e) => setPassword(e.target.value)} /><br />
                            {/* <label>Confirm Password</label><br />
                            <input type="text"
                                onChange={(e) => setConfirmPassword(e.target.value)} /> */}
                                <br /><br />
                            {/* {password !== confirmPassword && (
                                <div style={{ color: 'red', marginTop: '5px' }}>* Passwords do not match</div>
                            )} */}

                           
                        </form>
                        <button
                                style={{ marginLeft: '250px', width: '80px', borderRadius: '20px', backgroundColor: '#F58E26', marginBottom: '30px', color: "white" }}
                                onClick={(e) => Createhandler(e)}
                            >Create</button>
                    </div>

                </Modal.Body>
            </Modal>


        </>
    )
}

export default Editprofile