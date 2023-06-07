import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CgProfile } from 'react-icons/cg'

import InputGroup from 'react-bootstrap/InputGroup';
import * as ImIcons from "react-icons/im"
import { Navigate, useNavigate } from 'react-router-dom';


import Modal from 'react-bootstrap/Modal';



export default function Header() {

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);
  const [profileData, setProfileData] = useState([])

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('adminEmail')
    navigate('/login');
  }

  useEffect(() => {
    profile();
  }, [])

  const profile = () => {

    const profileInfo = JSON.parse(localStorage.getItem('adminEmail'))
    if (profileInfo) setProfileData(profileInfo)

  }



  return (
    profileData.length > 0 ? profileData[0].role === 'Admin' ? (<>
      <Navbar expand="lg" style={{ backgroundColor: "#f58e26" }}>
        <Container fluid>
          <img src='trukpng.png' style={{ height: "2rem", width: "2rem", marginRight: "1rem " }} />

          <Navbar.Brand href="">TruKApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >


            </Nav>

            <Nav>
              <Nav className="me-auto">
              <Nav.Link href="/home" style={{ color: "#ffff" }}>Home</Nav.Link>
                <NavDropdown title={
                  <span style={{ color: "white" }}>Loads</span>
                } id="basic-nav-dropdown">
                  <NavDropdown.Item href="/activeloads">Posted Loads</NavDropdown.Item>
                  <NavDropdown.Item href="/completedloads">Completed Loads</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title={
                  <span style={{ color: "white" }}>Referrals</span>
                } id="basic-nav-dropdown">
                  <NavDropdown.Item href="/refferals">Refferals</NavDropdown.Item>
                  <NavDropdown.Item href="/points">Withdraws</NavDropdown.Item>

                </NavDropdown>
                <NavDropdown title={
                  <span style={{ color: "white" }}>Users</span>
                } id="basic-nav-dropdown">
                  <NavDropdown.Item href="/users">TruKApp Users</NavDropdown.Item>
                  <NavDropdown.Item href="/management">User Management</NavDropdown.Item>

                </NavDropdown>
                {/* <Nav.Link href="/users" style={{ color: "#ffff" }}>Users</Nav.Link> */}
                {/* <Nav.Link href="/date" style={{ color: "#ffff" }}>Date</Nav.Link> */}
                <Nav.Link href="/vehicles" style={{ color: "#ffff" }}>Vehicles</Nav.Link>
                <Nav.Link href="/communication" style={{ color: "#ffff" }}>Communication</Nav.Link>
                <Nav.Link href="/queries" style={{ color: "#ffff" }}>Support</Nav.Link>
                <Button onClick={handleLogout} variant="light" style={{ backgroundColor: "#f58e26", color: "white" }}>
                  Logout
                </Button>


                <CgProfile onClick={handleShow} style={{ fontSize: '2rem', margin: '8px', color: 'white' }} />

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Profile Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {profileData.length > 0 ? (<>
                      {profileData.map((prof) => {
                        return (
                          <Form>
                            <Form.Label>User Name: {prof.firstName} {prof.lastName}</Form.Label><br />
                            <Form.Label>Email address: {prof.email}</Form.Label><br />
                            <Form.Label>Mobile: {prof.mobileNo}</Form.Label><br />
                            <Form.Label>Role: {prof.role}</Form.Label><br />
                            {/* <Form.Label>address:{prof.email}</Form.Label><br />
                          <Form.Label>company address:{prof.email}</Form.Label> */}
                          </Form>
                        )
                      })}
                    </>) : null}


                  </Modal.Body>

                </Modal>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>




    </>) : (<>
      <Navbar expand="lg" style={{ backgroundColor: "#f58e26" }}>
        <Container fluid>
          <img src='trukpng.png' style={{ height: "2rem", width: "2rem", marginRight: "1rem " }} />

          <Navbar.Brand href="">TruKApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >


            </Nav>

            <Nav>
              <Nav className="me-auto">
                {/* <NavDropdown title={
                  <span style={{ color: "white" }}>Loads</span>
                } id="basic-nav-dropdown">
                  <NavDropdown.Item href="/activeloads">Posted Loads</NavDropdown.Item>
                  <NavDropdown.Item href="/completedloads">Completed Loads</NavDropdown.Item>
                </NavDropdown> */}
                <NavDropdown title={
                  <span style={{ color: "white" }}>Referrals</span>
                } id="basic-nav-dropdown">
                  <NavDropdown.Item href="/refferals">Refferals</NavDropdown.Item>
                  <NavDropdown.Item href="/points">Withdraws</NavDropdown.Item>

                </NavDropdown>
                <NavDropdown title={
                  <span style={{ color: "white" }}>Users</span>
                } id="basic-nav-dropdown">
                  <NavDropdown.Item href="/users">TruKApp Users</NavDropdown.Item>
                  <NavDropdown.Item href="/management">User Management</NavDropdown.Item>

                </NavDropdown>
                {/* <Nav.Link href="/users" style={{ color: "#ffff" }}>Users</Nav.Link> */}
                {/* <Nav.Link href="/date" style={{ color: "#ffff" }}>Date</Nav.Link> */}
                <Nav.Link href="/vehicles" style={{ color: "#ffff" }}>Vehicles</Nav.Link>
                <Nav.Link href="/communication" style={{ color: "#ffff" }}>Communication</Nav.Link>
                <Nav.Link href="/queries" style={{ color: "#ffff" }}>Support</Nav.Link>
                <Button onClick={handleLogout} variant="light" style={{ backgroundColor: "#f58e26", color: "white" }}>
                  Logout
                </Button>


                <CgProfile onClick={handleShow} style={{ fontSize: '2rem', margin: '8px', color: 'white' }} />

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Profile Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {profileData.length > 0 ? (<>
                      {profileData.map((prof) => {
                        return (
                          <Form>
                            <Form.Label>User Name: {prof.firstName} {prof.lastName}</Form.Label><br />
                            <Form.Label>Email address: {prof.email}</Form.Label><br />
                            <Form.Label>Mobile: {prof.mobileNo}</Form.Label><br />
                            <Form.Label>Role: {prof.role}</Form.Label><br />
                            {/* <Form.Label>address:{prof.email}</Form.Label><br />
                          <Form.Label>company address:{prof.email}</Form.Label> */}
                          </Form>
                        )
                      })}
                    </>) : null}


                  </Modal.Body>

                </Modal>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>




    </>) : null


  );
}
