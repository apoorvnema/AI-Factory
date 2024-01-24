# AI Factory Server
<img src="./client/public/ai-factory-logo.png" width="200px" alt="AI Factory logo">

## Screenshot
<img src="screenshot.png" width="800px" alt="Screenshot">

## Description

######  The AI Factory Server is a component of the AI Factory system responsible for handling backend operations and facilitating the core functionalities of the system. Its primary responsibilities include:
1. API Endpoints: The server exposes API endpoints that enable communication with other components of the system, such as the client and potentially other servers or services. These endpoints allow for the retrieval of predictions, submission of training data, and interaction with machine learning models.
2. Integration with External Services: It may integrate with external services or APIs to enhance its capabilities. This could involve using pre-trained models from external sources, accessing additional datasets, or leveraging specialized machine learning tools.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [License](#license)

## Installation

#### 1. Clone the repository:
git clone https://github.com/apoorvnema/AI-Factory.git

#### 2. Navigate to the project directory:
cd AI-Factory

#### 3. Install dependencies:
npm install

## Configuration
1) Create a .env file:
2) Add the necessary environment variables to the .env file.
3) .env example variables: (write without double quotes)
    - OPENAI_API_KEY="Your OpenAI API Key"
    - PORT="Whichever port you want to use"
    - DEV_MODE="development or production"
    - MONGO_URI="mongodb+srv://<YOUR_USER>:<YOUR_PASS>@<Cluster_name>/<Collection_name>"
    - JWT_ACCESS_SECRET = "Any Random String"
    - JWT_ACCESS_EXPIREIN = 15min
    - JWT_REFRESH_TOKEN = "Any Random String"
    - JWT_REFRESH_EXPIREIN = 15day
    - GEMINI_PRO_API="Your Gemini API Key"
4) Make changes accordingly in .env file

## Usage
#### 1. Start the server:
npm start

## API Documentation
The AI Factory Server uses the OpenAI API. Refer to the [OpenAI API documentation](https://platform.openai.com/docs/api-reference) for more details on how to integrate and use the OpenAI API in your Node.js application.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
