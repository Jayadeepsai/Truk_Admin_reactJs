import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";


const HideTopNav = ({children}) =>{  //you export the children prop in app.js

    const location = useLocation()  //uselocation is import from react router dom
    const [showbar, setshowbar] = useState(false)

    useEffect(() => {
        console.log('this is location:', location)
        if (location.pathname === '/') {  //showbar is false show the loginform
            setshowbar(false)  
        } else{
            setshowbar(true)  //show bar is true it navigate to mysidenav
        }
    },[location])
    return(
        <div>{showbar && children}</div>  //showbar and children are props
    )
}
export default HideTopNav