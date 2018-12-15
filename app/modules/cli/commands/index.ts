import { menuItems } from './menu-items';
import { usersCommand } from './users';
import { ordersCommnand } from './orders';
import { manCommand } from './manual';

export const COMMAND = {
    'exit': () => process.exit(0),
    'man': manCommand,
    'help': manCommand,
    'menu items': menuItems,
    'users': usersCommand,
    'orders': ordersCommnand
};