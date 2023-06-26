const {
  Client,
  Events,
  GatewayIntentBits,
  SlashCommandBuilder,
  Partials,
  IntentsBitField,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ComponentType
} = require('discord.js');

const { token } = require('./config.json');

const client = new Client({
  intents: [
    Object.keys(GatewayIntentBits),
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [Object.keys(Partials)],
});

client.once(Events.ClientReady, c => {
  console.log(`Bot registrado como: ${c.user.tag}`);
});

// Interacciones del bot
client.on('messageCreate', async message => {
  if (message.content == 'Rheya saluda') {
    message.reply({ content: "RHAAAAAAAAAAAAAAAAAAAAAAAAAH" });
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content !== 'ping') return;

  const firstButton = new ButtonBuilder()
    .setLabel('Destruír el mundo')
    .setStyle(ButtonStyle.Danger)
    .setCustomId('first-button');

  const secondButton = new ButtonBuilder()
    .setLabel('Salvar el mundo')
    .setStyle(ButtonStyle.Primary)
    .setCustomId('second-button');

  const buttonRow = new ActionRowBuilder().addComponents(firstButton, secondButton);

  const reply = await message.reply({ content: 'Elige un botón, amo', components: [buttonRow] });

  const filter = (i) => i.user.id === message.author.id;

  const collector = reply.createMessageComponentCollector({
    componentType: ComponentType.Button,
    filter,
    time: 10_000,
  });

  collector.on('collect', (interaction) => {
    if (interaction.customId === 'first-button') {
      interaction.reply('DESTRUYAMOSLO TODO');
      return;
    }

    if (interaction.customId === 'second-button') {
      interaction.reply('Que aburrido...');
      return;
    }
  });

  collector.on('end', () => {
    firstButton.setDisabled(true);
    secondButton.setDisabled(true);

    reply.edit({
      content: 'Me cansé de esperar, chau',
      components: [buttonRow],
    });
  });
});

client.login(token);