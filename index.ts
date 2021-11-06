import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from './utils/cowsay';

dotenv.config();

//Bot Code for Prefix:
const PREFIX = process.env.PREFIX || 'ch#';

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(PREFIX)) return;
  const args = message.content
    .toLowerCase()
    .substring(PREFIX.length)
    .slice()
    .trim()
    .split(/ /);
  const command = args.shift();
  /*  ping */
  if (command === 'ping') {
    message
      .react('🐿️')
      .then(() => console.log(`Reacted to message "${message.content}"`))
      .catch(console.error);
    message
      .reply({
        content: 'pong',
      })
      .then(() => console.log(`Replied to message "${message.content}"`))
      .catch(console.error);
  }

  /* cowsay */
  if (command === 'cowsay') {
    message
      .react('🦁')
      .then(() => console.log(`Reacted to message "${message.content}"`))
      .catch(console.error);
    const output = cowsay();
    message
      .reply({
        content: `
        \`\`\`
        ${output}
        \`\`\`
        `,
      })
      .then(() => console.log(`Replied to message "${message.content}"`))

      .catch(console.error);
  }
});

//Token Code:
client.login(process.env.TOKEN);
