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
import QueriesPop from './QueriesPop';

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

export default function Queries() {

    const setQuery = (query) => {
        localStorage.setItem('queryPop', JSON.stringify(query))
    }

    const propId = JSON.parse(localStorage.getItem('queryPop'))

    const [queries, setqueries] = useState([])
    const [totalQueriesLength, setTotalQueriesLength] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [queryStatus, setQueryStatus] = useState({ idx: 0 })
    const [update, setUpdate] = useState()
    const [change, setChange] = useState({ idx: false })

    //search users use state

    const [searchKey, setSearchKey] = useState()
    const [searchedResult, setSearchedResult] = useState([])
    const [isSearchCalled, setIsSearchCalled] = useState(false)
    const [pending, setPending] = useState(true)

    useEffect(() => {
        getQueries();

    }, [update])

    const getQueries = async () => {
        const postedQueries = await axios.get("https://motionless-cowboy-hat-ant.cyclic.app/admin/allQueries")
        try {
            if (postedQueries.data.TotalQueries !== 0) {
                setqueries(postedQueries.data.queries)
                console.log(postedQueries.data.queries)
            } else {
                setTotalQueriesLength(true)
                console.log("No loads are posted.")
            }

        } catch (err) {
            console.log(err)
        }

    }



    const searchQueries = async (key) => {
        console.log(key)
        const searchData = await axios.get("https://motionless-cowboy-hat-ant.cyclic.app/admin/searchByLetterForQueries/" + key)
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


    const handleChange = (idx, e) => {
        setQueryStatus({ [idx]: e.target.value })
    }


    const handleUpdateButton = (idx) => {
        setChange({ [idx]: true })
    }

    console.log(change)

    const updateStatus = async (id) => {
        const arr = Object.values(queryStatus)
        const body = {
            queryStatus: arr[0]
        }
        const updatedResult = await axios.put("https://motionless-cowboy-hat-ant.cyclic.app/admin/query/" + id, body)
        try {
            console.log("Query Status has been updated.")
            console.log(updatedResult.data.updatedProduct)
            setUpdate(Math.random())
        } catch (err) {
            console.log("Error")
        }

    }


    // Enter key search

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            searchQueries(searchKey);
        }
    }

    return (
        totalQueriesLength ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 56px)" }}>
                <p>No Queries are posted</p>
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
                    <InputGroup.Text style={{ backgroundColor: "#f58e26" }}><ImIcons.ImSearch onClick={() => searchQueries(searchKey)} /></InputGroup.Text>
                </InputGroup>
                {isSearchCalled ? (<div className='container'>
                    <ImIcons.ImArrowLeft2 style={{ fontSize: "1.5rem", margin: "1rem" }} onClick={() => window.location.reload()} /><span style={{ fontSize: "1.5rem" }}>Back to Posted Loads</span>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>S.No</b></StyledTableCell>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>Load Id</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>User Name</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Mobile No</b></StyledTableCell>
                                    {/* <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Query</b></StyledTableCell> */}
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>More Details</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Status</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Change Status</b></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchedResult.map((query, idx) => {
                                    const sNo = idx + 1
                                    const stat = query.queryStatus
                                    return (
                                        <StyledTableRow key={query.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {sNo}
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                {query.Loadid}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{query.Name}</StyledTableCell>
                                            <StyledTableCell align="right">{query.PhoneNumber}</StyledTableCell>
                                            {/* <StyledTableCell align="right">
                                            {query.Query}
                                            </StyledTableCell> */}
                                            <StyledTableCell align="right" ><Button variant='light' style={{ backgroundColor: "#F58E26",color:"white" }} ><b onClick={() => { setIsClicked(true); setQuery(query) }}>View</b></Button>
                                                <QueriesPop
                                                    show={isClicked}
                                                    onHide={() => setIsClicked(false)} />
                                            </StyledTableCell>
                                            <StyledTableCell align="right" style={{ color: stat === "Completed" ? "green" : "red" }}><b>{query.queryStatus}</b></StyledTableCell>

                                            <StyledTableCell align="right">
                                                <div>
                                                    <select value={queryStatus.idx} onChange={(e) => (handleChange(idx, e), setQuery(query), handleUpdateButton(idx))} style={{ width: '6rem', height: '2rem', borderRadius: '5px' }}>
                                                        <option >Select</option>
                                                        <option style={{ color: "red" }} value="Pending">Pending</option>
                                                        <option style={{ color: "green" }} value="Completed">Completed</option>
                                                    </select>
                                                    {change[idx] ? <Button onClick={() => updateStatus(propId._id)} variant='light' style={{ slot: "end", margin: "1rem",backgroundColor:"#F58E26",color:"white" }}>Update</Button> :
                                                        <Button disabled variant='light' style={{ slot: "end", margin: "1rem",backgroundColor:"#F58E26",color:"white" }}>Update</Button>
                                                    }
                                                </div>
                                            </StyledTableCell>

                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>) : (<div className='container'>
                    <h2 style={{ textAlign: "center" }}>Queries</h2>
                    <br />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>S.No</b></StyledTableCell>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>Load Id</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>User Name</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Mobile No</b></StyledTableCell>
                                    {/* <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Query</b></StyledTableCell> */}
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>More Details</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Status</b></StyledTableCell>
                                    <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Change Status</b></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {queries.map((query, idx) => {
                                    const sNo = idx + 1
                                    const stat = query.queryStatus
                                    return (
                                        <StyledTableRow key={query.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {sNo}
                                            </StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                {query.Loadid}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{query.Name}</StyledTableCell>
                                            <StyledTableCell align="right">{query.PhoneNumber}</StyledTableCell>
                                            <StyledTableCell align="right" ><Button variant='light' style={{ backgroundColor: "#F58E26" ,color:"white"}} ><b onClick={() => { setIsClicked(true); setQuery(query) }}>View</b></Button>
                                                <QueriesPop
                                                    show={isClicked}
                                                    onHide={() => setIsClicked(false)} />
                                            </StyledTableCell>
                                            <StyledTableCell align="right" style={{ color: stat === "Completed" ? "green" : "red" }}><b>{query.queryStatus}</b></StyledTableCell>

                                            <StyledTableCell align="right">
                                                <div>
                                                    <select value={queryStatus.idx} onChange={(e) => (handleChange(idx, e), setQuery(query), handleUpdateButton(idx))} style={{ width: '6rem', height: '2rem', borderRadius: '5px' }}>
                                                        <option >Select</option>
                                                        <option style={{ color: "red" }} value="Pending">Pending</option>
                                                        <option style={{ color: "green" }} value="Completed">Completed</option>
                                                    </select>
                                                    {change[idx] ? <Button onClick={() => updateStatus(propId._id)} variant='light' style={{ slot: "end", margin: "1rem",backgroundColor:"#F58E26",color:"white" }}>Update</Button> :
                                                        <Button disabled variant='light' style={{ slot: "end", margin: "1rem",backgroundColor:"#F58E26",color:"white" }}>Update</Button>
                                                    }
                                                </div>
                                            </StyledTableCell>


                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div >)
                }

            </>)
    )
}