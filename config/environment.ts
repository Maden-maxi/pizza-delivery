import { readFileSync } from 'fs';
import { join } from 'path';
import { EOL } from 'os';
import { EnvInterface } from './env-interface';

// Determine which environment was passed as a command-line argument
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';

const env: string = readFileSync(join(__dirname, '..', '.env' + currentEnvironment), {encoding: 'utf-8'});
const getEnvs = () => {
    let envs: EnvInterface | any = {};
    env.split(EOL).forEach(envVar => {
        const [key, value] = envVar.split('=');
        if(key) {
            envs = {...envs, [key]: value};
        }
    });
    return envs;
};
export const environment: EnvInterface = getEnvs();