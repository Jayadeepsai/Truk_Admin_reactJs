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
import './sidenav.css';

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



export default function Refferals(){

    const [users, setUsers] = useState([])
    const [totalusers, setTotalUsers] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    //search users use state

    const [searchKey, setSearchKey] = useState()
    const [searchedResult, setSearchedResult] = useState([])
    const [isSearchCalled, setIsSearchCalled] = useState(false)

    useEffect(() => {
        getUsers();

    }, [])

    const getUsers = async () => {
        const users = await axios.get("https://motionless-cowboy-hat-ant.cyclic.app/admin/allUsers")
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
                        <ImIcons.ImArrowLeft2 style={{ fontSize: "1.5rem", margin: "1rem" }} onClick={() => window.location.reload()} /><span style={{ fontSize: "1.5rem" }}>Back to users</span>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>S.no</b></StyledTableCell>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>User Name</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Refferal Code</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Refferal Users</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Earnings</b></StyledTableCell>
                                      
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>More Details</b></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {searchedResult.map((user,idx) => {
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
                                            <StyledTableCell align="right">{user.referalCode}</StyledTableCell>
                                            <StyledTableCell style={{textAlign:"center"}}>{user.refferedTo.length}</StyledTableCell>
                                            <StyledTableCell align="right">
                                                {user.TotalCoins}
                                            </StyledTableCell>
                                           
                                            <StyledTableCell align="right" ><Button style={{ backgroundColor: "#F58E26" }} ><b >View</b></Button>
                                        {/* <UsersPopUp 
                                        show={isClicked}
                                        onHide={() => setIsClicked(false)}/> */}
                                        </StyledTableCell>
                                        </StyledTableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* <Row xs={1} md={4} className="g-4">
                            {searchedResult.map((user) => {
                                const x = Role(user)
                                const y = Verification(user)
                                return (

                                    <Col>

                                        <Card style={{ width: '19rem', borderBlockColor: '#f58e26', margin: "2rem" }}>

                                            <Card.Header style={{ display: "flex" }}>
                                                <div>
                                                    {x ? <ImIcons.ImUser style={{ marginRight: "1px", color: "blue" }} /> : <ImIcons.ImUsers style={{ marginRight: "1px", color: "blue" }} />}

                                                    <br />
                                                </div>
                                                <h5 style={{ marginLeft: "1rem" }}>{user.firstName} {user.lastName}</h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Title>{user.role}</Card.Title>
                                                <p>PhNo:-{user.mobileNo}</p>
                                                <Card.Text>
                                                    GST Verification  --  {y ? <span style={{ color: "green" }}> {user.gstVerify}</span> : <span style={{ color: "red" }}> {user.gstVerify}</span>}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row> */}
                    </div>
                ) : (
                    <div className='container'>
                        <h2 style={{ textAlign: "center" }}>Refferals</h2>
                        <br />
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>S.no</b></StyledTableCell>
                                    <StyledTableCell style={{ fontSize: "20px" }}><b>User Name</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Refferal Code</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Refferal Users</b></StyledTableCell>
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>Earnings</b></StyledTableCell>
                                      
                                        <StyledTableCell align="right" style={{ fontSize: "20px" }}><b>More Details</b></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user,idx) => {
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
                                                <StyledTableCell align="right">{user.referalCode}</StyledTableCell>
                                                <StyledTableCell align="right" >{user.refferedTo.length}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {user.TotalCoins}
                                                </StyledTableCell>
                                               
                                                <StyledTableCell align="right" ><Button style={{ backgroundColor: "#F58E26" }} ><b >View</b></Button>
                                            {/* <UsersPopUp 
                                            show={isClicked}
                                            onHide={() => setIsClicked(false)}/> */}
                                            </StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* <Row xs={1} md={4} className="g-4">
                            {users.map((user) => {
                                const x = Role(user)
                                const y = Verification(user)
                                return (

                                    <Col>
                                        <Card style={{ width: '19rem', borderBlockColor: '#f58e26', margin: "2rem" }}>

                                            <Card.Header style={{ display: "flex" }}>
                                                <div>
                                                    {x ? <ImIcons.ImUser style={{ marginRight: "1px", color: "blue" }} /> : <ImIcons.ImUsers style={{ marginRight: "1px", color: "blue" }} />}

                                                    <br />
                                                </div>
                                                <h5 style={{ marginLeft: "1rem" }}>{user.firstName} {user.lastName}</h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Title>{user.role}</Card.Title>
                                                <p>PhNo:-{user.mobileNo}</p>
                                                <Card.Text>
                                                    GST Verification  --  {y ? <span style={{ color: "green" }}> {user.gstVerify}</span> : <span style={{ color: "red" }}> {user.gstVerify}</span>}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row> */}
                    </div>)}

            </>)

    )

}