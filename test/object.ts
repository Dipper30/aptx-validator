import { boolean, object, ObjectValidator, string } from '../src/index';
import assert from 'assert';

let v: any;
let o: ObjectValidator;
export default () => {
  // Object Checks
  try {
    console.log('==========');

    v = undefined;
    const o1 = object().optional().errText('no require array');
    assert.ok(o1.test(v), 'test object-1 fails');

    v = '1';
    o = object().errText('type error');
    assert.ok(!o.test(v), 'test object-2 fails');

    v = 1;
    o = object({
      'x': boolean().optional(),
      'y': boolean().errText('y type error!'),
    }).errText('type error');
    assert.ok(!o.test(v), 'test object-3 fails');

    v = { x: true, y: 2 };
    assert.ok(!o.test(v), 'test object-4 fails');
    assert.equal(o.getErrText(), 'y type error!', 'test object-4 fails');

    v = { x: true };
    assert.equal(o.test(v), false, 'test object-5 fails');

    v = { y: false };
    assert.ok(o.test(v), 'test object-6 fails');

    o = object({
      'x': boolean().optional(),
      'y': object({
        'a1': string().errText('a1 is required'),
        'a2': string().optional()
      })
    })
    v = {
      x: undefined,
      y: {
        a1: 'a1',
      }
    };
    assert.ok(o.test(v), 'test object-7 fails');
    
    v = {
      y: {
        a2: 'a2',
      }
    };
    assert.equal(o.test(v), false, 'test object-8 fails');
    assert.equal(o.getErrText(), 'a1 is required', 'test object-8 fails');

    v = undefined;
    assert.ok(!o.test(v), 'test object-9 fails');

    console.log('\x1B[32m%s\x1B[0m', 'Object tests passed!');
    console.log('==========');
  } catch (error) {
    console.log(error);
  }
};