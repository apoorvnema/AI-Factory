import React, { useState } from 'react'
import '../App.css'
import { Box, Typography, useMediaQuery, TextField, Button, Alert, Collapse, Card, CircularProgress, Select, MenuItem, InputLabel, } from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { inputTextColor, inputTextStyle, textFont, codeFont, selectTextStyle } from '../styles'
import API_CONFIG from '../config'

const Feature = (props) => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        // Redirect to login page or show an error message
        window.location.href = '/login';
    }

    const { headline, api, noCode, featureName, imageGen } = props

    //media
    const isNotMobile = useMediaQuery('(min-width:1000px)')

    //states
    const [text, setText] = useState('')
    const [variable, setVariable] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    async function handleKeyPress(e) {
        if (e.key === "Enter") {
            if (e.shiftKey) {
                return;
            }
            handleSubmit(e);
        }
    }

    //handle submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${API_CONFIG.API_BASE_URL}/api/v1/openai/` + api,
                { text, selectedLanguage },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setVariable(data.message);
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
        finally {
            // Set loading back to false regardless of success or failure
            setLoading(false);
        }

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }

    return (
        <Box width={isNotMobile ? '40%' : '80%'} p={'2rem'}
            m={'2rem auto'}
            borderRadius={5}
            sx={{ boxShadow: 5 }}
            backgroundColor={'#202123'}>
            <form onSubmit={handleSubmit}>
                <Typography sx={textFont} color={'#ffffff'} variant='h3'>{headline}</Typography>
                <TextField inputProps={inputTextColor} sx={inputTextStyle} placeholder='Enter text here' multiline={true} type='text' required fullWidth={true} margin='normal'
                    value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyPress} />
                {noCode ? '' : <><InputLabel sx={{ color: "white", ...textFont, }} mt={2}> Select Source Language:</InputLabel>
                    <Select
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        fullWidth={true}
                        inputProps={{ ...inputTextColor }} sx={{ color: 'white', ...selectTextStyle }}
                    >
                        <MenuItem value="javascript">JavaScript</MenuItem>
                        <MenuItem value="python">Python</MenuItem>
                        <MenuItem value="java">Java</MenuItem>
                        <MenuItem value="c#">C#</MenuItem>
                        <MenuItem value="c++">C++</MenuItem>
                        <MenuItem value="c">C</MenuItem>
                        {/* Add more languages as needed */}
                    </Select></>}
                <Button type='submit' disabled={loading} fullWidth={true} variant='contained' size='large' sx={{ color: "white", mt: 2, backgroundColor: '#0da37f', ...textFont, '&:hover': { backgroundColor: '#0b8e72' } }}>Submit</Button>
                <Typography sx={textFont} color={'#ffffff'} mt={2}>Not this tool ? <Link style={{ padding: 0 }} className='link' to='/'>GO BACK</Link></Typography>
                <Collapse in={error !== ''}>
                    <Alert severity='error' sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                </Collapse>
            </form>
            {
                variable ? (
                    <Card className='text-generation' sx={{ mt: 4, border: 1, boxShadow: 0, height: '500px', overflowY: 'auto', borderRadius: 5, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderColor: 'natural.medium', bgcolor: '#40414f' }}>
                        {loading && (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <CircularProgress sx={{ color: '#0da37f' }} />
                            </div>
                        )}
                        {!loading && (imageGen ? (<img src={variable} alt="AI" width="100%" height="100%"></img>) :
                            (noCode ? (<Typography sx={textFont} style={{ color: 'white' }} p={2}>{variable}</Typography>)
                                : (<pre className='text-generation'><code><Typography sx={{ ...codeFont }}>{variable}</Typography></code></pre>)))}
                    </Card>) : (
                    <Card sx={{ mt: 4, border: 1, boxShadow: 0, height: '500px', borderRadius: 5, borderColor: 'natural.medium', bgcolor: '#40414f' }}>
                        {loading && (
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <CircularProgress sx={{ color: '#0da37f' }} />
                            </div>
                        )}
                        {!loading && (<Typography variant='h5' style={{ color: 'white' }} sx={{ textAlign: 'center', verticalAlign: 'middle', lineHeight: '450px', ...textFont }}>{featureName} will Appear Here</Typography>)}
                    </Card>
                )
            }
        </Box>
    )
}

export default Feature