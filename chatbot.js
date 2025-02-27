const express = require('express');
const qrcode = require('qrcode');
const { Client } = require('whatsapp-web.js');

const app = express();
const port = process.env.PORT || 3000;

// Inicializa o cliente do WhatsApp
const client = new Client();

// Variável para armazenar o QR Code
let qrCodeData = '';

client.on('qr', async (qr) => {
  console.log('QR Code gerado!');
  qrCodeData = qr; // Armazena o QR Code
});

client.on('ready', () => {
  console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

// Rota para exibir o QR Code
app.get('/', async (req, res) => {
  try {
    if (!qrCodeData) {
      return res.send('Aguardando geração do QR Code...');
    }

    // Gera uma imagem do QR Code
    const qrImage = await qrcode.toDataURL(qrCodeData);

    // Exibe a imagem em uma página HTML
    res.send(`
      <html>
        <body>
          <h1>Escaneie o QR Code para conectar ao WhatsApp</h1>
          <img src="${qrImage}" alt="QR Code" />
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Erro ao gerar o QR Code:', error);
    res.status(500).send('Erro ao gerar o QR Code');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Funil de mensagens
client.on('message', async (msg) => {
  if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola|Quero|quero|Queria|queria)/i) && msg.from.endsWith('@c.us')) {
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const name = contact.pushname;

    await chat.sendStateTyping(); // Simulando digitação
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Delay de 3 segundos

    await client.sendMessage(
      msg.from,
      `Olá ${name.split(' ')[0]}! 👋\nSou o assistente virtual da Barbearia Hebreus 🤖💈\n\nComo posso ajudar hoje? Por favor, digite o número da opção desejada:\n\n1 - Quero agendar meu horário\n2 - Conheça o Clube de Assinatura Hebreus VIP\n3 - Onde estamos\n4 - Horário de atendimento`
    );
  }



    if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();


        await delay(3000); //delay de 3 segundos
        await chat.sendStateTyping(); // Simulando Digitação
        await delay(3000);
        await client.sendMessage(msg.from, 'Ok, aguarde um instante que um membro da nossa equipe já irá te atender. Blz? \n\nCaso prefira, você também pode agendar pelo nosso app, acesse https://cashbarber.com.br/Hebreusvip ');
 

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
        await client.sendMessage(msg.from, 'A Barbearia Hebreus está localizada na Avenida Iraí, 1292, Lj.05, Weissópolis, em Pinhais/PR.\n\nNós atendemos de segunda à sexta das 09h às 20h e aos sábados das 08h às 18h.\n\nAguarde um instante que vou te enviar a nossa localização.');
        
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