import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Icon } from '@iconify/react';
import filterLine from '@iconify-icons/majesticons/filter-line';
import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Adhar from './Ahdar/Adhar';
import Editprofile from './Editprofile';

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

export default function Management() {
    const [modalShow, setModalShow] = useState(false);
    const [data, setData] = useState([]);
    const [addPopUpShow, setAddPopUpShow] = useState(false);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        getDetails();
    }, []);

    const getDetails = () => {
        axios
            .get('https://motionless-cowboy-hat-ant.cyclic.app/admin/getuser')
            .then(response => {
                setData(response.data.user);
                console.log(response.data.user);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const deleteHandler = (id) => {
        alert('Are you sure you want to delete?');
        axios
            .delete('https://motionless-cowboy-hat-ant.cyclic.app/admin/delete/' + id)
            .then((response) => {
                const updatedData = data.filter((row) => row._id !== id);
                setData(updatedData);
                getDetails();
            })
            .catch((error) => console.log(error));
    };

    const values = [true];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }

    const handleEdit = (row) => {
        setDetails(row);
        setModalShow(true);
    };

    const handleClose = () => {
        setModalShow(false);
        setDetails(null);
    };

    const handleAdd = () => {
        setAddPopUpShow(true);
    };

    const handleUpdate = () => {
        const body = {
            firstName: details.firstName,
            lastName: details.lastName,
            mobileNo: details.mobileNo,
            email: details.email,
            password: details.password
          
        };

        axios.put('https://motionless-cowboy-hat-ant.cyclic.app/admin/update/' + details._id, body)
            .then((response) => {
                console.log("User is updated");
                // Refresh the data after updating
                alert('Are you sure want to update')
                getDetails();
                setModalShow(false);
                setDetails(null);
            })
            .catch((error) => console.log(error));
    }


    return (
        <>
            <Button
                style={{ backgroundColor: '#F58E26', width: '150px', borderRadius: '10px', margin: '30px',color:"white" }}
                variant='light'
                onClick={handleAdd}
            >
                + Add Analyst
            </Button>
            <Editprofile show={addPopUpShow} onHide={() => setAddPopUpShow(false)} />
            <div className='container'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow style={{ paddingLeft: '10px' }}>
                            <StyledTableCell style={{ fontSize: '20px' }}>S.No&nbsp;</StyledTableCell>
                            <StyledTableCell style={{ fontSize: '20px' }}>Name&nbsp;</StyledTableCell>
                            <StyledTableCell style={{ fontSize: '20px' }}>Email&nbsp;</StyledTableCell>
                            <StyledTableCell style={{ fontSize: '20px' }}>Mobile Number&nbsp;</StyledTableCell>
                            <StyledTableCell style={{ fontSize: '20px' }}>Role&nbsp;</StyledTableCell>
                            <StyledTableCell style={{ fontSize: '20px' }}>Actions&nbsp;</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {row.firstName} {row.lastName}
                                </StyledTableCell>
                                <StyledTableCell>{row.email}</StyledTableCell>
                                <StyledTableCell>{row.mobileNo}</StyledTableCell>
                                <StyledTableCell>{row.role}</StyledTableCell>
                                <StyledTableCell>
                                    <div>
                                        <Button
                                            style={{ backgroundColor: '#F58E26', borderColor: '#F58E2', margin: '20px', color:"white" }}
                                            variant='light'
                                            onClick={() => handleEdit(row)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            className="me-2 mb-2"
                                            style={{ backgroundColor: '#F58E26', borderColor: '#F58E2', marginTop: '7px', color:"white"  }}
                                            variant='light'
                                            onClick={() => deleteHandler(row._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
            {details && (
                <Modal
                    show={modalShow}
                    onHide={handleClose}
                    size="500px"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="ebody">
                        <div style={{ display: 'flex', marginLeft: '80px' }}>
                            <form className="edit">
                                <label>Enter First Name:</label>
                                <br />
                                <input
                                    type="text"
                                    value={details.firstName}
                                    onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
                                />
                                <br />
                                <label>Enter Last Name</label>
                                <br />
                                <input
                                    type="text"
                                    value={details.lastName}
                                    onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
                                />
                                <br />
                                <label>Enter MailID</label>
                                <br />
                                <input
                                    type="email"
                                    value={details.email}
                                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                                />
                                <br />
                                <label>Enter Mobile Number</label>
                                <br />
                                <input
                                    type="number"
                                    value={details.mobileNo}
                                    onChange={(e) => setDetails({ ...details, mobileNo: e.target.value })}
                                />
                                <br />
                                <br />
                                <Button
                                   style={{ backgroundColor: '#F58E26', borderColor: '#F58E2', marginTop: '7px', color:"white" ,alignItems:"right" }}
                                   variant='light'
                                    onClick={handleUpdate}
                                >
                                    Update
                                </Button>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
}