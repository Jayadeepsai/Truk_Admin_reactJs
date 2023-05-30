import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function QueriesPop(props) {

    const [loads, setLoads] = useState({})
    const [isValid, setIsValid] = useState(false)
    const query = localStorage.getItem('queryPop')
    const Query = JSON.parse(query)
    // console.log(Query)



    return (
        Query ? (<Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title id="contained-modal-title-vcenter">
                    Query to be considered
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{Query.Query}</h4>
                {/* <div>
                    {Load.Number},
                    {isValid ? (<>
                        {Load.product.map((items) => {
                            return <p style={{ display: "inline-block" }}>{items},</p>
                        })}
                    </>
                    ) : null}

                    {Load.date}
                    Status -- {Load.isActive}

                </div> */}
            </Modal.Body>
           
        </Modal>) : null
        
    );
}