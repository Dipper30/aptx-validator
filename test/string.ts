import { string, StringValidator } from '../src/index';
import assert from 'assert';

let v: any;
let s: StringValidator;
export default () => {
  // String Checks
  try {
    console.log('==========');

    v = undefined;
    s = string().errText('no require boolean');
    assert.strictEqual(s.test(v), false, 'test string-1 fails');

    v = '1';
    s = string().errText('type error');
    assert.strictEqual(s.test(v), true, 'test string-2 fails');

    v = 1;
    s = string().errText('type error');
    assert.strictEqual(s.test(v), false, 'test string-3 fails');

    console.log('\x1B[32m%s\x1B[0m', 'String tests passed!');
    console.log('==========');
  } catch (error) {
    console.log(error);
  }
};