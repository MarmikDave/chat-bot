const { OpenAI } = require("openai");
const dotenv = require("dotenv");
const fs = require('fs').promises;
const path = require('path');

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const askAI = async (req, res) => {
    const { question, filename } = req.body;
    try {
        let messages = [{ role: "user", content: question }];

        // If a file was uploaded, read its content and add it to the messages
        if (filename) {
            const filePath = path.join(__dirname, '../uploads', filename);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            messages.unshift({ 
                role: "system", 
                content: `The following is the content of the uploaded file:\n\n${fileContent}\n\nPlease use this information to answer the user's question.` 
            });
        }

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        res.json({ answer: chatCompletion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = { askAI };