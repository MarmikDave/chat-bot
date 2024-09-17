# Financial Chat Application

## Overview
This project is a chat application that allows users to ask financial questions and receive detailed answers from an AI assistant powered by OpenAI's ChatGPT.

## Key Components
- **Frontend**: Built with ReactJS, providing a simple chat interface for user interactions.
- **Backend**: Developed using NodeJS, handling user input and integrating with the AI assistant.
- **AI Assistant**: Utilizes OpenAI's Assistant API to provide financial expertise.

## Features
- Answer financial questions using AI.
- User data integration for personalized queries.
- Conversation history to store and display previous messages.
- Streaming responses for dynamic answer display.

## Setup Instructions

### Prerequisites
- Node.js
- npm
- MongoDB (if using for user/message storage)

### Environment Variables
Create a `.env` file in the root of the server directory and add your OpenAI API key:


### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies for the server**
   ```bash
   cd server
   npm install
   ```

3. **Install dependencies for the client**
   ```bash
   cd client
   npm install
   ```

### Running the Application

1. **Start the server**
   ```bash
   cd server
   npm start
   ```

2. **Start the client**
   ```bash
   cd client
   npm start
   ```

## Usage
- Open the application in your browser.
- Ask financial questions or upload relevant files for context.
- View AI-generated responses and conversation history.

## Contributing
Feel free to fork the repository and submit pull requests for any improvements or features.

## License
This project is licensed under the MIT License.

## Acknowledgments
- OpenAI for providing the Assistant API.
- React and Node.js communities for their invaluable resources.
