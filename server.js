require('dotenv').config();
const express = require('express');


const axios = require('axios');



const app = express();

const cors = require('cors');
app.use(cors());


app.use(express.json());

const apiKey = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
    const mensagemUsuario = req.body.mensagem;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: mensagemUsuario }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const resposta = response.data.choices[0].message.content;
        res.json({ resposta });

    } catch (error) {
        console.error("Erro na API:", error);
        res.status(500).send("Erro ao se comunicar com a API");
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
