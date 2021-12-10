import { Message, MessageEmbed } from 'discord.js';
import cowsay from 'cowsay';
import { IOptions } from 'cowsay'; // optional
import getRandomInt from '../utils/random';
import quotes from '../utils/quotes.json';
export default {
  callback: (message: Message, ...args: string[]) => {
    const cow = args[0];
    //A random number is generated
    const idx = getRandomInt(0, quotes.length);
    const quoteOBJ = quotes[idx];
    const text = `${quoteOBJ.quote} - ${quoteOBJ.author}`;

    //Make use of IOptions to enchance the text;
    let opts: IOptions = {
      text: text,
      e: '^^',
      r: true,
      // f: 'radio',
    };

    if (cow !== 'random') {
      opts.r = false;
      opts.f = cow;
    }
    let output;
    try {
      output = cowsay.say(opts);
    } catch {
      output = 'That cow does not exist';
    }
    if (output.length > 2000) {
      output = 'Darn cows sleeping';
    }
    console.log(output);
    const reply = output.replace(/```/g, "``'");

    const exampleEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('The Unknown Cute Random Cow Generator')
      .setURL('https://discord.js.org/')
      .setAuthor(
        'Totally Tubular Cows',
        'https://i.imgur.com/AfFp7pu.png',
        'https://discord.js.org'
      )
      .setDescription(`\`\`\`${reply}\`\`\``)
      .setThumbnail('https://i.imgur.com/AfFp7pu.png')
      .addFields({
        name: 'Cow Gender aka what is It??',
        value:
          'Male? Female? or Maybe it is Something Really Out of The Ordinary! ',
        inline: true,
      });

    message.reply({ embeds: [exampleEmbed] });
  },
};
