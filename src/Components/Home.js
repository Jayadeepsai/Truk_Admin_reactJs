import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Button } from "react-bootstrap"
import { Card } from "react-bootstrap"




export default function Home(props) {

    useEffect(() => {
        getShippers(); getTransporters(); getAgents();
    }, [])

    const [shippers, setShippers] = useState([])
    const [totalShippersLength, setTotalShippersLength] = useState(false)
    const [shipperCount, setShipperCount] = useState()
    const [Transporter, setTransporter] = useState([])
    const [transporterCount, setTransporterCount] = useState()
    const [agents, setAgents] = useState([])
    const [agentsCount, setAgentsCount] = useState()

    const getShippers = async () => {
        const shippers = await axios.get("https://motionless-cowboy-hat-ant.cyclic.app/admin/usersFilterForShipper/Shipper")
        try {
            if (shippers.data.TotalUsers !== 0) {
                setShippers(shippers.data.users)
                setShipperCount(shippers.data.TotalUsers)
            } else {
                setTotalShippersLength(true)
                console.log("No Shippers registered")
            }

        } catch (err) {
            console.log(err)
        }

    }

    const getTransporters = async () => {
        const Transporters = await axios.get("https://motionless-cowboy-hat-ant.cyclic.app/admin/usersFilterForShipper/Transporter")
        try {
            if (Transporters.data.TotalUsers !== 0) {
                setTransporter(Transporters.data.users)
                setTransporterCount(Transporters.data.TotalUsers)
            } else {

                console.log("No Transporters registered")
            }

        } catch (err) {
            console.log(err)
        }

    }


    const getAgents = async () => {
        const Agents = await axios.get("https://motionless-cowboy-hat-ant.cyclic.app/admin/usersFilterForShipper/Agents")
        try {
            if (Agents.data.TotalUsers !== 0) {
                setAgents(Agents.data.users)
                setAgentsCount(Agents.data.TotalUsers)
                console.log(Agents.data.TotalUsers)
            } else {

                console.log("No Agents registered")
            }

        } catch (err) {
            console.log(err)
        }

    }



    return (
        <>
        <br />
            <h2 style={{textAlign:'center', fontSize:'40px'}}>Dashboard</h2>
            <div style={{ display: 'flex', marginBottom: '30px', }}>
                <Card style={{ width: '350px', height: '200px', left: '400px', top: '80px', borderColor: '#F58E26', }}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center', marginTop: '50px', marginRight: '50px' }}>Total Shippers</Card.Title>
                        <p style={{ marginLeft: '70px' }}>Count:&nbsp;&nbsp;&nbsp;<b>{shipperCount}</b></p>
                        {/* {shippers.map(count=>(<>
                        <p>Count:{count.users}</p>
                        </> ))} */}


                    </Card.Body>
                </Card>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Card style={{ width: '350px', height: '200px', left: '483px', top: '80px', borderColor: '#F58E26' }}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center', marginTop: '50px', marginRight: '50px' }}>Total Agents</Card.Title>
                        <p style={{ marginLeft: '80px' }}>Count:&nbsp;&nbsp;&nbsp;<b>{agentsCount}</b></p>
                    </Card.Body>
                </Card>
            </div>
            <div style={{ display: 'flex', }}>
                <Card style={{ width: '350px', height: '200px', left: '400px', top: '100px', borderColor: '#F58E26' }}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center', marginTop: '50px', marginRight: '50px' }}>Total Transporters</Card.Title>
                        <p style={{ marginLeft: '53px' }}>Count:&nbsp;&nbsp;&nbsp;<b>{transporterCount}</b></p>
                    </Card.Body>
                </Card>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Card style={{ width: '350px', height: '200px', left: '483px', top: '100px', borderColor: '#F58E26' }}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center', marginTop: '50px', marginRight: '50px' }}>Total Fleet Owners</Card.Title>

                    </Card.Body>
                </Card>
            </div>
        </>
    )
}