import { number, NumberValidator } from "../src/index";
import assert from "assert";

let v: any;
let n: NumberValidator;
export default () => {
  // Number Checks
  try {
    console.log("==========");

    v = undefined;
    n = number().errText("no require number");
    assert.ok(!n.test(v), "test number-1 fails");

    v = "1";
    n = number().errText("type error");
    assert.ok(!n.test(v), "test number-2 fails");

    v = 2;
    n = number().errText("type error");
    assert.ok(n.test(v), "test number-3 fails");

    v = 4;
    n = number().min(5).errText("type error");
    assert.ok(!n.test(v), "test number-4 fails");

    v = NaN;
    n = number().min(5).errText("type error");
    assert.equal(n.test(v), false, "test number-5 fails");

    v = NaN;
    let n1 = number().optional().min(5).errText("type error");
    assert.ok(n1.test(v), "test number-6 fails");

    console.log("\x1B[32m%s\x1B[0m", "number tests passed!");
    console.log("==========");
  } catch (error) {
    console.log(error);
  }
};
