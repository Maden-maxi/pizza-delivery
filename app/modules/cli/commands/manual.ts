import { centered, horizontalLine, verticalSpace } from '../utils';

export function manCommand() {

    // Codify the commands and their explanations
    const commands = {
        'exit' : 'Kill the CLI (and the rest of the application)',
        'man' : 'Show this help page',
        'help' : 'Alias of the "man" command',
        'menu items' : 'View all the current menu items',
        'menu items --id={item_id}' : 'View menu items details',
        'users' : 'Show a list of all the registered (undeleted) users in the system',
        'users --email={user_email}' : 'Show details of a specified user',
        'users --signed-last-day' : 'Show all the users who have signed up in the last 24 hours',
        'orders' : 'Show a list of a orders',
        'orders --id={order_id}' : 'Show a order details',
        'orders --last-day' : 'Show a list of a orders for the last day (24 hours)'
    };

    // Show a header for the help page that is as wide as the screen
    horizontalLine();
    centered('CLI MANUAL');
    horizontalLine();
    verticalSpace(2);

    // Show each command, followed by its explanation, in white and yellow respectively
    for(let key in commands){
        if(commands.hasOwnProperty(key)){
            let value = commands[key];
            let line = '      \x1b[33m '+key+'      \x1b[0m';
            let padding = 60 - line.length;
            for (let i = 0; i < padding; i++) {
                line+=' ';
            }
            line+=value;
            console.log(line);
            verticalSpace();
        }
    }
    verticalSpace(1);

    // End with another horizontal line
    horizontalLine();
}