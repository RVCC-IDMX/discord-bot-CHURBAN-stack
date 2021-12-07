//DEFAULT IMPORTS FOR TS:
import { Client } from 'discord.js';
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
