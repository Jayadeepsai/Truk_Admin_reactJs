import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UsersPopUp(props) {

    const [vehicle, setVehicle] = useState({})
    const [isValid, setIsValid] = useState(false)
    const user = localStorage.getItem('userPop')
    const User = JSON.parse(user)
    console.log(User)



    return (

        User ? (<Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title id="contained-modal-title-vcenter">
                    {User.firstName} {User.lastName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{User.role}</h4>
                <div>
                    {User.mobileNo},
                    {User.routes.length > 0 ? (<>
                        {
                            User.routes.map((route) => {
                                return <p style={{ display: "inline-block" }}>{route},</p>
                            })
                        }
                    </>) : null}



                    GST verify -- {User.gstVerify}
                    Aadhar verify -- {User.aadharVerify}

                </div>
            </Modal.Body>

        </Modal>) : null


    );
}