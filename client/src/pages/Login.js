import React, { useState, useEffect, useRef } from 'react'
import { Box, Typography, useMediaQuery, TextField, Button, Alert, Collapse } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import '../App.css'
import { inputTextStyle, inputTextColor, textFont } from '../styles'
import API_CONFIG from '../config'

const Login = () => {
    const navigate = useNavigate()

    //media
    const isNotMobile = useMediaQuery('(min-width:1000px)')

    //states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const usernameRef = useRef(null);

    useEffect(() => {
        // Log the username whenever it changes
        localStorage.setItem('user', username)
    }, [username]);

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response_login = await axios.post(`${API_CONFIG.API_BASE_URL}/api/v1/auth/login`, { email, password })
            toast.success('Login Successfully')
            localStorage.setItem('authToken', response_login.data.token)
            localStorage.setItem('expirationTime', response_login.data.expirationTime)
            const response = await axios.get(`${API_CONFIG.API_BASE_URL}/api/v1/auth/users/${email}`);
            setUsername(response.data.username);
            setTimeout(() => {
                navigate('/')
            }, 100)
        } catch (err) {
            if (err.code === "ERR_NETWORK") {
                setError('Couldn\'t Connect with the Server')
            }
            else if (err.response.data.error) {
                setError(err.response.data.error)
            }
            else if (err.message) {
                setError(err.message)
            }
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }

    useEffect(() => {
        // Focus on the username field when the component mounts
        if (usernameRef.current) {
            usernameRef.current.focus();
        }
    }, []);

    return (
        <Box width={isNotMobile ? '40%' : '80%'} p={'2rem'}
            m={'2rem auto'}
            borderRadius={5}
            sx={{ boxShadow: 5 }}
            backgroundColor={"#202123"}>
            <form onSubmit={handleSubmit}>
                <Typography sx={{ color: "white", ...textFont }} variant='h3'>Login</Typography>
                <TextField inputProps={inputTextColor} sx={inputTextStyle} autoComplete='email' label='Email' type='email' required fullWidth={true} margin='normal'
                    value={email} onChange={(e) => setEmail(e.target.value)} inputRef={usernameRef} />
                <TextField inputProps={inputTextColor} sx={inputTextStyle} autoComplete='password' label='Password' type='password' required fullWidth={true} margin='normal'
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type='submit' fullWidth={true} variant='contained' size='large' sx={{ color: "white", mt: 2, backgroundColor: '#0da37f', ...textFont, '&:hover': { backgroundColor: '#0b8e72' } }}>Login</Button>
                <Typography sx={{ color: "white", ...textFont }} mt={2}>Don't have an account? <Link style={{ padding: 0 }} className='link' to='/register'>Please Sign Up</Link></Typography>
                <Collapse in={error !== ''}>
                    <Alert severity='error' sx={{ mb: 2, ...textFont }}>
                        {error}
                    </Alert>
                </Collapse>
            </form>
        </Box>
    )
}

export default Login