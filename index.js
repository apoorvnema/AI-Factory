// importing necessary libraries
const dotenv = require('dotenv');
const OpenAI = require("openai");
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const isAuthenticated = require('./middlewares/authMiddleware');

dotenv.config();

//routes path
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');

connectDB();

const corsOptions = {
  origin: ['https://ai-factory.apoorvnema.com', 'http://localhost:3000', 'https://localhost', 'chrome-extension://hgdoaflfbljcailfcgfmgoeoomeodhbl'], // Specify the allowed origin(s)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
  credentials: true, // Allow cookies and credentials to be sent
  optionsSuccessStatus: 204, // Set the HTTP status code for preflight OPTIONS requests
};

// middlewares
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(errorHandler);

// create an instance of the OpenAI class with API key.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_PRO_API);

// create a openai api that calls the function
app.use('/api/v1/ai/talkbot', isAuthenticated);
app.post('/api/v1/ai/talkbot', async (req, res) => {
  try {
    const { message } = req.body;
    const { selectModel } = req.body;
    if (selectModel === "Gemini Pro") {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
      const prompt = `${message}`
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
        messages: [{ role: 'user', content: `${message}` }],
        model: 'gpt-3.5-turbo',
      });
      if (data) {
        if (data.choices[0].message.content) {
          return res.status(200).json({ message: data.choices[0].message.content });
        }
      }
    }
  } catch (err) {
    return res.status(404).json({ message: 'Request failed with status code 404' });
  }
})

// adding port
const PORT = process.env.PORT || 3080;

//API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send("Hello");
})

// starting server at port 3080
app.listen(PORT, () => {
  console.log(`Server Running in ${process.env.DEV_MODE} mode on ${process.env.PORT}`.bgCyan.white);
});
