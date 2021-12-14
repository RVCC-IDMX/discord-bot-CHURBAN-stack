import { Message } from 'discord.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const api = process.env.WeatherAPI;
export default {
  callback: async (message: Message, ...args: string[]) => {
    console.log(args);

    const response =
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${api}&units=imperial
`);
    console.log(response);
    message.reply('pong!');
  },
};
