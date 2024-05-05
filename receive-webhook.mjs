
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analisar o corpo das requisições
app.use(bodyParser.json());
app.use(cors());

// Rota para lidar com as requisições POST enviadas ao webhook

let payload
app.post('/webhook', (req, res) => {
  payload = req.body; // Corpo da requisição

  // Lógica para lidar com o payload recebido
  console.log('Payload recebido:', payload);

  // Envie uma resposta para o cliente que fez a requisição
  res.status(200).send('Requisição recebida com sucesso.');
});

app.get('/webhook', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Envia um evento SSE a cada 5 segundos
  const intervalId = setInterval(() => {
    res.write(`data: ${JSON.stringify({ message: payload })}\n\n`);
  }, 1000);

  // Fecha a conexão SSE quando o cliente se desconecta
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });

});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
