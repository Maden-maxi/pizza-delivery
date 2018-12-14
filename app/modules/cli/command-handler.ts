import { COMMAND } from './commands';
import { commandNotExist } from './commands/undefined';

/**
 * Command syntax
 * [command name] {--command-param=value}
 * @param command
 */
function parseCommand(command: string): {name: string; args: any} {
    const commandParts = command.split(' ').map(cmd => cmd.replace('--', ''));
    const commandName = commandParts.filter(cmd => !cmd.includes('='));
    let argsObject = {};
    commandParts.filter(cmd => cmd.includes('='))
        .forEach(cmd => {
            const arg = cmd.split('=');
            const name = arg[0];
            argsObject = {
                ...argsObject,
                [name]: arg[1]
            };
            return {[name]: arg[1]};
        });

    return {
        name: commandName.join(' '),
        args: argsObject
    };
}

export function commandHandler(command) {
    const commandObject = parseCommand(command);
    console.log(commandObject);
    try {
        COMMAND[commandObject.name](commandObject.args);
    } catch (e) {
        console.log(e);
        commandNotExist();
    }
}