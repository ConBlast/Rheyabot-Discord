const { token } = require('./config.json');
const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  const roarCommand = new SlashCommandBuilder()
    .setName('roar')
    .setDescription('RHEEEEEEEEEAH!!!!!!');

  const data = roarCommand.toJSON();

  client.guilds.cache.forEach((guild) => {
    guild.commands.create(data).then((command) => {
      console.log(`Command registered: ${command.name}`);
    }).catch(console.error);
  });
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'roar') {
    interaction.reply('RHEEEEEEEEEAH!!!!!!', { ephemeral: true });
  }
});

client.login(token);