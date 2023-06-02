// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// export default function UsersPopUp(props) {

//     const [vehicle, setVehicle] = useState({})
//     const [isValid, setIsValid] = useState(false)
//     const user = localStorage.getItem('userPop')
//     const User = JSON.parse(user)
//     console.log(User)



//     return (

//         User ? (<Modal
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >

//             <Modal.Header closeButton>

//                 <Modal.Title id="contained-modal-title-vcenter">
//                     {User.firstName} {User.lastName}
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 {/* <h4>{User.role}</h4>
//                 <div>
//                     {User.mobileNo},
//                     {User.routes.length > 0 ? (<>
//                         {
//                             User.routes.map((route) => {
//                                 return <p style={{ display: "inline-block" }}>{route},</p>
//                             })
//                         }
//                     </>) : null}



//                     GST verify -- {User.gstVerify}
//                     Aadhar verify -- {User.aadharVerify}

//                 </div> */}

//                 <div>
//     <div className="orange"></div>

//     <div className="bg-container">

//       <div style={{ flexDirection:'column', marginLeft:'30px', marginRight:'30px'}}>
//       <div className="container2">
//         <h1 className="heading">King Kong</h1>
//         <p className="para">Agent</p>
//         <p className="para">Skull island</p>
//         {/* <h1 className="heading2">KycCompleted</h1> */}
//         <div className="con-2">Kyc Completed</div>
//       </div>

//       <div className="container3-3">
//             <h2 className="heading0">Address Details</h2>
//             <p>
//               <strong>Address Type</strong> <span>:</span> 
//             </p>
//             <p>
//               <strong>Door No/Building No</strong> <span>:</span> 
//             </p>
//             <p>
//               <strong>Street</strong> <span>:</span> 
//             </p>
//             <p>
//               <strong>Landmark</strong> <span>:</span> 
//             </p>
//             <p>
//               <strong>City</strong> <span>:</span> 
//             </p>

//             <p>
//               <strong>Pincode</strong> <span>:</span> 
//             </p>
//           </div>
//           </div>
//           <div style={{ flexDirection:'column', marginLeft:'30px', marginRight:'30px'}}>
//       <div className="container3">
//         <div className="container3-1">
//           <img src="https://e7.pngegg.com/pngimages/279/962/png-clipart-aadhaar-uidai-identity-document-permanent-account-number-india-india-text-logo.png" className="img2" />

//           <div className="con3-2">Adhar Verified</div>
//         </div>
//         <div className="container3-1">
//           <img src="https://img.freepik.com/premium-photo/gst-with-red-arrow-going-up_698953-12234.jpg?w=2000" className="img2" />

//           <div className="con3-2">
//             Gst verified
//           </div>
//           <div className="container3-4">
//           <h1 className="heading3-4">Routes Operating<hr /></h1>
//           <p className="pa">Maharashtra,Karnataka</p>


//         </div>
//         </div>
//         <div>

//         </div>

//       </div>
//       </div>



//     </div>
//     </div>
//             </Modal.Body>

//         </Modal>) : null


//     );
// }
import React from "react";

// import './Adhar.css'
const UsersPopUp = () => {
    const Adress = {
        AdressType: 'Office',
        doorNo: '44-1-9',
        street: "Dharavari Street",
        landmark: 'sivalayam temple',
        city: 'Ongole',
        Pincode: '523105'

    }
    const user = localStorage.getItem('userPop')
        const User = JSON.parse(user)
        console.log(User)

    return (
        <div>
            {/* <div className="orange"></div> */}

            <div className="bg-container">

                <div style={{ flexDirection: 'column', marginLeft: '30px', marginRight: '30px' }}>
                    <div className="container2">
                        <h1>{User.firstName} {User.lastName}</h1>
                        <p >{User.role}</p>
                        <p >{User.city}</p>
                        {/* <h1 className="heading2">KycCompleted</h1> */}
                        {/* <div className="con-2">{User.gstVerify}</div>
                        <div className="con-2">{User.aadharVerify}</div> */}
                    </div>

                    <div className="container3-3">
                        <h2 className="heading0">Address Details</h2>
                        <p>
                            <strong>Address Type</strong> <span>:</span>{User.addressType}
                        </p>
                        <p>
                            <strong>Door No/Building No</strong> <span>:</span>{User.doorNo}
                        </p>
                        <p>
                            <strong>Street</strong> <span>:</span>{User.areaName}
                        </p>
                        <p>
                            <strong>Landmark</strong> <span>:</span>{User.landMark}
                        </p>
                        <p>
                            <strong>City</strong> <span>:</span> {User.city}
                        </p>

                        <p>
                            <strong>Pincode</strong> <span>:</span> {User.pincode}
                        </p>
                    </div>
                </div>
                <div style={{ flexDirection: 'column', marginLeft: '30px', marginRight: '30px' }}>
                    <div className="container3">
                        <div className="container3-1">
                            <img src="https://e7.pngegg.com/pngimages/279/962/png-clipart-aadhaar-uidai-identity-document-permanent-account-number-india-india-text-logo.png" className="img2" />

                            <div className="con3-2">Adhar Verified</div>
                        </div>
                        <div className="container3-1">
                            <img src="https://img.freepik.com/premium-photo/gst-with-red-arrow-going-up_698953-12234.jpg?w=2000" className="img2" />

                            <div className="con3-2">
                                Gst verified
                            </div>
                            <div className="container3-4">
                                <h1 className="heading3-4">Routes Operating<hr /></h1>
                                <p className="pa">Maharashtra,Karnataka</p>


                            </div>
                        </div>
                        <div>

                        </div>

                    </div>
                </div>



            </div>
        </div>
    )
}
export default UsersPopUp;