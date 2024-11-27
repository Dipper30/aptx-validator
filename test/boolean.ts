import { boolean, BooleanValidator } from '../src/index';
import assert from 'assert';

let v: any;
let b: BooleanValidator;
export default () => {
  // Boolean Checks
  try {
    console.log('==========');

    v = undefined;
    b = boolean().errText('no require boolean');
    assert.ok(!b.test(v), 'test boolean-1 fails');

    v = '1';
    b = boolean().errText('type error');
    assert.ok(!b.test(v), 'test boolean-2 fails');

    v = true;
    b = boolean().errText('type error');
    assert.ok(b.test(v), 'test boolean-3 fails');

    console.log('\x1B[32m%s\x1B[0m', 'Boolean tests passed!');
    console.log('==========');
  } catch (error) {
    console.log(error);
  }
};