

import React, { useState, useEffect } from 'react';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as ImIcons from "react-icons/im";
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
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
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
    const [filteredLoads, setFilteredLoads] = useState([]);
    const [fromDate, setFromDate] = useState("");// These variables are used to store the selected "from" and "to" dates for filtering the loads.
    const [toDate, setToDate] = useState("");

    useEffect(() => {
        getActiveLoads();

    }, [])

    const getActiveLoads = async () => {
        const activeLoadsResponse = await axios.get("https://motionless-cowboy-hat-ant.cyclic.app/admin/allPostedLoads");
        try {
            if (activeLoadsResponse.data.TotalLoads !== 0) {
                setActiveLoads(activeLoadsResponse.data.loads)
                filterLoadsByDate(activeLoadsResponse.data.loads)
                console.log(activeLoadsResponse.data.loads)
            } else {
                setTotalLoadsLength(true);
                console.log("No loads are posted.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const setLoad = (load) => {
        localStorage.setItem('loadPop', JSON.stringify(load));
    };

    const searchLoads = async (key) => {
        console.log(key);
        const searchData = await axios.get("https://motionless-cowboy-hat-ant.cyclic.app/admin/searchByLetterForActiveLoads/" + key);
        try {
            if (searchData.data.length !== 0) {
                setSearchedResult(searchData.data.data);
                setIsSearchCalled(true);
                console.log(searchData.data.data);
            } else {
                setIsSearchCalled(false);
                
            }
        } catch (err) {
            console.log(err);
        }
    };

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            searchLoads(searchKey);
        }
    }

    function Status(load) {
        if (load.isActive === "Active") {
            return true;
        } else {
            return false;
        }
    }

    function filterLoadsByDate(loads) {
        if (fromDate && toDate) {
            const filteredLoads = loads.filter((load) => {
                const loadDate = new Date(load.date);
                const fromDateObj = new Date(fromDate);
                const toDateObj = new Date(toDate);
                return loadDate >= fromDateObj && loadDate <= toDateObj;
            });
            setFilteredLoads(filteredLoads);
        } else {
            setFilteredLoads(loads);
        }
    }

    //    Filter the data between the start and end dates
    //   const filteredData = activeLoads.filter(item => {
    //     const itemDate = new Date(item.date);
    //     return itemDate >= startDate && itemDate <= endDate;
    //   });

    function filterLoadsByDate(loads) {
        if (fromDate && toDate) {
            const filteredLoads = loads.filter((load) => {
                const loadDate = new Date(load.date);
                const fromDateObj = new Date(fromDate);
                const toDateObj = new Date(toDate);
                return loadDate >= fromDateObj && loadDate <= toDateObj;
            });
            setFilteredLoads(filteredLoads);
        } else {
            setFilteredLoads(loads);
        }
    }

    function handleFilterClick() {
        filterLoadsByDate(activeLoads);
    }



    return (


        totalLoadsLength ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 56px)" }}>
                <p>No loads are posted</p>
            </div>
        ) : (
            <>
                <br />
                <div style={{ display: 'flex' , justifyContent:'space-between'}} >
                    <InputGroup className="mb-3" style={{ width: "20rem", float:'left', marginLeft:'55px' }}>
                        <Form.Control
                            placeholder="Search anything..."
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <InputGroup.Text style={{ backgroundColor: "#f58e26" }}><ImIcons.ImSearch onClick={() => searchLoads(searchKey)} /></InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3" style={{ width: "25rem", float:'right' , marginRight:'55px'}}>
                        {/* <InputGroup.Text style={{ backgroundColor: "#f58e26", margin: "0 0.5rem" }}>From:</InputGroup.Text> */}
                        <Form.Control

                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                        <InputGroup.Text style={{ backgroundColor: "#f58e26", margin: "0 0.5rem" }}>To:</InputGroup.Text>
                        <Form.Control
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                        <Button variant="light" style={{ backgroundColor: '#f58e26' }} onClick={handleFilterClick}>Filter</Button>
                    </InputGroup>
                </div>
                {isSearchCalled ? (<div className='container'>
                    <ImIcons.ImArrowLeft2 style={{ fontSize: "1.5rem", margin: "1rem" }} onClick={() => window.location.reload()} /><span style={{ fontSize: "1.5rem" }}>Back to Posted Loads</span>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>S.No</b></StyledTableCell>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>Load Id</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>User Name</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>No.of Loads</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Load Status</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>More Details</b></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchedResult.map((load, idx) => {
                                    const status = Status(load)
                                    const sNo = idx + 1
                                    return (
                                        <StyledTableRow key={load.name}>
                                            <StyledTableCell component="th" scope="row">
                                              {sNo}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{load.LoadId}</StyledTableCell>
                                            <StyledTableCell align="right">{load.UserName}</StyledTableCell>
                                            <StyledTableCell align="right">1</StyledTableCell>
                                            {/* <StyledTableCell align="right">{load.isActive}</StyledTableCell> */}
                                            {/* <StyledTableCell align="right">
                                              <ActiveLoadsPopUp load={load} setLoad={setLoad} />
                                            </StyledTableCell> */}
                                            <StyledTableCell align="right">
                                                {status ? <span style={{ color: "green" }}> {load.isActive}</span> : <span style={{ color: "blue" }}> {load.isActive}</span>}
                                            </StyledTableCell>
                                            <StyledTableCell align="right" ><Button style={{ backgroundColor: "#F58E26" }} ><b onClick={() => { setIsClicked(true); setLoad(load) }}>View</b></Button>
                                                <ActiveLoadsPopUp
                                                    show={isClicked}
                                                    onHide={() => setIsClicked(false)} />
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>) : (<div className='container'>
                    <h2 style={{ textAlign: "center" }}>Posted Loads</h2>
                    <br />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>S.No</b></StyledTableCell>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>Load Id</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>User Name</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>No.of Loads</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Load Status</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>More Details</b></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredLoads.map((load, idx) => {
                                    const status = Status(load)
                                    const sNo = idx + 1
                                    return (
                                        <StyledTableRow key={load.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {sNo}
                                            </StyledTableCell>
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
                                                    onHide={() => setIsClicked(false)} />
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
