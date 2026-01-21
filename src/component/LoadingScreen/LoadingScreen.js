import React from 'react';
import './LoadingScreen.css';

import Logo from '../../assets/logo.png';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, IconButton } from "@mui/material";

const LoadingScreen = ({ message = "Loading your next adventure..." }) => {
    return (
        <div className="loading-screen">
            {/* Top Left Logo and Hamburger */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10000 }}>
                <img src={Logo} alt="Play2Grow" style={{ width: '120px', marginBottom: '10px' }} />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', paddingLeft: '10px' }}>
                    <IconButton style={{ color: '#535ac8' }}>
                        <MenuOutlinedIcon style={{ fontSize: '30px' }} />
                    </IconButton>
                </div>
            </div>

            <div className="loading-content">
                <div className="loading-text">{message}</div>
                <div className="loading-spinner"></div>
            </div>
        </div>
    );
};

export default LoadingScreen;
