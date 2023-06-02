import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
export default function Messaging() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getdata = (option) => {

        if (option === "Shippers") {
            axios
                .get('https://motionless-cowboy-hat-ant.cyclic.app/admin/allUsers')
                .then(response => {
                    const shippersdata = response.data.users.filter(user => user.role === "Shipper")
                    const uniqueDeviceIds = shippersdata.map(user => user.uniqueDeviceId);
                    console.log(uniqueDeviceIds);

                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }  else if (option === "Transporters") {
                axios
                    .get('https://motionless-cowboy-hat-ant.cyclic.app/admin/allUsers')
                    .then(response => {
                        const transportersdata = response.data.users.filter(user => user.role === "Transporter")
                        const uniqueDeviceIds = transportersdata.map(user => user.uniqueDeviceId);
                        console.log(uniqueDeviceIds);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
        
        }else if (option === "Agents") {
            axios
                .get('https://motionless-cowboy-hat-ant.cyclic.app/admin/allUsers')
                .then(response => {
                    const Agentsdata = response.data.users.filter(user => user.role === "Agent")
                    const uniqueDeviceIds = Agentsdata.map(user => user.uniqueDeviceId);
                    console.log(uniqueDeviceIds);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
    
    }else if (option === "FleetOwner") {
        axios
            .get('https://motionless-cowboy-hat-ant.cyclic.app/admin/allUsers')
            .then(response => {
                const Fleetdata = response.data.users.filter(user => user.role === "Fleet Owner")
                const uniqueDeviceIds = Fleetdata.map(user => user.uniqueDeviceId);
                console.log(uniqueDeviceIds);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

}
else if (option === "All") {
    axios
        .get('https://motionless-cowboy-hat-ant.cyclic.app/admin/allUsers')
        .then(response => {
            const Alldata = response.data.users
            const uniqueDeviceIds = Alldata.map(user => user.uniqueDeviceId);
            console.log(uniqueDeviceIds);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

}
        }
    return (
        <div style={{ marginTop: '10px', textAlign: 'right' }}>
            {/* <button > CreateMessage</button> */}
            <Button onClick={handleShow} variant="light" style={{ backgroundColor:"#F58E26" , color:"white" , margin:'2rem'}}>
            Create Message
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                           
                            <Form.Control as="textarea" rows={3} placeholder="Description/Message"/>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                           
                           <select  style={{width:'30.5vw',height:"40px",borderRadius:'10px'}} onChange={(e) => getdata(e.target.value)} > 
                                <option  selected> Send to</option>
                                <option  value="All"> All</option>
                                <option value="Shippers">Shippers</option>
                                <option value="Transporters">Transporters</option>
                                <option value="Agents">Agents</option>
                                <option value="FleetOwner">FleetOwner</option>

                            </select>
                            <h6 style={{marginTop:'10px'}}>Notification/Frequency</h6>
                            <Form.Control type="date" style={{padding:'10px', width:'150px'}} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                {/* <Modal.Footer style={{marginRight:'130px'}}> */}
                <div style={{display:'flex', alignItems:'center',marginLeft:'190px', marginBottom:'20px'}}>
                    <Button style={{backgroundColor:'#FFF', color:'black', marginRight:'30px'}} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button style={{backgroundColor:'#F58E26'}} onClick={handleClose}>
                        Save 
                    </Button>
                    </div>
                {/* </Modal.Footer> */}
            </Modal>
        </div>
    )
}