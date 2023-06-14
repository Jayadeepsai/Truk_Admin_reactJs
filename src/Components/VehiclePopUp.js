import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as ImIcons from "react-icons/im";

export default function VehiclePopUp(props) {

    const [vehicle, setVehicle] = useState({})
    const [isValid, setIsValid] = useState(false)
    const truk = localStorage.getItem('truk')
    const Truk = JSON.parse(truk)
    console.log(Truk)



    return (
        Truk ? (<Modal
            {...props}
            size="auto"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title id="contained-modal-title-vcenter">
                    {Truk.trukname} ({Truk.trukvehiclenumber})
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <Col>

                    <Card style={{ width: '19rem', borderBlockColor: '#f58e26', margin: "2rem", height: "13rem", overflow: "hidden", textOverflow: "ellipsis" }}>

                        <Card.Header style={{ display: "flex" }}>
                            <div>
                                <ImIcons.ImTruck style={{ marginRight: "1px", color: "#f58e26" }} />

                                <br />
                            </div>
                            <h5 style={{ marginLeft: "1rem" }}>{Truk.trukvehiclenumber} ({Truk.trukname})</h5>
                        </Card.Header>
                        <Card.Body>
                            <h6>{Truk.OriginLocation}</h6>
                            <p>PhNo:-{Truk.trukOwnerNumber}</p>
                            <Card.Text>
                                <div style={{ display: "flex" }}>
                                    Truk status -- <div style={{ color: "green", marginLeft: "0.2rem" }}>{Truk.trukisActive}</div>
                                </div>
                                
                            </Card.Text>
                        </Card.Body>

                    </Card>
                </Col>
            </Modal.Body>

        </Modal>) : null

    );
}