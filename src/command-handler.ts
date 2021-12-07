import { Client, CommandInteraction } from 'discord.js';
import getFiles from './get-files';
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

let suffix = '.ts';
let src = 'src';
if (process.env.NODE_ENV === 'production') {
  suffix = '.js';
  src = 'dist';
  console.log('Running in production mode');
}

export default (client: Client) => {
  const commands = {} as {
    [key: string]: any;
  };

  const commandFiles = getFiles(src, 'commands', suffix);
  console.log(commandFiles);

  console.log(commands);
};

for (const command of commandFiles) {
let commandFile = require (command);
if (commandFile.default) commandFile = commandFile.default;

const split = command.replace(/\\/g, '/').split('');
const commandName = split[split.length - 1].replace(suffix, '');
commands[commandName.toLowerCase()] = commandFile;
console.log('Loaded command: $(commandName}');
}

client.on('messageCreate', (message) => {
console.log('message.content: ${message.content}');
if (message.author.bot || !message.content.startWith(PREFIX)) return;

console.log('message.author.username: $(message.author.username)');

const args = message.content.slice(PREFIX.length).trim().split(/ +/);
const commandName = args.shift()!.toLowerCase();

console.log('commandName: ${commandName}');

if (!commands[commandName]) {
message.reply('Sorry, I cannot execute the command: $(commandName');
return;
}

try{
commands[commandName].callback(message,...args);
} catch (error) {
console.error(error);
message.reply('there was an error trying to execute that command!');
)
});
};