import React from 'react'
import '../App.css'
import { Box, Typography } from '@mui/material'
import { NavLink as Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { textFont, nav } from '../styles'
import InfoDialog from './InfoDialog';

const Navbar = () => {
    const navigate = useNavigate();
    const synthesis = window.speechSynthesis;

    const handleLogout = async () => {
        try {
            await axios.post('https://ai-factory-api.apoorvnema.pro/api/v1/auth/logout')
            localStorage.removeItem('authToken')
            localStorage.removeItem('user')
            toast.success('Logout Successfully')
            navigate('/login')
        }
        catch (err) {
            toast.error('Logout Failed')
        }
        finally {
            synthesis.cancel();
        }
    }
    const home = () => {
        synthesis.cancel();
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