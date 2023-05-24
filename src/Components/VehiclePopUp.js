import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function VehiclePopUp(props) {

    const [vehicle, setVehicle] = useState({})
    const [isValid, setIsValid] = useState(false)
    const truk = localStorage.getItem('truk')
    const Truk = JSON.parse(truk)
    console.log(Truk)



    return (
        Truk ? ( <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title id="contained-modal-title-vcenter">
                    {Truk.trukname} ({Truk.trukvehiclenumber})
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{Truk.OriginLocation}</h4>
                <div>
                    {Truk.trukOwnerNumber},
                    {isValid ? (<>
                        {Truk.trukoperatingRoutes.map((route) => {
                            return <p style={{ display: "inline-block" }}>{route},</p>
                        })}
                    </>
                    ) : null}

                    {Truk.trukdate}
                    Status -- {Truk.trukisActive}

                </div>
            </Modal.Body>
           
        </Modal>) : null
       
    );
}