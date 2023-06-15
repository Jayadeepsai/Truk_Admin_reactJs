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
import UsersPopUp from './UsersPopUp';
import Modal from 'react-bootstrap/Modal';
import * as XLSX from "xlsx";

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

export default function Transporters() {
    const [users, setUsers] = useState([])
    const [totalusers, setTotalUsers] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [dropValue, setDropValue] = useState()

    //search users use state

    const [searchKey, setSearchKey] = useState()
    const [searchedResult, setSearchedResult] = useState([])
    const [isSearchCalled, setIsSearchCalled] = useState(false)

    useEffect(() => {
        getUsers();

    }, [])

    const getUsers = async () => {
      const users = await axios  .get('https://motionless-cowboy-hat-ant.cyclic.app//admin/allUsers')
      .then(response => {
        const shipperdata = response.data.users.filter(user => user.role === 'Transporter');
        
        setUsers(shipperdata)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }

    const setUser = (user) => {
        localStorage.setItem('userPop', JSON.stringify(user))
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

    function Role(user) {
        if (user.role === "Shipper") {
            return true
        } else return false
    }


    function Verification(user) {
        if (user.gstVerify === "Verified") {
            return true
        } else return false

    }

    function AadharVerification(user) {
        if (user.aadharVerify === "Verified") {
            return true
        } else return false

    }



    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            searchUsers(searchKey);
        }
    }

    const values = [true,];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }


    async function extractParsedData() {

        const jsonSheet = XLSX.utils.json_to_sheet(users)
        console.log(jsonSheet)
        var newWb = XLSX.utils.book_new();
        const wb = XLSX.utils.book_append_sheet(newWb, jsonSheet)
        console.log(wb)
        return XLSX.writeFile(newWb, "UserData.xlsx")
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
                <Button onClick={extractParsedData} variant='light' style={{color:'white',backgroundColor:'#f58e26',float:'right'}}>Download</Button>
                {isSearchCalled ? (
                    <div className='container'>
                        <ImIcons.ImArrowLeft2 style={{ fontSize: "1.5rem", margin: "1rem" }} onClick={() => window.location.reload()} /><span style={{ fontSize: "1.5rem" }}>Back to users</span>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{ fontSize: "20px" }}><b>S.No</b></StyledTableCell>
                                        <StyledTableCell style={{ fontSize: "20px" }}><b>User Name</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Mobile No</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Role</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>GST verification</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Aadhar verification</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>More Details</b></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchedResult.map((user, idx) => {
                                        const y = Verification(user)
                                        const x = AadharVerification(user)
                                        const sNo = idx + 1
                                        return (
                                            <StyledTableRow key={user.name}>
                                                <StyledTableCell component="th" scope="row">
                                                    {sNo}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    {user.firstName}{user.lastName}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{user.mobileNo}</StyledTableCell>
                                                <StyledTableCell align="right">{user.role}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {y ? <span style={{ color: "green" }}> <b>{user.gstVerify}</b></span> : <span style={{ color: "red" }}><b>{user.gstVerify}</b> </span>}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {x ? <span style={{ color: "green" }}> <b>{user.aadharVerify}</b></span> : <span style={{ color: "red" }}> <b>{user.aadharVerify}</b></span>}
                                                </StyledTableCell>
                                                <StyledTableCell align="right" >
                                                    {values.map((v, idx) => (
                                                        <Button key={idx} className="me-2 mb-2" style={{ backgroundColor: "#F58E26", borderColor: '#F58E2' }} onClick={() => { setIsClicked(true); setUser(user); handleShow(v) }}>
                                                            View
                                                            {typeof v === 'string' && `below ${v.split('-')[0]}`}
                                                        </Button>
                                                    ))}
                                                    {/* <UsersPopUp
                                                        show={isClicked}
                                                        onHide={() => setIsClicked(false)} /> */}
                                                    <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                                                        <Modal.Header closeButton style={{ backgroundColor: '#F58E26' }}>
                                                            {/* <Modal.Title>Modal</Modal.Title> */}
                                                        </Modal.Header>
                                                        <Modal.Body><UsersPopUp /></Modal.Body>
                                                    </Modal>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                      
                    </div>
                ) : (
                    <div className='container'>
                        <h2 style={{ textAlign: "center" }}>Total Transporters</h2>
                        <br />
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{ fontSize: "20px" }}><b>S.No</b></StyledTableCell>
                                        <StyledTableCell style={{ fontSize: "20px" }}><b>User Name</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Mobile No</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Role</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>GST verification</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Aadhar verification</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>More Details</b></StyledTableCell>
                                        {/* <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Status</b></StyledTableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, idx) => {
                                        const y = Verification(user)
                                        const x = AadharVerification(user)
                                        const sNo = idx + 1
                                        return (
                                            <StyledTableRow key={user.name}>
                                                <StyledTableCell component="th" scope="row">
                                                    {sNo}
                                                </StyledTableCell>
                                                <StyledTableCell >
                                                    {user.firstName}{user.lastName}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{user.mobileNo}</StyledTableCell>
                                                <StyledTableCell align="right">{user.role}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {y ? <span style={{ color: "green" }}> <b>{user.gstVerify}</b></span> : <span style={{ color: "red" }}><b>{user.gstVerify}</b> </span>}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {x ? <span style={{ color: "green" }}> <b>{user.aadharVerify}</b></span> : <span style={{ color: "red" }}> <b>{user.aadharVerify}</b></span>}
                                                </StyledTableCell>
                                                <StyledTableCell align="right" >
                                                    {values.map((v, idx) => (
                                                        <Button key={idx} className="me-2 mb-2" style={{ backgroundColor: "#F58E26", borderColor: '#F58E2' }} onClick={() => { setIsClicked(true); setUser(user); handleShow(v) }}>
                                                            View
                                                            {typeof v === 'string' && `below ${v.split('-')[0]}`}
                                                        </Button>
                                                    ))}
                                                    {/* <UsersPopUp
                                                        show={isClicked}
                                                        onHide={() => setIsClicked(false)} /> */}
                                                    <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                                                        <Modal.Header closeButton style={{ backgroundColor: '#F58E26' }}>
                                                            {/* <Modal.Title>Modal</Modal.Title> */}
                                                        </Modal.Header>
                                                        <Modal.Body><UsersPopUp /></Modal.Body>
                                                    </Modal>
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