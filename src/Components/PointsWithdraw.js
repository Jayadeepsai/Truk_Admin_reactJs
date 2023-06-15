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
import PointsPop from './PointsPop';

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

export default function PointsWithdraw() {

    const [users, setUsers] = useState([])
    const [totalusers, setTotalUsers] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [dropValue, setDropValue] = useState()
    const [queryStatus, setQueryStatus] = useState({ idx: 0 })
    const [change, setChange] = useState({ idx: false })
    const [update, setUpdate] = useState()

    //search users use state

    const [searchKey, setSearchKey] = useState()
    const [searchedResult, setSearchedResult] = useState([])
    const [isSearchCalled, setIsSearchCalled] = useState(false)

    useEffect(() => {
        getUsers();

    }, [update])

    const getUsers = async () => {
        const users = await axios.get("https://motionless-cowboy-hat-ant.cyclic.app/admin/usersPendingWithDraw/withdrawStatus")
        try {
            if (users.data.TotalUsers !== 0) {
                setUsers(users.data.users)
                console.log(users.data.users)
            } else {
                setTotalUsers(true)
                console.log("No users found")
            }

        } catch (err) {
            console.log(err)
        }

    }

    const setAcc = (acc) => {
        localStorage.setItem('accPop', JSON.stringify(acc));
    };

    const handleChange = (idx, e) => {
        setQueryStatus({ [idx]: e.target.value })
    }


    const handleUpdateButton = (idx) => {
        setChange({ [idx]: true })
    }


    const updateStatus = async (id) => {
        const arr = Object.values(queryStatus)
        const body = {
            withdrawStatus: arr[0]
        }
        const updatedResult = await axios.put("https://motionless-cowboy-hat-ant.cyclic.app/admin/userWithdrawStatus/" + id, body)
        try {
            console.log("Query Status has been updated.")
            console.log(updatedResult.data.updatedProduct)
            setUpdate(Math.random())
        } catch (err) {
            console.log("Error")
        }

    }


    const searchUsers = async (key) => {
        console.log(key)
        const searchData = await axios.get("https://motionless-cowboy-hat-ant.cyclic.app/admin/searchByLetterForUsers/" + key)
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

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            searchUsers(searchKey);
        }
    }



    return (
        totalusers ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 56px)" }}>
                <p>No loads are posted</p>
            </div>
        ) : (
            <> <br />
                <InputGroup className="mb-3" style={{ width: "20rem", margin: "auto" }}>
                    <Form.Control
                        placeholder="Search anything..."
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <InputGroup.Text style={{ backgroundColor: "#f58e26" }}><ImIcons.ImSearch onClick={() => searchUsers(searchKey)} /></InputGroup.Text>
                </InputGroup>
                {isSearchCalled ? (
                    <div className='container'>
                        <ImIcons.ImArrowLeft2 style={{ fontSize: "1.5rem", margin: "1rem" }} onClick={() => window.location.reload()} /><span style={{ fontSize: "1.5rem" }}>Back to withdraws</span>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{ fontSize: "20px" }}><b>S.No</b></StyledTableCell>
                                        <StyledTableCell style={{ fontSize: "20px" }}><b>User Name</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Refferal Code</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Account</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Status</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Change Status</b></StyledTableCell>
                                        {/* <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>GST verification</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Aadhar verification</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>More Details</b></StyledTableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchedResult.map((user, idx) => {

                                        const sNo = idx + 1
                                        const withStat = user.withdrawStatus
                                        return (
                                            <StyledTableRow key={user.name}>
                                                <StyledTableCell component="th" scope="row">
                                                    {sNo}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    {user.firstName}{user.lastName}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{user.referalCode}</StyledTableCell>
                                                <StyledTableCell align="right"><Button variant='light' style={{color:"white",backgroundColor:"#F58E26"}} onClick={() => { setIsClicked(true); setAcc(user)}}>View</Button>
                                                <PointsPop
                                                    show={isClicked}
                                                    onHide={() => setIsClicked(false)} />
                                                </StyledTableCell>
                                                <StyledTableCell align="right" style={{ color: withStat === "Completed" ? "green" : "red" }}><b>{user.withdrawStatus}</b></StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <div>
                                                        <select value={queryStatus.idx} onChange={(e) => (handleChange(idx, e), handleUpdateButton(idx))} style={{ width: '6rem', height: '2rem', borderRadius: '5px' }}>
                                                            <option >Select</option>
                                                            <option style={{ color: "red" }} value="Pending">Pending</option>
                                                            <option style={{ color: "green" }} value="Completed">Completed</option>
                                                        </select>
                                                        {change[idx] ? <Button onClick={() => updateStatus(user._id)} variant='light' style={{ slot: "end", margin: "1rem", backgroundColor: "#F58E26", color: "white" }}>Update</Button> :
                                                            <Button disabled variant='light' style={{ slot: "end", margin: "1rem", backgroundColor: "#F58E26", color: "white" }}>Update</Button>
                                                        }


                                                    </div>
                                                </StyledTableCell>
                                                {/* <StyledTableCell align="right">
                                                    {y ? <span style={{ color: "green" }}> <b>{user.gstVerify}</b></span> : <span style={{ color: "red" }}><b>{user.gstVerify}</b> </span>}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {x ? <span style={{ color: "green" }}> <b>{user.aadharVerify}</b></span> : <span style={{ color: "red" }}> <b>{user.aadharVerify}</b></span>}
                                                </StyledTableCell> 
                                                <StyledTableCell align="right" ><Button style={{ backgroundColor: "#F58E26" }} ><b onClick={() => { setIsClicked(true); setUser(user) }}>View</b></Button>
                                                    <UsersPopUp
                                                        show={isClicked}
                                                        onHide={() => setIsClicked(false)} />
                                                </StyledTableCell>*/}
                                            </StyledTableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>


                    </div>
                ) : (
                    <div className='container'>
                        <h2 style={{ textAlign: "center" }}>Withdraw Requests</h2>
                        <br />
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{ fontSize: "20px" }}><b>S.No</b></StyledTableCell>
                                        <StyledTableCell style={{ fontSize: "20px" }}><b>User Name</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Refferal Code</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Account</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Status</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Change Status</b></StyledTableCell>
                                        {/* <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>GST verification</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Aadhar verification</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>More Details</b></StyledTableCell> */}
                                        {/* <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Status</b></StyledTableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, idx) => {
                                        // console.log(user)
                                        const sNo = idx + 1
                                        const withStat = user.withdrawStatus
                                        return (
                                            <StyledTableRow key={user.name}>
                                                <StyledTableCell component="th" scope="row">
                                                    {sNo}
                                                </StyledTableCell>
                                                <StyledTableCell >
                                                    {user.firstName}{user.lastName}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{user.referalCode}</StyledTableCell>
                                                <StyledTableCell align="right"><Button variant='light' style={{color:"white",backgroundColor:"#F58E26"}} onClick={() => { setIsClicked(true); setAcc(user)}}>View</Button>
                                                <PointsPop
                                                    show={isClicked}
                                                    onHide={() => setIsClicked(false)} />
                                                </StyledTableCell>
                                                <StyledTableCell align="right" style={{ color: withStat === "Completed" ? "green" : "red" }}><b>{user.withdrawStatus}</b></StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <div>
                                                        <select value={queryStatus.idx} onChange={(e) => (handleChange(idx, e), handleUpdateButton(idx))} style={{ width: '6rem', height: '2rem', borderRadius: '5px' }}>
                                                            <option >Select</option>
                                                            <option style={{ color: "red" }} value="Pending">Pending</option>
                                                            <option style={{ color: "green" }} value="Completed">Completed</option>
                                                        </select>
                                                        {change[idx] ? <Button onClick={() => updateStatus(user._id)} variant='light' style={{ slot: "end", margin: "1rem", backgroundColor: "#F58E26", color: "white" }}>Update</Button> :
                                                            <Button disabled variant='light' style={{ slot: "end", margin: "1rem", backgroundColor: "#F58E26", color: "white" }}>Update</Button>
                                                        }


                                                    </div>
                                                </StyledTableCell>
                                                {/* <StyledTableCell align="right">
                                                    {y ? <span style={{ color: "green" }}> <b>{user.gstVerify}</b></span> : <span style={{ color: "red" }}><b>{user.gstVerify}</b> </span>}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {x ? <span style={{ color: "green" }}> <b>{user.aadharVerify}</b></span> : <span style={{ color: "red" }}> <b>{user.aadharVerify}</b></span>}
                                                </StyledTableCell>
                                                <StyledTableCell align="right" ><Button style={{ backgroundColor: "#F58E26" }} ><b onClick={() => { setIsClicked(true); setUser(user) }}>View</b></Button>
                                                    <UsersPopUp
                                                        show={isClicked}
                                                        onHide={() => setIsClicked(false)} />
                                                </StyledTableCell> */}

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