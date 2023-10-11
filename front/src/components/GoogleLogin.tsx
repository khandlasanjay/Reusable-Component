import React from 'react';
import { getGoogleUrl, } from '../Utils/helper';
import { Box } from '@mui/material';
import GoogleButton from 'react-google-button';
const GoogleLogin = () => {
    const socialLoginHandler = () => {
        console.log("socialLoginHandler")
        const url = getGoogleUrl("/");
        window.open(url, '_self');
    };
    console.log("GoogleLogin")

    return (
        <div className="login-main-div">
            <Box component="div" className="login">
                <Box
                    component="div"
                >
                    <GoogleButton
                        type="light"
                        onClick={socialLoginHandler}
                        style={{
                            width: '100%',
                            marginTop: '20px',
                        }}
                    />

                </Box>
            </Box>
        </div>
    );
};

export default GoogleLogin;