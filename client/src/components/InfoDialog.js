import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { buttonStyle } from '../styles'
import InfoIcon from '@mui/icons-material/Info';
import "../App.css"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const InfoDialog = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Link onClick={handleOpen}>
                <InfoIcon sx={{ ...buttonStyle }} />
            </Link>

            <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: "8px", bgcolor: "#40414f" } }}>
                <DialogActions sx={{ bgcolor: "#40414f", color: "white" }}>
                    <DialogTitle sx={{ position: 'absolute', left: '0px' }}>About App</DialogTitle>
                    <IconButton color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
                <DialogContent className='text-generation' sx={{ bgcolor: "#202123", color: "white", borderTop: "2px #0da37f solid", borderBottom: "2px #0da37f solid" }}>
                    <p>Made By <a className="link" style={{ padding: 0 }} href="https://apoorvnema.pro">Apoorv Nema &#8599;</a></p>
                    <p>Version : 2.0</p>
                    <p style={{ display: "flex" }}><LinkedInIcon sx={{ fill: "white" }} /><a className="link" style={{ padding: "1px", paddingTop: "2px" }} href="https://linkedin.com/in/apoorvnema">LinkedIn Profile &#8599;</a></p>
                    <p style={{ display: "flex" }}><GitHubIcon sx={{ fill: "white" }} /><a className="link" style={{ padding: "1px", paddingTop: "2px" }} href="https://github.com/apoorvnema/AI-Factory">GitHub Repository &#8599;</a></p>
                </DialogContent>

                <DialogActions sx={{ bgcolor: "#40414f", color: "white", padding: "20px" }}>
                    <DialogTitle sx={{ position: 'absolute', left: '0px', }}>Changelogs</DialogTitle>
                </DialogActions>
                <DialogContent className='text-generation' sx={{ bgcolor: "#202123", color: "white", borderTop: "2px #0da37f solid", borderBottom: "2px #0da37f solid" }}>

                    <ul style={{ padding: 0, paddingLeft: "18px", listStyleType: "circle", color: "white" }}>
                        <li><strong>Version 2.0 (Latest Release)</strong>
                            <ul style={{ padding: 0, paddingLeft: "18px", listStyleType: "circle", color: "#0da37f" }}>
                                <li>Chat Interface with Voice Narration</li>
                                <li>Summary Generation Feature</li>
                                <li>Paragraph Creation Feature</li>
                                <li>Text to JavaScript Code Conversion</li>
                                <li>Image Generation with DALL-E-2 Model</li>
                                <li>Login and Logout with username display</li>
                                <li>UI and UX Changes</li>
                            </ul>
                        </li>
                        <li><strong>Version 1.0 (Initial Release)</strong>
                            <ul style={{ padding: 0, paddingLeft: "18px", listStyleType: "circle", color: "#0da37f" }}>
                                <li>ChatGPT 3.5 Turbo ChatBot</li>
                            </ul>
                        </li>
                    </ul>

                </DialogContent>

            </Dialog>
        </div>
    );
};

export default InfoDialog;
