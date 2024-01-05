import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import '../App.css'
import { Box, Typography } from '@mui/material'
import { NavLink as Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { textFont, nav } from '../styles'
import InfoDialog from './InfoDialog';
import API_CONFIG from '../config'
import { TextToSpeech } from '@capacitor-community/text-to-speech';

const Navbar = () => {
    const navigate = useNavigate();
    const synthesis = window.speechSynthesis;
    const [expirationTime, setExpirationTime] = useState(0);

    const handleLogout = useCallback(async () => {
        try {
            await axios.post(`${API_CONFIG.API_BASE_URL}/api/v1/auth/logout`);
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setExpirationTime(0);
            localStorage.removeItem('expirationTime');
            toast.success('Logout Successfully');
            navigate('/login');
        } catch (err) {
            if (err.code === "ERR_NETWORK") {
                toast.error('Couldn\'t Connect with the Server')
            }
            else {
                toast.error('Logout Failed');
            }
        } finally {
            if (TextToSpeech) {
                TextToSpeech.stop();
            }
            else {
                synthesis.cancel();
            }
        }
    }, [navigate, synthesis]);

    // Use useEffect to fetch the token and expiration time from the server
    useEffect(() => {
        const checkTokenExpiration = () => {
            const currentTime = Date.now();

            if (localStorage.getItem('expirationTime') && expirationTime < currentTime) {
                // Token expired, perform logout
                handleLogout();
            }
        };

        const fetchToken = async () => {
            try {
                const expiration = localStorage.getItem('expirationTime');
                setExpirationTime(expiration);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchToken();

        // Schedule the next check after a certain interval (e.g., every 30 seconds)
        const intervalId = setInterval(checkTokenExpiration, 30 * 1000); // 30 seconds

        // Cleanup the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        }
    }, [expirationTime, handleLogout]);

    const home = () => {
        if (TextToSpeech) {
            TextToSpeech.stop();
        }
        else {
            synthesis.cancel();
        }
    }

    const loggedin = localStorage.getItem('authToken')
    return (
        <Box
            width={"100%"}
            p={"1rem 6%"}
            textAlign={"center"}
            backgroundColor="#202123"
            sx={{ boxShadow: 3 }}>
            <Typography sx={{ ...textFont, ...nav }} variant='h1' color={"#ffffff"} fontWeight={"bold"} fontSize={40}>
                <img src="/ai-factory-favicon-color.png" width="60px" alt="logo"></img>AI Factory
            </Typography>
            {
                loggedin ? (<>
                    <Link to="/" onClick={home} className='link'>
                        Home
                    </Link>
                    <Link to="/login" onClick={handleLogout} className='link'>
                        Logout
                    </Link>
                </>) : (<>
                    <Link to="/register" className='link'>
                        Sign Up
                    </Link>
                    <Link to="/login" className='link'>
                        Sign In
                    </Link>
                </>)
            }
            <InfoDialog />
        </Box>
    )
}

export default Navbar