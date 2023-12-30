const OpenAI = require("openai");
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

exports.summaryController = async (req, res) => {
    try {
        const { text } = req.body;
        const data = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `Summarize this \n ${text}` }],
            model: 'gpt-3.5-turbo',

        });
        if (data) {
            if (data.choices[0].message.content) {
                return res.status(200).json({ message: data.choices[0].message.content });
            }
        }
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

exports.paragraphController = async (req, res) => {
    try {
        const { text } = req.body;
        const data = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `Write a detailed paragraph about \n ${text}` }],
            model: 'gpt-3.5-turbo',

        });
        if (data) {
            if (data.choices[0].message.content) {
                return res.status(200).json({ message: data.choices[0].message.content });
            }
        }
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

exports.codeController = async (req, res) => {
    try {
        const { text } = req.body;
        const { selectedLanguage } = req.body;
        const data = await openai.chat.completions.create({
            messages: [{ role: 'user', content: `/* convert these instructions to ${selectedLanguage} code \n ${text}` }],
            model: 'gpt-3.5-turbo',

        });
        if (data) {
            if (data.choices[0].message.content) {
                return res.status(200).json({ message: data.choices[0].message.content });
            }
        }
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

exports.imageController = async (req, res) => {
    try {
        const { text } = req.body;
        const image = await openai.images.generate({
            model: "dall-e-2",
            prompt: `generate a image of ${text}`,
            n: 1,
            size: "256x256",
        });
        if (image) {
            if (image.data[0]) {
                return res.status(200).json({ message: image.data[0].url });
            }
        }
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}