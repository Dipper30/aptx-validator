import { Infer } from '../src/types';
import { and, number, object, or, OrCondition, string } from '../src/index';
import assert from 'assert';

let v: any;

export default () => {
  // Helper Checks
  try {
    console.log('==========');

    v = '1';
    const a1 = or([
      string(),
      number(),
    ]).errText('string or number');
    assert.ok(a1.test(v), 'test or-1 fails');

    v = 2;
    const a2 = or([
      string(),
      number(),
    ]).errText('string or number');
    assert.ok(a2.test(v), 'test or-2 fails');

    v = true;
    const a3 = or([
      string(),
      number(),
    ]).errText('string or number');
    assert.ok(!a3.test(v), 'test or-3 fails');

    v = true;
    const a4 = or([
      string(),
      object({
        id: number(),
        name: string().optional(),
      }),
    ]).errText('string or object');
    assert.ok(!a4.test(v), 'test or-4 fails');

    v = undefined;
    const a5 = or([
      string(),
      object({
        id: number(),
        name: string().optional(),
      }),
    ]).errText('string or object');
    assert.ok(!a5.test(v), 'test or-5 fails');

    v = 'true';
    const a6 = and([
      object({
        id: number(),
        name: number().optional(),
      }),
      object({
        id: number(),
        name: string().optional(),
      }),
    ]).errText('string or object');
    assert.ok(!a6.test(v), 'test and-6 fails');

    console.log('\x1B[32m%s\x1B[0m', 'Helper tests passed!');
    console.log('==========');
  } catch (error) {
    console.log(error);
  }
};