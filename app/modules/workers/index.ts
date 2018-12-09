import { debuglog } from 'util';
const debug = debuglog('workers');

export class Workers {
    static gatherAllChecks() {

    }
    static validateCheckData(originalCheckData) {

    }
    static performCheck(originalCheckData) {

    }
    static processCheckOutcome(originalCheckData, checkOutcome) {

    }
    static alertUserToStatusChange(newCheckData) {

    }
    static log(originalCheckData, checkOutcome, state, alertWarranted, timeOfCheck) {
    }
    static loop() {
        setInterval(function(){
            Workers.gatherAllChecks();
        },1000 * 60);
    }
    static rotateLogs() {

    }
    static logRotationLoop() {
        setInterval(function(){
            Workers.rotateLogs();
        },1000 * 60 * 60 * 24);
    }
    static init() {
        // Send to console, in yellow
        console.log('\x1b[33m%s\x1b[0m','Background workers are running');

        // Execute all the checks immediately
        Workers.gatherAllChecks();

        // Call the loop so the checks will execute later on
        Workers.loop();

        // Compress all the logs immediately
        Workers.rotateLogs();

        // Call the compression loop so checks will execute later on
        Workers.logRotationLoop();
    }
}