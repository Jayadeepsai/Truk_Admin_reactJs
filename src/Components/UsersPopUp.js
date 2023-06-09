
import React from "react";

import './Adhar.css'
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
    //const adharVerificationClass = User.aadharVerify === 'Verified' ? 'con3-2' : 'con3-5';
    let adharVerificationClass;
    let containerclass;
    if (User.aadharVerify === 'Verified') {
        adharVerificationClass = 'con3-2'
        containerclass= 'container3-1'
    } else if (User.aadharVerify === 'notVerified') {
        adharVerificationClass = 'con3-5';
        containerclass='container3-6'
    }


    let gstverificationclass;
    let gstclass;
    if (User.gstVerify === 'Verified') {
        gstverificationclass = 'con3-2'
        gstclass= 'container3-1'
    } else if (User.gstVerify === 'notVerified') {
        gstverificationclass= 'con3-5';
        gstclass='container3-6'
    }






    
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
                        <div className={containerclass}>
                            <img src="https://e7.pngegg.com/pngimages/279/962/png-clipart-aadhaar-uidai-identity-document-permanent-account-number-india-india-text-logo.png" className="img2" />

                            <div className={adharVerificationClass}>{User.aadharVerify}</div>
                        </div>
                        
                        <div className={gstclass}>
                            <img src="https://img.freepik.com/premium-photo/gst-with-red-arrow-going-up_698953-12234.jpg?w=2000" className="img2" />

                            <div className={gstverificationclass}>
                                {User.gstVerify}
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
