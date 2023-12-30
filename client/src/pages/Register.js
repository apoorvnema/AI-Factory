import React, { useState, useEffect, useRef } from 'react'
import { Box, Typography, useMediaQuery, TextField, Button, Alert, Collapse } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import '../App.css'
import { inputTextStyle, inputTextColor, textFont } from '../styles'
import API_CONFIG from '../config'

const Register = () => {
    const navigate = useNavigate()

    //media
    const isNotMobile = useMediaQuery('(min-width:1000px)')

    //states
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const usernameRef = useRef(null);

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${API_CONFIG.API_BASE_URL}/api/v1/auth/register`, { username, email, password })
            toast.success('User Register Successfully')
            navigate('/login')
        } catch (err) {
            if (err.response.data.error) {
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
            backgroundColor={'#202123'}>
            <form onSubmit={handleSubmit}>
                <Typography sx={{ color: "white", ...textFont }} variant='h3'>Sign Up</Typography>
                <TextField inputProps={{ ...inputTextColor }} sx={inputTextStyle} autoComplete='off' label='Username' required type='text' fullWidth={true} margin='normal'
                    value={username} onChange={(e) => setUsername(e.target.value)} inputRef={usernameRef} />
                <TextField inputProps={{ ...inputTextColor }} sx={inputTextStyle} autoComplete='email' label='Email' type='email' required fullWidth={true} margin='normal'
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField inputProps={{ ...inputTextColor }} sx={inputTextStyle} autoComplete='new-password' label='Password' type='password' required fullWidth={true} margin='normal'
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type='submit' fullWidth={true} variant='contained' size='large' sx={{ color: "white", mt: 2, backgroundColor: '#0da37f', ...textFont, '&:hover': { backgroundColor: '#0b8e72' } }}>Sign Up</Button>
                <Typography sx={{ color: "white", ...textFont }} mt={2}>Already have an account? <Link style={{ padding: 0 }} className='link' to='/login'>Please Login</Link></Typography>
                <Collapse in={error !== ''}>
                    <Alert severity='error' sx={{ mb: 2, ...textFont }}>
                        {error}
                    </Alert>
                </Collapse>
            </form>
        </Box>
    )
}

export default Register