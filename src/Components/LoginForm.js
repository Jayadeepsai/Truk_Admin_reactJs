import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { InputGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import axios from "axios";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (password === '') {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }

    if (email === '') {
      setEmailError('Email is required');
    } else {
      setEmailError('');
    }

    // Continue with form submission if no errors
    if (password !== '' && email !== '') {
      // Send login data to the server here
      const body = {
        email: email,
        password: password
      };

      try {
        const response = await axios.post("https://motionless-cowboy-hat-ant.cyclic.app/admin/loginAdmin", body);
        console.log(response);
        if (response.status === 200) {
          alert('Login successful');
          localStorage.setItem('adminEmail', JSON.stringify(response.data.data));
          localStorage.setItem('isLoggedIn', true);
          navigate('/home');
        } else {
          alert('Please check your credentials');
        }
      } catch (error) {
        console.log(error);
        console.log("Login Failed");
        alert('Login failed');
      }
    }
  };

  return (
    <>
      <div className="trukapp" style={{ display: 'flex' }}>
        <div style={{ textAlign: 'center', width: '50%', height: '100%' }}>
          <div style={{ fontSize: '100px' }}>
            <img src="http://trukapp.com/wp-content/uploads/2021/11/1599843225043_truckapp-5.svg" width='200px' height='200px' />
          </div>
          <div className="login"  >
            <div style={{ textAlign: 'center', fontSize: '20px' }}>
              <h3>Login to your account</h3>
              <form style={{ textAlign: 'center', fontSize: '30px' }}>
                <div className="field">
                  <div>
                    <InputGroup className="mb-3" style={{ width: '30rem', margin: 'auto' }}>
                      <InputGroup.Text id="basic-addon1" style={{ width: "6rem", alignItems: 'center' }}>Email</InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                     
                    </InputGroup>
                    {emailError && <p className="error" style={{color:'red', fontSize:'15px'}}>{emailError}</p>}
                  </div>
                  <br />
                  <div>
                    <InputGroup className="mb-3" style={{ width: '30rem', margin: 'auto' }}>
                      <InputGroup.Text id="basic-addon1" style={{ width: "6rem", textAlign: 'center' }}>Password</InputGroup.Text>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputGroup.Text onClick={PasswordVisibility}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </InputGroup.Text>
                     
                    </InputGroup>
                    {passwordError && <p className="error" style={{color:'red',fontSize:'15px'}}>{passwordError}</p>}
                  </div>
                </div>
                <div>
                  <Button className="button" variant='light' style={{ backgroundColor: '#F58E26', marginLeft: '20px', color: "white" }} onClick={(e) => handleSubmit(e)}>Login now</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="img" style={{ width: '50%', height: '100vh' }}>
          <img src="https://static1.squarespace.com/static/55d64111e4b0a862eed6a419/55d80b75e4b0c9ab9657c9c8/62186795c1b2863807ba81d8/1645808539405/unsplash-image-3jG-UM8IZ40.jpg?format=1500w" style={{ maxWidth: '100%', maxHeight: '100vh', height: '750px' }} />
        </div>
      </div>
    </>
  );
};

export default LoginForm
