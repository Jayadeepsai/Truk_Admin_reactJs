import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CompleteLoadsPopUp(props) {

    const [loads, setLoads] = useState({})
    const [isValid, setIsValid] = useState(false)
    const loadss = localStorage.getItem('CompleteLoadPop')
    const Load = JSON.parse(loadss)
    console.log(Load)



    return (
        Load ? ( <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title id="contained-modal-title-vcenter">
                    {Load.OriginLocation} to {Load.DestinationLocation}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{Load.UserName}</h4>
                <div>
                    {Load.Number},
                    {isValid ? (<>
                        {Load.product.map((items) => {
                            return <p style={{ display: "inline-block" }}>{items},</p>
                        })}
                    </>
                    ) : null}

                    {Load.date}
                    Status -- {Load.isActive}

                </div>
            </Modal.Body>

        </Modal>):null
       
    );
}