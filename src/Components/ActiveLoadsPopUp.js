import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';

export default function ActiveLoadsPopUp(props) {

    const [loads, setLoads] = useState({})
    const [isValid, setIsValid] = useState(false)
    const load = localStorage.getItem('loadPop')
    const Load = JSON.parse(load)
    console.log(Load)



    return (
        Load ? (<Modal
            {...props}
            size="500px"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header closeButton>

                <Modal.Title id="contained-modal-title-vcenter">
                   Load details
                </Modal.Title>
            </Modal.Header>
            {/* <Modal.Body>
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
            </Modal.Body> */}

            <Modal.Body>
        <div style={{ height: '15px', borderRadius: "10px", border: '1px solid black', height: 'auto', marginBottom: '10px' }}>

          <div style={{ height: '25px', border: '1px solid black', width: '120px', textAlign: 'center', marginTop: '20px', marginLeft: '30px', borderRadius: '20px', marginBottom: '10px' }}>
            <Icon icon="mdi:person" />{Load.typeOfPay}
          </div>
          <div>

            <div style={{ display: 'flex' }}>
              <p style={{ marginLeft: "20px" }}><img src='https://media.istockphoto.com/id/1150981488/vector/brown-paper-box.jpg?b=1&s=170667a&w=0&k=20&c=ExZoHBgVStsXWmQiQw4hVlN-EvhEec-QrqhpXiym2og=' style={{ height: "60px", width: "60px" }}/></p>
              <div >
                <p style={{ fontSize: '13px', marginLeft: '30px' }}><Icon icon="fluent:location-16-regular" style={{ fontSize: '20px', color: 'red' }} /><b>{Load.OriginLocation}</b> </p>
                <p style={{ fontSize: '13px', marginLeft: '30px' }}><Icon icon="fluent:location-16-regular" style={{ fontSize: '20px', color: 'green' }} /><b>{Load.DestinationLocation}</b> </p>
              </div>
            </div>
            <p style={{ fontSize: '13px', marginLeft: '90px', color: 'rgba(15, 169, 88, 0.72)' }}><b>pickup date&time&nbsp;&nbsp;&nbsp;&nbsp;{Load.date}</b></p>
            <p style={{ fontSize: '13px', marginLeft: '13px' }}>{Load.isActive}</p>
            <p style={{ marginLeft: '13px', fontSize: '13px', }}>{Load.product}</p>
            <p style={{ marginLeft: '13px', fontSize: '13px' }}>{Load.Quantity}&nbsp;<b>{Load.data}</b></p>
            <p style={{ marginLeft: '13px', fontSize: '13px' }}>Expected Price : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Icon icon="mdi:rupee" /><b>{Load.expectedPrice}</b></p>
            <p style={{ marginLeft: '13px', fontSize: '13px' }}>AdvancePayemnt : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon icon="mdi:rupee" />300</p>
          </div>
        </div>

      </Modal.Body>
           
        </Modal>) : null
        
    );
}