import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const CHANNELS = process.env.CHANNELS || null;

if (!CHANNELS) {
  console.error('CHANNELS is not defined');
  process.exit(1);
}

const channels = CHANNELS.split(',');
console.table(channels);

//Bot Code for Prefix:
const PREFIX = process.env.PREFIX || 'ch#';

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
  let handler = require('./command-handler');
  if (handler.default) handler = handler.default;
  handler(client);
});

// client.on('messageCreate', (message) => {
//   console.log(message.content);
//   if (!channels.includes(message.channel.id)) return;
//   if (!message.content.startsWith(PREFIX)) return;
//   const args = message.content
//     .toLowerCase()
//     .substring(PREFIX.length)
//     .slice()
//     .trim()
//     .split(/ /);
//   const command = args.shift();
//   /*  ping */
//   if (command === 'ping') {
//     message
//       .react('🐿️')
//       .then(() => console.log(`Reacted to message "${message.content}"`))
//       .catch(console.error);
//     message
//       .reply({
//         content: 'pong',
//       })
//       .then(() => console.log(`Replied to message "${message.content}"`))
//       .catch(console.error);
//   }

//   /* cowsay */
//   if (command === 'cowsay') {
//     message
//       .react('🦁')
//       .then(() => console.log(`Reacted to message "${message.content}"`))
//       .catch(console.error);
//     const output = cowsay(args[0]);
//     message
//       .reply({
//         content: `
//         \`\`\`
//         ${output}
//         \`\`\`
//         `,
//       })
//       .then(() => console.log(`Replied to message "${message.content}"`))

//       .catch(console.error);
//   }
// });

//Token Code:
client.login(process.env.TOKEN);
