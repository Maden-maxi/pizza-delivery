import { Spec } from '..';
import { validate } from '../../app/modules/validation';
import { ValidateOptions } from '../../app/modules/validation/validate-options.interface';
import { strictEqual } from 'assert';

export const validateSpecs: Spec = {};

validateSpecs[`validate: Should return trimmed string if min or max not defined`] = (done) => {
    const testValue = ' test string ';
    const options: ValidateOptions = {
        type: 'text',
        value: testValue
    };
    const testResult = validate(options);
    strictEqual(testResult, testValue.trim());
    done();
};

validateSpecs[`validate: Should return false if min option less then value's length option`] = (done) => {
    const testValue = ' test ';
    const trimmedTestValue = testValue.trim();
    const options: ValidateOptions = {
        type: 'text',
        value: testValue,
        min: 5
    };
    const testResult = validate(options);
    const expected = trimmedTestValue.length >= options.min ? trimmedTestValue : false;
    strictEqual(testResult, expected);
    done();
};

validateSpecs[`validate: Should return false if value is type of string when type option is number`] = (done) => {
    const testValue = ' test ';
    const options: ValidateOptions = {
        type: 'number',
        value: testValue
    };
    const testResult = validate(options);
    const expected = typeof testValue === 'number' ? testValue : false;
    strictEqual(testResult, expected);
    done();
};
