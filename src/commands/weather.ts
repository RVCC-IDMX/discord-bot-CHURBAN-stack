import { Message, MessageEmbed } from 'discord.js';
import moment from 'moment';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const api = process.env.WeatherAPI;
export default {
  callback: async (message: Message, ...args: string[]) => {
    console.log(args);
    const city = args.join(' ');

    const response =
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=imperial
`);
    console.log(response);
    console.log(response.data.weather[0]);
    const place = `${response.data.name}, ${response.data.sys.country}`;
    //http://openweathermap.org/img/wn/10d@2x.png
    const icon = response.data.weather[0].icon;
    const low = response.data.main.temp_min.toFixed(0);
    const high = response.data.main.temp_max.toFixed(0);
    const tz = response.data.timezone;
    const sunrise = moment
      .unix(response.data.sys.sunrise + tz)
      .utc()
      .format('h:mm a');
    const sunset = moment
      .unix(response.data.sys.sunset + tz)
      .utc()
      .format('h:mm a');
    const description = response.data.weather[0].description.toString();
    const temp = response.data.main.temp.toFixed(0);
    const exampleEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`Current weather in ${place}`)
      .setAuthor('Christopher Hurban')
      .setDescription(`${temp}°F and ${description}`)
      .setThumbnail(`http://openweathermap.org/img/wn/${icon}@2x.png`)
      .addField('Low', `${low}°F`, true)
      .addField('High', `${high}°F`, true)
      .addField('\u200B', '\u200B', false)
      .addField('Sunrise', `${sunrise}`, true)
      .addField('Sunset', `${sunset}`, true);
    message.reply({ embeds: [exampleEmbed] });
  },
};
