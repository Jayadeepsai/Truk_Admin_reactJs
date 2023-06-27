import { useNavigate } from 'react-router-dom'
import React, { useEffect } from "react"

const PrivateRoutes = (props) => {

    const { Component } = props
    const navigate = useNavigate();

    useEffect(() => {
        const login = localStorage.getItem('isLoggedIn')
        if (!login) {
            navigate('/')
        }
    })

    return (
        <Component />
    )
}

export default PrivateRoutes;