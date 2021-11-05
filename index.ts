import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from 'cowsay';
dotenv.config();

import { IOptions } from 'cowsay'; // optional

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
  if (message.content === 'cowsay') {
    message
      .react('🦁')
      .then(() => console.log(`Reacted to message "${message.content}"`))
      .catch(console.error);

    let opts: IOptions = {
      text: 'Hello everyone!',
      e: '^^',
      r: true,
      // f: 'radio',
    };
    let output: string = cowsay.say(opts);
    if (output.length > 2000) {
      output = 'Darn cows sleeping';
    }
    console.log(output);
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

client.login(process.env.TOKEN);
