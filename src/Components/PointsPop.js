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

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               
                {User.accDetails.map((accunt) => {
                    return (<>
                        <h6>{accunt.accountNum}</h6>
                        <p className="pa">{accunt.ifscCode}</p>
                        <p className="pa">{accunt.accHolderName}</p>
                    </>)
                })}

            </Modal.Body>

        </Modal>) : null

    );
}