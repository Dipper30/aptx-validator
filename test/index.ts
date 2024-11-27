
import NumberTest from './number';
import BooleanTest from './boolean';
import StringTest from './string';
import ArrayTest from './array';
import ObjectTest from './object';
import AnyTest from './any';
import HelperTest from './helper';
import { number } from '../src/index';
import assert from 'assert';


  // Common Checks
  try {
    console.log('==========');


    const v = number().errText('number required')
    assert.ok(v.test(1))
    assert.ok(!v.test(true))
    assert.equal(v.getErrText(), 'number required')

    console.log('\x1B[32m%s\x1B[0m', 'Common tests passed!');
    console.log('==========');
  } catch (error) {
    console.log(error);
  }


AnyTest();
NumberTest();
BooleanTest();
StringTest();
ArrayTest();
ObjectTest();
HelperTest();
