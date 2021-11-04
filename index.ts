import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from 'cowsay';
dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {

  /*  ping */
  if (message.content === 'ping') {
    message
      .react('🤔')
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
  if (message.content === 'cowsay') {
    message
      .react('')
      .then(() => console.log(`Reacted to message "${message.content}"`))
      .catch(console.error);
      let output: string = cowsay.say({ text: 'Hello from typescript!' });
    console.log(output);
    message
      .reply({
        content: `
        \`\`\`
        ${output}
        \`\`\`
        `,
      })
      .then() => console.log(`Replied to message "${message.content}"`)
      .catch(console.error);
    }
  });

client.login(process.env.TOKEN);

