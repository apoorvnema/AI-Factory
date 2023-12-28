import BoxComp from "../components/BoxComp"
import { Box, Typography } from "@mui/material"
import { textFont } from '../styles';

const Homepage = () => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        // Redirect to login page or show an error message
        window.location.href = '/login';
    }

    let user = localStorage.getItem('user');
    if (user === null) {
        user = "User";
    }

    return (
        <>
            <Typography color="white" variant="h5" mb={2} p={1} pl={6} fontWeight="bold" sx={{ bgcolor: "#282c34", borderTop: "2px #045846 solid", borderBottom: "2px #045846 solid", ...textFont }}>
                Welcome, {user}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#40414f', flexFlow: 'wrap' }}>
                <BoxComp heading='Text Generation' route='summary' title='Text Summary' description='Summarize long text into short sentences' icon='1' />
                <BoxComp heading='Paragraph Generation' route='paragraph' title='Paragraph' description='Generate Paragraph with words' icon='2' />
                <BoxComp heading='JS Converter' route='jsCode' title='JS Converter' description='Translate English to Javascript Code' icon='3' />
                <BoxComp heading='TalkBot' route='talkbot' title='Talkbot' description='AI Chatbot with Voice Narration' icon='4' />
                <BoxComp heading='Image Generator' route='image' title='Image Maker' description='Generate AI images' icon='5' />
            </Box>
        </>
    )
}

export default Homepage