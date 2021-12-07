import { Message } from 'discord.js';

//JS
// module.exports - {}

//TS
export default {
  callback: (message: Message, ...args: string[]) => {
    let product = 1;

    for (const arg of args) {
      product *= parseInt(arg);
    }
    message.reply(`The sum is $product}`);
  },
};
