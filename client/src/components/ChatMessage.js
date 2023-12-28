import { Typography } from '@mui/material'
import React from 'react'
import { textFont } from '../styles'
import '../App.css'

const ChatMessage = ({ message }) => {
    return (
        <div className={`chat-message ${message.user === "gpt" ? "chatgpt" : "user"}`}>
            <div className="chat-message-center">
                <div className={`avatar ${message.user === "gpt" ? "chatgpt" : "user"}`}>
                    {message.user === "gpt" ? <img src="/chatGPT.svg" className='avatar chatgpt' alt="chatGPT" /> : <img src="/ai-factory-favicon-color.png" className='avatar user' alt="Logo" />}
                </div>
                <div className="message">
                    <Typography sx={{ ...textFont }} color={'#ffffff'} variant='h6'><pre className='text-generation text-size' style={{
                        fontFamily: 'inherit', background: "none", margin: 0, textWrap: "pretty",
                    }}>
                        {message.message}
                    </pre></Typography>
                    { }
                </div>
            </div>
        </div>
    )
}

export default ChatMessage