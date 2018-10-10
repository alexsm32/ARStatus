const TelegramBot = require('node-telegram-bot-api');

 // API Token Telegram
 const token = '';

 // Creamos un bot que usa 'polling'para obtener actualizaciones
const bot = new TelegramBot(token, {polling: true});
 const request = require('request');

// Cuando mandes el mensaje "Hola" reconoce tú nombre y genera un input: Hola Daniel
function inicio() {
  bot.on('message', (msg) => {
    switch (msg.text.toString().toLowerCase()) {
      case "/moni":
        
        break;
      
      case "":

        break;
    
      default:
        bot.sendMessage(msg.chat.id, "Estas son las opciones /moni y /help", {
          reply_markup: {
            keyboard: [['/moni'], ['/help']]
          }
        });
        break;
    }
    });
}

exports.inicio = inicio