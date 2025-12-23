const OpenAI = require("openai");
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const genAI = new GoogleGenerativeAI(process.env.GEMINI_PRO_API);

exports.summaryController = async (req, res) => {
    try {
        const { text } = req.body;
        const { selectModel } = req.body;
        if (selectModel === "Gemini Pro") {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
            const prompt = `Summarize this \n ${text}`
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const data = response.text();
            if (data) {
                if (data) {
                    return res.status(200).json({ message: data });
                }
            }
        }
        else {
            const data = await openai.chat.completions.create({
                messages: [{ role: 'user', content: `Summarize this \n ${text}` }],
                model: 'gpt-3.5-turbo',
            });
            if (data) {
                if (data.choices[0].message.content) {
                    return res.status(200).json({ message: data.choices[0].message.content });
                }
            }
        }
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

exports.paragraphController = async (req, res) => {
    try {
        const { text } = req.body;
        const { selectModel } = req.body;
        if (selectModel === "Gemini Pro") {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
            const prompt = `Write a detailed paragraph about \n ${text}`
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const data = response.text();
            if (data) {
                if (data) {
                    return res.status(200).json({ message: data });
                }
            }
        }
        else {
            const data = await openai.chat.completions.create({
                messages: [{ role: 'user', content: `Write a detailed paragraph about \n ${text}` }],
                model: 'gpt-3.5-turbo',
            });
            if (data) {
                if (data.choices[0].message.content) {
                    return res.status(200).json({ message: data.choices[0].message.content });
                }
            }
        }
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

exports.codeController = async (req, res) => {
    try {
        const { text } = req.body;
        const { selectModel } = req.body;
        const { selectedLanguage } = req.body;
        if (selectModel === "Gemini Pro") {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
            const prompt = `/* convert these instructions to ${selectedLanguage} code \n ${text}`
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const data = response.text();
            if (data) {
                if (data) {
                    return res.status(200).json({ message: data });
                }
            }
        }
        else {
            const data = await openai.chat.completions.create({
                messages: [{ role: 'user', content: `/* convert these instructions to ${selectedLanguage} code \n ${text}` }],
                model: 'gpt-3.5-turbo',
            });
            if (data) {
                if (data.choices[0].message.content) {
                    return res.status(200).json({ message: data.choices[0].message.content });
                }
            }
        }
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

exports.imageController = async (req, res) => {
    try {
        const { text } = req.body;

        /* OpenAI Implementation (Commented Out)
        const image = await openai.images.generate({
            model: "dall-e-2",
            prompt: `generate a image of ${text}`,
            n: 1,
            size: "1024x1024",
        }); 
        */

        // Correct Gemini Method
        const response = await client.models.generateImages({
            model: "imagen-4.0-fast-generate", // Cheapest/Standard model
            prompt: text,
            config: {
                numberOfImages: 1,
                aspectRatio: "1:1"
            }
        });

        const generatedImage = response.generatedImages?.[0];

        if (generatedImage) {
            // Convert the binary image bytes to a Data URL
            const base64Data = generatedImage.image.imageBytes;
            const imageUrl = `data:image/png;base64,${base64Data}`;

            return res.status(200).json({ message: imageUrl });
        }

    } catch (err) {
        console.error("Gemini Error:", err);
        return res.status(404).json({ message: err.message });
    }
}