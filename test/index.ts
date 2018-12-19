import { validateSpecs } from './unit/validate.spec';
import { trimPathSpecs } from './unit/trim-path.spec';
import { appSpecs } from './api/app.spec';
import { apiUsersSpecs } from './api/users.spec';


export class TestRunner {
    constructor(public tests: any) {
        this.runTests();
    }
    private countTests() {
        let counter = 0;
        for(let key in this.tests){
            if (this.tests.hasOwnProperty(key)) {
                let subTests = this.tests[key];
                for (let testName in subTests) {
                    if (subTests.hasOwnProperty(testName)) {
                        counter++;
                    }
                }
            }
        }
        return counter;
    }
    private produceReport(limit, successes, errors) {
        console.log("");
        console.log("--------BEGIN TEST REPORT--------");
        console.log("");
        console.log("Total Tests: ",limit);
        console.log("Pass: ",successes);
        console.log("Fail: ",errors.length);
        console.log("");

        // If there are errors, print them in detail
        if (errors.length > 0) {
            console.log("--------BEGIN ERROR DETAILS--------");
            console.log("");
            errors.forEach(function(testError){
                console.log('\x1b[31m%s\x1b[0m',testError.name);
                console.log(testError.error);
                console.log("");
            });
            console.log("");
            console.log("--------END ERROR DETAILS--------");
        }
        console.log("");
        console.log("--------END TEST REPORT--------");
        process.exit(0);
    }
    private runTests() {
        let errors = [];
        let successes = 0;
        let limit = this.countTests();
        let counter = 0;
        for (let key in this.tests) {
            if (this.tests.hasOwnProperty(key)) {
                let subTests = this.tests[key];
                for (let testName in subTests) {
                    if (subTests.hasOwnProperty(testName)) {
                        (() => {
                            let tmpTestName = testName;
                            let testValue = subTests[testName];
                            // Call the test
                            try {
                                testValue(() => {

                                    // If it calls back without throwing, then it succeeded, so log it in green
                                    console.log('\x1b[32m%s\x1b[0m',tmpTestName);
                                    counter++;
                                    successes++;
                                    if(counter == limit){
                                        this.produceReport(limit,successes,errors);
                                    }
                                });
                            } catch(e) {
                                // If it throws, then it failed, so capture the error thrown and log it in red
                                errors.push({
                                    'name' : testName,
                                    'error' : e
                                });
                                console.log('\x1b[31m%s\x1b[0m',tmpTestName);
                                counter++;
                                if(counter == limit){
                                    this.produceReport(limit,successes,errors);
                                }
                            }
                        })();
                    }
                }
            }
        }
    }
}

export interface Spec {
    [key: string]: (done: Function) => any;
}

const tests = {
    unit: {
        ...validateSpecs,
        ...trimPathSpecs
    },
    api: {
        // init test server appSpecs must be first in the order
        ...appSpecs,
        ...apiUsersSpecs
    }
};

export const testRunner = new TestRunner(tests);