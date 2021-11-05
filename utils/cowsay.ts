import cowsay from 'cowsay';
import { IOptions } from 'cowsay'; // optional

export default function () {
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
  return output;
}
