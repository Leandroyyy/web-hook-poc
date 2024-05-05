import axios from 'axios';

// Defina o URL do webhook
const webhookUrl = 'http://localhost:3000/webhook'; // Substitua pelo URL do seu webhook

// Dados que você deseja enviar para o webhook
const dataToSend = {
  evento: 'Exemplo de evento',
  informacao: 'Esta é uma informação enviada para o webhook.',
  user: 'Ana rocha'
};

// Enviar os dados para o webhook
axios.post(webhookUrl, dataToSend)
  .then(response => {
    console.log('Resposta do webhook:', response.data);
  })
  .catch(error => {
    console.error('Erro ao enviar dados para o webhook:', error);
  });
