import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping

import './sidenav.css'
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CgProfile } from 'react-icons/cg';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



function MySidenav() {
    const activeLink = 'hover:bg-red-500 mt-7 pl-7 w-full h-14 flex justify-start items-center text-white text-2xl space-x-1 font-bold bg-red-500'
    const normalLink = 'hover:bg-red-500 pl-7 mt-7 w-full h-14 flex justify-start items-center text-white text-2xl space-x-1 font-bold'

    const [show, setShow] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', false)
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <div>
            <div className='topnav'>

                <Nav style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <NavItem style={{ marginTop: '10px' }} >
                            <span style={{ fontSize: '40px', marginTop: '20px', marginLeft: '20px' }}>
                            <img src='trukpng.png' style={{ height: "2rem", width: "2rem", marginRight: "1rem " }} />
                                TrukApp
                            </span>
                        </NavItem>
                    </div>

                    <div style={{ display: 'flex', borderRadius: '15px', paddingRight: '10px', marginTop: '5px', marginRight: '30px' }}>
                        <div>

                            <Button variant="primary" onClick={handleShow} style={{ backgroundColor:'#F58E26', border:'none'}}>
                                <CgProfile style={{ fontSize: '59.34px', marginTop: '10px', color: '#fff' }} />
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Profile Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                    <Form.Label>Email address</Form.Label><br/>
                                    <Form.Label>phonenumber</Form.Label><br/>
                                    <Form.Label>role</Form.Label><br/>
                                    <Form.Label>address</Form.Label><br/>
                                    <Form.Label>company address</Form.Label>
                                    </Form>
                                </Modal.Body>
                               
                            </Modal>
                        </div>
                        {/* <div>
                                <NavDropdown style={{ fontSize: '50px', marginLeft: '50px', color: '#fff' }} id="nav-dropdown">
                                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </div> */}
                        <div>
                            <button onClick={handleLogout} style={{ fontSize: '20px', marginLeft: '10px', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', marginTop: '25px' }}>
                                Logout
                            </button>
                        </div>
                    </div>
                </Nav>

            </div>

            <div className='side'>
                <SideNav style={{ backgroundColor: '#F58E26', marginTop: '90px' }}

                    onSelect={(selected) => {
                        // Add your code here
                        console.log(selected);
                        navigate('/' + selected)
                    }}
                    className='mysidenav'
                >

                    {/* <span style={{ fontSize: '40px', marginTop: '10px', marginLeft: '20px' }}><img src='ellipse truk logo.png' style={{ width: '60px', marginTop: '0px', fontSize: '50px' }} />TrukApp</span> */}
                    {/* <span style={{fontSize:'30px', marginTop:'10px'}}><img src='fc123efc-1288-44d6-9f72-73871b57123b.jpeg' style={{ width:'40px', marginTop:'10px'}}/>TruKApp</span> */}
                    {/* <Nav className="bars"> */}
                    <SideNav.Toggle />



                    <SideNav.Nav >
                        <NavItem style={{ marginBottom:'10px' }} eventKey="activeloads" className={isActive ? 'active' : ''} onClick={() => setIsActive(true)}>
                            <NavIcon>
                                {/* <i className="material-symbols:space-dashboard-outline" style={{ fontSize: '1.75em' }} />
                 */}
                                <Icon icon="material-symbols:space-dashboard-outline" style={{ fontSize: '30px', fontWeight: 'bold', color: 'white' }} />
                            </NavIcon>
                            <NavText style={{ fontSize: '20px' }} >
                                <b href="/activeloads">ActiveLoads</b>
                                
                            </NavText>
                        </NavItem>
                        <NavItem style={{ marginBottom:'10px' }} eventKey="Postedloads">
                            <NavIcon>
                                {/* <i className="fa-regular fa-envelopes-bulk" style={{ fontSize: '1.75em' }} /> */}
                                <Icon icon="tabler:square-letter-b" style={{ fontSize: '30px', color: 'white' , }} />
                            </NavIcon>
                            <NavText style={{ fontSize: '20px' }}>
                                <b>Posted Loads</b>
                            </NavText>
                        </NavItem>
                        {/* <NavItem eventKey="Cancledbookings">
                            <NavIcon>
                                <i className="fa-solid fa-id-card-clip" />
                                <Icon icon="mdi:book-cancel" style={{ fontSize: '30px' }} />
                            </NavIcon>
                            <NavText style={{ fontSize: '20px' }}>
                                Cancled Bookings
                            </NavText>
                        </NavItem> */}
                        <NavItem style={{ marginBottom:'10px' }} eventKey="Trukcompines">
                            <NavIcon>
                                <i className="fa-solid fa-truck-fast" style={{ fontSize: '30px', color: 'white', marginTop:'10px' }} />
                            </NavIcon>
                            <NavText style={{ fontSize: '20px' }}>
                                <b>Truk Companies</b>
                            </NavText>
                        </NavItem>
                        <NavItem style={{ marginBottom:'10px' }} eventKey="Completeddeals">
                            <NavIcon>
                                {/* <i className="fa fa-fw fa-home"  /> */}
                                <Icon icon="ph:cube-bold" style={{ fontSize: '30px', color: 'white' }} />
                            </NavIcon>
                            <NavText style={{ fontSize: '20px' }}>
                                <b>Completed Deals</b>
                            </NavText>
                        </NavItem>
                        <NavItem style={{ marginBottom:'10px' }} eventKey="Referrals">
                            <NavIcon>
                                {/* <i className="fa fa-fw fa-home"  /> */}
                                <Icon icon="healthicons:referral" style={{ fontSize: '30px', color: 'white' }} />
                            </NavIcon>
                            <NavText style={{ fontSize: '20px' }}>
                                <b>Referrals</b>
                            </NavText>
                        </NavItem>
                        <NavItem style={{ marginBottom:'10px' }} eventKey="communications">
                            <NavIcon>
                                {/* <i className="fa fa-fw fa-home"  /> */}
                                <Icon icon="fluent:communication-16-regular" style={{ fontSize: '30px', color: 'white' }} />
                            </NavIcon>
                            <NavText style={{ fontSize: '20px' }}>
                                <b>Communications</b>
                            </NavText>
                        </NavItem>
                        <NavItem style={{ marginBottom:'10px' }} eventKey="Support">
                            <NavIcon>
                                {/* <i className="fa-solid fa-folder-user" /> */}
                                <Icon icon="material-symbols:contact-page" style={{ fontSize: '30px', color: 'white' }} />
                            </NavIcon>
                            <NavText style={{ fontSize: '20px' }}>
                                <b> Support</b>
                            </NavText>
                        </NavItem>

                    </SideNav.Nav>
                    {/* </Nav> */}
                </SideNav>
            </div>
        </div>

    )
}

export default MySidenav;