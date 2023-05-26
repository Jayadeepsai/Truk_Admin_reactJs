import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import InputGroup from 'react-bootstrap/InputGroup';
import * as ImIcons from "react-icons/im"
import { Navigate, useNavigate } from 'react-router-dom';



export default function Header() {

  const navigate = useNavigate()
  const handleLogout = () =>{
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('adminEmail')
    navigate('/login');
  }
  
  return (
    <>
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

              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>

            <Nav>
              <Nav className="me-auto">
              <NavDropdown title={
                <span style={{color:"white"}}>Loads</span>
              } id="basic-nav-dropdown">
              <NavDropdown.Item href="/activeloads">Posted Loads</NavDropdown.Item>
              <NavDropdown.Item href="/completedloads">Completed Loads</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={
                <span style={{color:"white"}}>Referrals</span>
              } id="basic-nav-dropdown">
              <NavDropdown.Item href="/refferals">Refferals</NavDropdown.Item>
              <NavDropdown.Item href="/completedloads">Withdraws</NavDropdown.Item>
             
            </NavDropdown>
                <Nav.Link href="/users" style={{ color: "#ffff" }}>Users</Nav.Link>
                {/* <Nav.Link href="/date" style={{ color: "#ffff" }}>Date</Nav.Link> */}
                <Nav.Link href="/vehicles" style={{ color: "#ffff" }}>Vehicles</Nav.Link>
                <Button onClick={handleLogout} style={{ backgroundColor:"#f58e26" }}>
                  Logout
                </Button>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      

      
    </>

  );
}
