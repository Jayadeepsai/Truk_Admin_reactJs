import React, { useState, useEffect } from 'react';
import axios from "axios"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as ImIcons from "react-icons/im";
// import Button from 'react-bootstrap/Button';
import VehiclePopUp from './VehiclePopUp';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "react-bootstrap";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#F58E26',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




export default function Vehicle() {
    const [vehicles, setVehicles] = useState([])
    const [totalVehicles, setTotalVehicles] = useState(false)
    const [isClicked, setIsClicked] = useState(false)


    //search users use state

    const [searchKey, setSearchKey] = useState()
    const [searchedResult, setSearchedResult] = useState([])
    const [isSearchCalled, setIsSearchCalled] = useState(false)

    useEffect(() => {
        getVehicles();
    }, [])

    const getVehicles = async () => {
        const vehicles = await axios.get("http://localhost:3001/admin/allVehiclesForAdmin")
        try {
            if (vehicles.data.totalVehicles !== 0) {
                setVehicles(vehicles.data.vehicles)
                console.log(vehicles.data.vehicles)
            } else {
                setTotalVehicles(true)
                console.log("No vehicles found")
            }

        } catch (err) {
            console.log(err)
        }

    }

    const searchVehicles = async (key) => {
        const searchData = await axios.get("http://localhost:3001/admin/searchByLetterForVehicles/" + key)
        try {
            if (searchData.data.length !== 0) {
                setSearchedResult(searchData.data.data)
                setIsSearchCalled(true)
                console.log(searchData.data.data)
            } else {
                setIsSearchCalled(false)
            }

        } catch (err) {
            console.log(err)
        }
    }


    const setTruk = (truk) => {
        localStorage.setItem('truk', JSON.stringify(truk))
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            searchVehicles(searchKey);
        }
    }

    return (
        totalVehicles ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 56px)" }}>
                <p>No vehicles are posted</p>
            </div>
        ) : (
            <>
                <br />
                <InputGroup className="mb-3" style={{ width: "20rem", margin: "auto" }}>
                    <Form.Control
                        placeholder="Search anything..."
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        onKeyDown={handleKeyDown}

                    />
                    <InputGroup.Text style={{ backgroundColor: "#f58e26" }}><ImIcons.ImSearch onClick={() => searchVehicles(searchKey)} /></InputGroup.Text>
                </InputGroup>
                {isSearchCalled ? (<div className='container'>
                    <ImIcons.ImArrowLeft2 style={{ fontSize: "1.5rem", margin: "1rem" }} onClick={() => window.location.reload()} /><span style={{ fontSize: "1.5rem" }}>Back to vehicles</span>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>S.No</b></StyledTableCell>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>Truk No</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Truk type</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Mobile No</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Truk Status</b></StyledTableCell>

                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>More Details</b></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchedResult.map((vehicle, idx) => {
                                    const sNo = idx + 1
                                    return (
                                        <StyledTableRow key={vehicle.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {sNo}
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                {vehicle.trukvehiclenumber}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{vehicle.trukname}</StyledTableCell>
                                            <StyledTableCell align="right">{vehicle.trukOwnerNumber}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                {vehicle.trukisActive}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" ><Button style={{ backgroundColor: "#F58E26" }} ><b onClick={() => { setIsClicked(true); setTruk(vehicle) }}>View</b></Button>
                                                <VehiclePopUp
                                                    show={isClicked}
                                                    onHide={() => setIsClicked(false)}
                                                />
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* <Row xs={1} md={4} className="g-4">
                        {searchedResult.map((vehicle) => {

                            return (

                                <Col>

                                    <Card style={{ width: '19rem', borderBlockColor: '#f58e26', margin: "2rem", height: "13rem", overflow: "hidden", textOverflow: "ellipsis" }}>

                                        <Card.Header style={{ display: "flex" }}>
                                            <div>
                                                <ImIcons.ImTruck style={{ marginRight: "1px", color: "#f58e26" }} />

                                                <br />
                                            </div>
                                            <h5 style={{ marginLeft: "1rem" }}>{vehicle.trukvehiclenumber} ({vehicle.trukname})</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <h6>{vehicle.OriginLocation}</h6>
                                            <p>PhNo:-{vehicle.trukOwnerNumber}</p>
                                            <Card.Text>
                                                <div style={{ display: "flex" }}>
                                                    Truk status -- <div style={{ color: "green", marginLeft: "0.2rem" }}>{vehicle.trukisActive}</div>
                                                </div>
                                                <Button style={{ backgroundColor: "#f58e26", marginLeft: "13rem", marginTop: "-3rem" }} onClick={() => { setIsClicked(true); setTruk(vehicle) }} >View</Button>
                                                <VehiclePopUp
                                                    show={isClicked}
                                                    onHide={() => setIsClicked(false)}
                                                />
                                            </Card.Text>
                                        </Card.Body>

                                    </Card>
                                </Col>
                            )
                        })}
                    </Row> */}
                </div>) : (<div className='container'>
                    <h2 style={{ textAlign: "center" }}>Vehicles</h2>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">

                            <TableHead>
                                <TableRow>
                                <StyledTableCell style={{ fontSize: "20px" }}><b>S.No</b></StyledTableCell>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>Truk No</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Truk type</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Mobile No</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Truk Status</b></StyledTableCell>

                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>More Details</b></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vehicles.map((vehicle, idx) => {
                                    const sNo = idx + 1
                                    return (
                                        <StyledTableRow key={vehicle.name}>
                                             <StyledTableCell component="th" scope="row">
                                                {sNo}
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                {vehicle.trukvehiclenumber}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{vehicle.trukname}</StyledTableCell>
                                            <StyledTableCell align="right">{vehicle.trukOwnerNumber}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                {vehicle.trukisActive}
                                            </StyledTableCell>

                                            <StyledTableCell align="right" ><Button style={{ backgroundColor: "#F58E26" }} ><b onClick={() => { setIsClicked(true); setTruk(vehicle) }}>View</b></Button>
                                                <VehiclePopUp
                                                    show={isClicked}
                                                    onHide={() => setIsClicked(false)}
                                                />
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <Row xs={1} md={4} className="g-4">
                        {vehicles.map((vehicle) => {

                            return (

                                <Col>
                                    <Card style={{ width: '19rem', borderBlockColor: '#f58e26', margin: "2rem", height: "13rem", overflow: "hidden", textOverflow: "ellipsis" }}>

                                        <Card.Header style={{ display: "flex" }}>
                                            <div>
                                                <ImIcons.ImTruck style={{ marginRight: "1px", color: "#f58e26" }} />

                                                <br />
                                            </div>
                                            <h5 style={{ marginLeft: "1rem" }}>{vehicle.trukvehiclenumber} ({vehicle.trukname})</h5>
                                        </Card.Header>
                                        <Card.Body>
                                            <h6>{vehicle.OriginLocation}</h6>
                                            <p>PhNo:-{vehicle.trukOwnerNumber}</p>
                                            <Card.Text>
                                                <div style={{ display: "flex" }}>
                                                    Truk status -- <div style={{ color: "green", marginLeft: "0.2rem" }}>{vehicle.trukisActive}</div>
                                                </div>
                                                <Button style={{ backgroundColor: "#f58e26", marginLeft: "13rem", marginTop: "-3rem" }} onClick={() => { setIsClicked(true); setTruk(vehicle) }} >View</Button>
                                                <VehiclePopUp
                                                    show={isClicked}
                                                    onHide={() => setIsClicked(false)}
                                                />
                                            </Card.Text>
                                        </Card.Body>

                                    </Card>
                                </Col>
                            )
                        })}
                    </Row> */}
                </ div>)}

            </>)
    )
}