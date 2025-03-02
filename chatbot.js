const express = require('express');
const qrcode = require('qrcode'); // Substitua qrcode-terminal por qrcode
const { Client } = require('whatsapp-web.js');
const app = express();
const port = process.env.PORT || 10000;

const client = new Client();

// Variável para armazenar o QR Code
let qrCodeImage = null;

// Gera o QR Code e armazena a imagem
client.on('qr', async (qr) => {
    qrCodeImage = await qrcode.toDataURL(qr); // Converte o QR Code para uma imagem em base64
    console.log('QR Code gerado!');
});

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
    qrCodeImage = null; // Limpa o QR Code após a conexão
});

client.initialize();

// Rota para exibir o QR Code na página web
app.get('/', (req, res) => {
    if (qrCodeImage) {
        // Se o QR Code estiver disponível, exibe na página
        res.send(`
            <h1>Chatbot está rodando!</h1>
            <p>Escaneie o QR Code abaixo para conectar o WhatsApp:</p>
            <img src="${qrCodeImage}" alt="QR Code" />
        `);
    } else {
        // Se não houver QR Code, exibe uma mensagem de status
        res.send(`
            <h1>Chatbot está rodando!</h1>
            <p>WhatsApp já conectado. Aguarde mensagens.</p>
        `);
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});