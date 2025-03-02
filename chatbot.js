const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();

// serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

// E inicializa tudo 
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que usamos para criar o delay entre uma ação e outra

// Funil
client.on('message', async msg => {
    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        const contact = await msg.getContact(); //Pegando o contato
        const name = contact.pushname; //Pegando o nome do contato
        await client.sendMessage(msg.from,'Olá! '+ name.split(" ")[0] + 'Sou o assistente virtual da Barbearia Hebreus 🤖💈Como posso ajudar hoje? Por favor, digite o número da opção desejada:\n\n1 - Quero agendar meu horário\n2 - Conheça o Clube de Assinatura Hebreus VIP\n3 - Onde estamos\n4 - Horário de atendimento'); //Primeira mensagem de texto
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(5000); //Delay de 5 segundos
    }

    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Ok, aguarde um instante que um membro da nossa equipe já irá te atender. Blz?\n\nCaso prefira, você também pode agendar pelo nosso app, acesse https://cashbarber.com.br/Hebreusvip');
    }

    if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, '*Corte e Barba:* corte seu cabelo e barba quantas vezes quiser por *R$114,90 por mês*, incluindo: corte e barba ilimitado, 10% off em produtos e serviços extras, além de presentes exclusivos.\n\n*Barba:* corte sua barba quantas vezes quiser por *R$94,90 por mês*, incluindo: barba ilimitada, 10% off em produtos e serviços extras, além de presentes exclusivos.\n\n*Cabelo:* corte seu cabelo quantas vezes quiser por *R$74,90 por mês*, incluindo: corte ilimitado, 10% off em produtos e serviços extras, além de presentes exclusivos.');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Assine agora mesmo: https://cashbarber.com.br/Hebreusvip');
    }

    if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'A Barbearia Hebreus está localizada na Avenida Iraí, 1292, Lj.05, Weissópolis, em Pinhais/PR. Nós atendemos de segunda à sexta das 09h às 20h e aos sábados das 08h às 18h.\n\nAguarde um instante que vou te enviar a nossa localização.');
        
        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Pronto, clique no link e sua próxima parada será a Barbearia Hebreus: https://maps.app.goo.gl/G5tZJLGBtx6oa26S7');
    }

    if (msg.body !== null && msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();

        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Nós atendemos de *segunda à sexta das 09h às 20h e aos sábados das 08h às 18h*. Estamos localizados na Avenida Iraí, 1292, Lj. 05, Weissópolis, em Pinhais/PR.\n\nBora agendar seu horário?');

        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Você pode agendar seu horário pelo app, acesse https://cashbarber.com.br/Hebreusvip');
    }
});

// Iniciar o servidor HTTP
app.get('/', (req, res) => {
    res.send('Chatbot está rodando!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});