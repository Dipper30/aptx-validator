import { any, AnyValidator } from '../src/index';
import assert from 'assert';

let v: any;
let a: AnyValidator<boolean>;
export default () => {
  // Boolean Checks
  try {
    console.log('==========');

    v = undefined;
    a = any().errText('any');
    assert.strictEqual(a.test(v), true, 'test any-1 fails');

    v = {};
    a = any().optional().errText('any');
    assert.strictEqual(a.test(v), true, 'test any-2 fails');

    console.log('\x1B[32m%s\x1B[0m', 'Any tests passed!');
    console.log('==========');
  } catch (error) {
    console.log(error);
  }
};