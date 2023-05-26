import React, { useState, useEffect } from 'react';
import axios from "axios"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as ImIcons from "react-icons/im"
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
import ActiveLoadsPopUp from './ActiveLoadsPopUp';


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


export default function ActiveLoads() {

    const [activeLoads, setActiveLoads] = useState([])
    const [totalLoadsLength, setTotalLoadsLength] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    //search users use state

    const [searchKey, setSearchKey] = useState()
    const [searchedResult, setSearchedResult] = useState([])
    const [isSearchCalled, setIsSearchCalled] = useState(false)

    useEffect(() => {
        getActiveLoads();
        
    }, [])

    const getActiveLoads = async () => {
        const activeLoads = await axios.get("http://localhost:3001/admin/allPostedLoads")
        try {
            if (activeLoads.data.TotalLoads !== 0) {
                setActiveLoads(activeLoads.data.loads)
                console.log(activeLoads.data.loads)
            } else {
                setTotalLoadsLength(true)
                console.log("No loads are posted.")
            }

        } catch (err) {
            console.log(err)
        }

    }

    const setLoad = (load) => {
        localStorage.setItem('loadPop', JSON.stringify(load))
    }

    const searchLoads = async (key) => {
        console.log(key)
        const searchData = await axios.get("http://localhost:3001/admin/searchByLetterForActiveLoads/" + key)
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

    // Enter key search

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            searchLoads(searchKey);
        }
    }


    function Status(load) {
        if (load.isActive === "Active") {
            return true
        } else return false

    }
    //     const startDate = new Date('2023-05-10T10:40');
    //   const endDate = new Date('2023-05-18T11:44');

    //    Filter the data between the start and end dates
    //   const filteredData = activeLoads.filter(item => {
    //     const itemDate = new Date(item.date);
    //     return itemDate >= startDate && itemDate <= endDate;
    //   });



    return (



        totalLoadsLength ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 56px)" }}>
                <p>No loads are posted</p>
            </div>
        ) : (

            <>
                {/* <Dates filteringData={activeLoads} /> */}
                <br />
                <InputGroup className="mb-3" style={{ width: "20rem", margin: "auto" }}>
                    <Form.Control
                        placeholder="Search anything..."
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <InputGroup.Text style={{ backgroundColor: "#f58e26" }}><ImIcons.ImSearch onClick={() => searchLoads(searchKey)} /></InputGroup.Text>
                </InputGroup>
                {isSearchCalled ? (<div className='container'>
                    <ImIcons.ImArrowLeft2 style={{ fontSize: "1.5rem", margin: "1rem" }} onClick={() => window.location.reload()} /><span style={{ fontSize: "1.5rem" }}>Back to Posted Loads</span>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                <StyledTableCell style={{ fontSize: "20px" }}><b>Load Id</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>User Name</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>No.of Loads</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Load Status</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>More Details</b></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchedResult.map((load) => {
                                    const status = Status(load)
                                    return (
                                        <StyledTableRow key={load.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {load.LoadId}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{load.UserName}</StyledTableCell>
                                            <StyledTableCell align="right">1</StyledTableCell>
                                            <StyledTableCell align="right">
                                                {status ? <span style={{ color: "green" }}> {load.isActive}</span> : <span style={{ color: "blue" }}> {load.isActive}</span>}
                                            </StyledTableCell>
                                            <StyledTableCell align="right" ><Button style={{ backgroundColor: "#F58E26" }} ><b onClick={() => { setIsClicked(true); setLoad(load) }}>View</b></Button>
                                            <ActiveLoadsPopUp 
                                            show={isClicked}
                                            onHide={() => setIsClicked(false)}/>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* <Row xs={1} md={4} className="g-4">

                        {searchedResult.map((load) => (

                            <Col>
                                <Card style={{ width: '19rem', borderBlockColor: '#f58e26', margin: "2rem" }}>

                                    <Card.Header style={{ display: "flex" }}>
                                        <div>
                                            <ImIcons.ImLocation2 style={{ marginRight: "1px", color: "blue" }} />{load.OriginLocation}
                                            <br />

                                            <ImIcons.ImLocation2 style={{ marginRight: "1px", color: "red" }} /> {load.DestinationLocation}
                                        </div>
                                        <img src='https://media.istockphoto.com/id/1150981488/vector/brown-paper-box.jpg?b=1&s=170667a&w=0&k=20&c=ExZoHBgVStsXWmQiQw4hVlN-EvhEec-QrqhpXiym2og=' style={{ height: "20%", width: "20%" }} />
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>PhNo:-{load.Number}</Card.Title>
                                        <Card.Text>
                                            <b>Products:</b>
                                            {load.product.map((name) => {
                                                return <p style={{ display: "inline-block" }}>{name},</p>
                                            })}
                                            <div style={{ display: "flex" }}>
                                                Status -- <div style={{ color: "blue", marginLeft: "0.2rem" }}>{load.isActive}</div>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row> */}
                </div>) : (<div className='container'>
                    <h2 style={{ textAlign: "center" }}>Posted Loads</h2>
                    <br />
                    {/* <Row xs={1} md={4} className="g-4">

                        {activeLoads.map((load) => (

                            <Col>
                                <Card style={{ width: '19rem', borderBlockColor: '#f58e26', margin: "2rem" }}>

                                    <Card.Header style={{ display: "flex" }}>
                                        <div>
                                            <ImIcons.ImLocation2 style={{ marginRight: "1px", color: "blue" }} />{load.OriginLocation}
                                            <br />

                                            <ImIcons.ImLocation2 style={{ marginRight: "1px", color: "red" }} /> {load.DestinationLocation}
                                        </div>
                                        <img src='https://media.istockphoto.com/id/1150981488/vector/brown-paper-box.jpg?b=1&s=170667a&w=0&k=20&c=ExZoHBgVStsXWmQiQw4hVlN-EvhEec-QrqhpXiym2og=' style={{ height: "20%", width: "20%" }} />
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>PhNo:-{load.Number}</Card.Title>
                                        <Card.Text>
                                            <b>Products:</b>
                                            {load.product.map((name) => {
                                                return <p style={{ display: "inline-block" }}>{name},</p>
                                            })}
                                            <div style={{ display: "flex" }}>
                                                Status -- <div style={{ color: "blue", marginLeft: "0.2rem" }}>{load.isActive}</div>
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row> */}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>Load Id</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>User Name</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>No.of Loads</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Load Status</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>More Details</b></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {activeLoads.map((load) => {
                                    const status = Status(load)
                                    return (
                                        <StyledTableRow key={load.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {load.LoadId}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{load.UserName}</StyledTableCell>
                                            <StyledTableCell align="right">1</StyledTableCell>
                                            <StyledTableCell align="right">
                                                {status ? <span style={{ color: "green" }}> {load.isActive}</span> : <span style={{ color: "blue" }}> {load.isActive}</span>}
                                            </StyledTableCell>
                                            <StyledTableCell align="right" ><Button style={{ backgroundColor: "#F58E26" }} onClick={() => { setIsClicked(true); setLoad(load) }}><b >View</b></Button>
                                            <ActiveLoadsPopUp 
                                            show={isClicked}
                                            onHide={() => setIsClicked(false)}/>
                                            </StyledTableCell>
                                            
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>)}

            </>)

    )
}

