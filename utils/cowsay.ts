import cowsay from 'cowsay';
import { IOptions } from 'cowsay'; // optional
import getRandomInt from './random';
import quotes from './quotes.json';

export default function () {
  const idx = getRandomInt(0, quotes.length);
  const quoteOBJ = quotes[idx];
  const text = `${quoteOBJ.quote} - ${quoteOBJ.author}`;

  let opts: IOptions = {
    text: text,
    e: '^^',
    r: true,
    // f: 'radio',
  };
  let output: string = cowsay.say(opts);
  if (output.length > 2000) {
    output = 'Darn cows sleeping';
  }
  console.log(output);
  return output;
}
