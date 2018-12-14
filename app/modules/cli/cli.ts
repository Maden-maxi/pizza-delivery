import { createInterface, ReadLineOptions } from "readline";
import { TokenController } from '../../controllers/api/token.controller';
import { commandHandler } from './command-handler';

export class CLI {
    static _interface;
    static async init() {
        const options: ReadLineOptions = {
            input: process.stdin,
            output: process.stdout,
            prompt: '> ',
            completer: async (line) => {
                console.log(line, 'completer');
            }
        };
        CLI._interface = createInterface(options);
        CLI._interface._writeToOutput = function _writeToOutput(stringToWrite) {
            if (CLI._interface.stdoutMuted)
                CLI._interface.output.write("*");
            else
                CLI._interface.output.write(stringToWrite);
        };
        /*let email;
        let password;
        let token;
        const tokenController = new TokenController();

        email = await CLI.question('Please authorize first. Enter your email: ', async (userLogin) => {
            CLI._interface.stdoutMuted = true;
            return userLogin;
        });
        await CLI.question(`Password for ${email}: `, async (userPassword) => {
            password = userPassword;

            tokenController.post({
                payload: {
                    password,
                    email
                }
            }, (status, data, type) => {
                if (status === 200) {
                    token = data.token;
                    console.log('Welcome %s', data.user.name);
                } else {
                    console.log(data);
                    process.exit(status);
                }
                CLI._interface.stdoutMuted = false;
            });

        });*/

        CLI._interface.prompt();

        CLI._interface.on('line', (command) => {
            commandHandler(command);
            CLI._interface.prompt();
        });

        /*CLI._interface.on('close', () => {
            tokenController.delete(
                {
                    payload: {
                        _id: token
                    }
                },
                (status, data, type) => {
                    console.log(status, data);
                    process.exit(0)
                }
            )
        });*/
    }

    static question(query: string, callback: (str: string) => any) {
        return new Promise(((resolve, reject) => {
            CLI._interface.question(query,(userLogin) => {
                resolve(callback(userLogin));
            });
        }));
    }
}