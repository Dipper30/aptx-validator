import { array, ArrayValidator, string } from '../src/index';
import assert from 'assert';

let v: any;
export default () => {
  // Array Checks
  try {
    console.log('==========');

    v = 'array';
    const a1 = array().errText('array required');
    assert.strictEqual(a1.test(v), false, 'test array-1 fails');

    v = ['array'];
    const a2 = array().errText('array required');
    assert.strictEqual(a2.test(v), true, 'test array-2 fails');

    v = undefined;
    const a3 = array().optional().errText('array required');
    assert.strictEqual(a3.test(v), true, 'test array-3 fails');

    v = ['array'];
    const a4 = array(string()).optional().errText('array required');
    assert.strictEqual(a4.test(v), true, 'test array-4 fails');

    v = ['1', '2'];
    const a5 = array(string())
      .optional()
      .minLength(3)
      .errText('array min len 3');
    assert.strictEqual(a5.test(v), false, 'test array-5 fails');
    assert.strictEqual(
      a5.getErrText(),
      'array min len 3',
      'test array-5 fails',
    );

    v = [1, 2];
    const a6 = array(string()).optional();
    assert.strictEqual(a6.test(v), false, 'test array-5 fails');

    console.log('\x1B[32m%s\x1B[0m', 'Array tests passed!');
    console.log('==========');
  } catch (error) {
    console.log(error);
  }
};
