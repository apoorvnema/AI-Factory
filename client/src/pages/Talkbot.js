import '../App.css';
import '../normal.css';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
import ChatMessage from '../components/ChatMessage';
import axios from 'axios'
import { Button, CircularProgress, MenuItem, Select, TextField } from '@mui/material';
import { inputTextColor, inputTextStyle, textFont, selectTextStyle } from '../styles';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import API_CONFIG from '../config'
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import toast from 'react-hot-toast'

const Talkbot = () => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        // Redirect to login page or show an error message
        window.location.href = '/login';
    }

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([{
        user: "gpt",
        message: "How can I help you today?"
    },
    ]);
    const [speakVol, setSpeakVol] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectModel, setSelectedModel] = useState('gemini-2.5-flash-lite');
    const synthesis = window.speechSynthesis;

    const chatLogRef = useRef();

    useEffect(() => {
        // Scroll to the bottom when chatLog or loading changes
        chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }, [chatLog, loading]);

    function clearChat() {
        setChatLog([]);
        setOpen(!open);
    }

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    }

    async function handleKeyPress(e) {
        if (e.key === "Enter") {
            if (e.shiftKey) {
                return;
            }
            handleSubmit(e);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let chatLogNew = [...chatLog, {
            user: "me",
            message: input
        }];
        setInput("");
        setChatLog(chatLogNew);
        const messages = chatLogNew.map((message) => message.message).join("\n");
        // fetch response to the api combining the chat log array of messages and sending it as a meesage to server as a post
        try {
            // Set loading to true before making the request
            setLoading(true);
            const response = await axios.post(`${API_CONFIG.API_BASE_URL}/api/v1/ai/talkbot`, { message: messages, selectModel },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            )
            setChatLog([...chatLogNew, { user: "gpt", message: `${response.data.message}` }]);
            if ('speechSynthesis' in window) {
                // Use the Web Speech API
                if (synthesis.speaking) {
                    synthesis.cancel();
                }
                if (speakVol !== false) {
                    const utterance = new SpeechSynthesisUtterance(response.data.message);
                    utterance.rate = 1; // Adjust the speaking rate (1 is normal speed)
                    utterance.pitch = 1; // Adjust the pitch (1 is the default pitch)
                    utterance.volume = 1; // Adjust the volume (0 to 1)
                    synthesis.speak(utterance);
                }
            } else if (TextToSpeech) {
                TextToSpeech.speak({
                    text: response.data.message,
                    locale: 'en-US',
                    rate: 1,
                });
            } else {
                toast.error('Speech Synthesis is not supported in this browser, and the TextToSpeech plugin is not available.');
            }
        } catch (error) {
            // Handle errors
            if (error.code === "ERR_NETWORK") {
                setChatLog([...chatLogNew, { user: "gpt", message: 'Couldn\'t Connect with the Server' }])
            }
            else {
                setChatLog([...chatLogNew, { user: "gpt", message: `Sorry, something went wrong. Please try again later.` }]);
            }
        } finally {
            // Set loading back to false regardless of success or failure
            setLoading(false);
        }
    }

    const speakButton = () => {
        if (speakVol !== false) {
            if (TextToSpeech) {
                TextToSpeech.stop();
            }
            else {
                synthesis.cancel();
            }
        }
        setSpeakVol(!speakVol);
    }

    return (
        <div className='Talkbot'>
            <div className="hamburger" onClick={handleToggle}>
                <img
                    src="/hamburger.svg"
                    alt="Hamburger Icon"
                    className="hamburger-icon"
                />
            </div>
            <aside className={`sidemenu ${open ? 'open' : ''}`}>
                <div className="side-menu-button" onClick={clearChat}>
                    <span>+</span>
                    New Chat
                </div>
                <Select
                    value={selectModel}
                    onChange={handleModelChange}
                    fullWidth={true}
                    inputProps={{ ...inputTextColor }} sx={{ color: 'white', ...selectTextStyle, mt: '10px', bgcolor: '#202123', border: '1px solid #343541', borderRadius: '5px', height: 'fit-content', p: '0px' }}
                >
                    <MenuItem value="gemini-2.5-flash-lite">Gemini Pro</MenuItem>
                    <MenuItem value="GPT 3.5 Turbo">GPT 3.5 Turbo</MenuItem>
                </Select>
            </aside>
            <section className="chatbox">
                <div className="chat-log" ref={chatLogRef}>
                    {chatLog.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}
                    {loading && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <CircularProgress sx={{ color: '#0da37f' }} />
                        </div>
                    )}
                </div>
                <div className="chat-input-holder">
                    <form className="talkbot-form" onSubmit={handleSubmit}>
                        <TextField className="chat-input-textarea" inputProps={inputTextColor} sx={{ m: 0, ...inputTextStyle }} placeholder='Enter text here' multiline={true} type='text' required margin='normal'
                            value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} />
                        <div className='groupButton'><Button disabled={loading} type='submit' className="chat-input-button" variant='contained' size='large' sx={{ color: "white", ml: "20px", backgroundColor: '#0da37f', ...textFont, '&:hover': { backgroundColor: '#0b8e72' } }}>Send</Button>
                            {speakVol ? <VolumeUpIcon onClick={speakButton} sx={{ color: "#0da37f", ml: "20px", '&:hover': { color: '#0b8e72' } }} /> : <VolumeOffIcon onClick={speakButton} sx={{ color: "#0da37f", ml: "20px", '&:hover': { color: '#0b8e72' } }} />}</div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Talkbot