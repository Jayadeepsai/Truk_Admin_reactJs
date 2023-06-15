import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as ImIcons from "react-icons/im";

export default function PointsPop(props) {
    const user = localStorage.getItem('accPop')
    const User = JSON.parse(user)
    console.log(User)

    return (
        User ? (<Modal
            {...props}
            size="auto"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title id="contained-modal-title-vcenter">
                    Account Details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>


                {User.accDetails.length > 0 ? (User.accDetails.map((accunt) => {
                    return (<>
                        <h6><u>Account Number:</u> {accunt.accountNum}</h6>
                        <h6><u>IFSC Code:</u> {accunt.ifscCode}</h6>
                        <h6><u>Acc HolderName:</u> {accunt.accHolderName}</h6>
                        <hr /><p style={{ textAlign: 'center' }}><b>OR</b></p><hr />
                        <h6><u>UpiId:</u> {accunt.upiId}</h6>
                    </>)
                })) : (<h6>No Account details provided</h6>)}

            </Modal.Body>

        </Modal>) : null

    );
}