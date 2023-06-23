const { Client, Events, GatewayIntentBits, SlashCommandBuilder , Partials } = require('discord.js');

const client = new Client({ 
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

const { token } = require('./config.json');

client.once(Events.ClientReady, c => {
  console.log(`Bot registrado como: ${c.user.tag}`);
})

 client.on('messageCreate', async message =>{
  if(message.content == 'Rheya saluda'){
    message.reply({content:"RHAAAAAAAAAAAAAAAAAAAAAAAAAH"})
  }
 })

 client.on('messageCreate', async message =>{
  if(message.content == 'ping'){
    message.reply({content:"pong"})
  }
 })

 client.on('messageCreate', async message =>{
  if(message.content == 'letsgoo'){
    message.reply({content:"LET'S GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO"})
  }
 })

client.login(token);