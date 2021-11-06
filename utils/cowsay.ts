import cowsay from 'cowsay';
import { IOptions } from 'cowsay'; // optional
import getRandomInt from './random';
import quotes from './quotes.json';

export default function (cow: string = 'random') {
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
  return output;
}
