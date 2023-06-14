import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Button } from "react-bootstrap"
import { Card } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';




export default function Home(props) {
    const navigate = useNavigate();

    useEffect(() => {

        getShippers(); getTransporters(); getAgents(); getFleetOwners();
    }, [])

    const [shippers, setShippers] = useState([])
    const [totalShippersLength, setTotalShippersLength] = useState(false)
    const [shipperCount, setShipperCount] = useState()
    const [Transporter, setTransporter] = useState([])
    const [transporterCount, setTransporterCount] = useState()
    const [agents, setAgents] = useState([])
    const [agentsCount, setAgentsCount] = useState()
    const [fleetOwners, setFleetOwners] = useState([])
    const [fleetOwnersCount, setFleetOwnersCount] = useState()

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
        const Agents = await axios.get("https://motionless-cowboy-hat-ant.cyclic.app/admin/usersFilterForShipper/Agent")
        console.log(Agents.data)
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
    const getfleetowners = async () => {
        const Fleetowner = await axios.get("https://motionless-cowboy-hat-ant.cyclic.app/admin/usersFilterForShipper/Fleet Owner")
        try {
            if (Fleetowner.data.TotalUsers !== 0) {
                setfleetowner(Fleetowner.data.users)
                setfleetownerCount(Fleetowner.data.TotalUsers)
            } else {

                console.log("No Transporters registered")
            }

    const getFleetOwners = async () => {
        const FleetOwners = await axios.get("https://motionless-cowboy-hat-ant.cyclic.app/admin/usersFilterForShipper/Fleet Owner")
        try {
            if (FleetOwners.data.TotalUsers !== 0) {
                setFleetOwners(FleetOwners.data.users)
                setFleetOwnersCount(FleetOwners.data.TotalUsers)
                console.log(FleetOwners.data.TotalUsers)
            } else {

                console.log("No Fleet Owners registered")
            }
        } catch (err) {

        }
    }

    const shippersCount = () => {
        navigate('/Shipper')
    }

    const transportersCount = () => {
        navigate('/transporter')
    }

    const AgentsCount = () => {
        navigate('/agent')
    }

    const fleetsCount = () => {
        navigate('/Fleet')
    }

    }
 const shipperscount =() =>{
    navigate('/shipper')
 }
 const agentsscount =() =>{
    navigate('/agent')
 }
const transporterdcount=()=>{
    navigate('/transporter')
}

const Fleetcount =()=>{
    navigate('/Fleet')
}
    return (
        <>
            <br />
            <h2 style={{ textAlign: 'center', fontSize: '40px' }}>Dashboard</h2>
            <div style={{ display: 'flex', marginBottom: '30px', }}>
                <Card style={{ width: '350px', height: '200px', left: '400px', top: '80px', borderColor: '#F58E26', }} onClick={shippersCount}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center', marginTop: '50px', marginRight: '50px' }}>Total Shippers</Card.Title>
                        <p style={{ marginLeft: '70px' }}>Count:&nbsp;&nbsp;&nbsp;<b>{shipperCount}</b></p>
                        {/* {shippers.map(count=>(<>
                        <p>Count:{count.users}</p>
                        </> ))} */}


                    </Card.Body>
                </Card>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Card style={{ width: '350px', height: '200px', left: '483px', top: '80px', borderColor: '#F58E26' }}onClick={AgentsCount}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center', marginTop: '50px', marginRight: '50px' }}>Total Agents</Card.Title>
                        <p style={{ marginLeft: '80px' }}>Count:&nbsp;&nbsp;&nbsp;<b>{agentsCount}</b></p>
                    </Card.Body>
                </Card>
            </div>
            
            <div style={{ display: 'flex', }}>
                <Card style={{ width: '350px', height: '200px', left: '400px', top: '100px', borderColor: '#F58E26' }} onClick={transportersCount}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center', marginTop: '50px', marginRight: '50px' }}>Total Transporters</Card.Title>
                        <p style={{ marginLeft: '53px' }}>Count:&nbsp;&nbsp;&nbsp;<b>{transporterCount}</b></p>
                    </Card.Body>
                </Card>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Card style={{ width: '350px', height: '200px', left: '483px', top: '100px', borderColor: '#F58E26' }} onClick={fleetsCount}>
                    <Card.Body>
                        <Card.Title style={{ textAlign: 'center', marginTop: '50px', marginRight: '50px' }}>Total Fleet Owners</Card.Title>
                        <p style={{ marginLeft: '53px' }}>Count:&nbsp;&nbsp;&nbsp;<b>{fleetOwnersCount}</b></p>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}