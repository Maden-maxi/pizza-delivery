import { Spec } from '..';
import { strictEqual } from 'assert';
import { trimPath } from '../../app/modules/shared/trim-path';

export const trimPathSpecs: Spec = {};

trimPathSpecs[`trimPath: Should return string without slashes at the begin of string and in the end of string`] = done => {
    const testValue = '/test/path/';
    const processedValue = trimPath(testValue);
    const expected = processedValue.charAt(0) !== '/' && processedValue.charAt(processedValue.length - 1) !== '/';
    strictEqual(true, expected);
    done();
};