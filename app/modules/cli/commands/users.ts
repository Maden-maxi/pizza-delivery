import { UserController } from '../../../controllers/api/user.controller';
import { horizontalLine } from '../utils';
import { UserModel } from '../../../models/user.model';
import { TokenModel } from '../../../models/token.model';

export function usersCommand(args?) {
    const user = new UserController();
    const users = new UserModel();
    const token = new TokenModel();
    if (args) {
        if (args.email) {
            users.readByEmail(args.email).then(value => {
                console.log(value);
            })
        }
        if (args.hasOwnProperty('signed-last-day')) {
            const d = new Date(Date.now() - 24*60*60 * 1000);
            token.read({"createdAt":{"createdAt":{$gt: Date.parse(d.toString()) }}}).then(value => {
                console.log(value);
            })
        }
        if (!Object.keys(args).length) {
            user.get({}, (status, value, type) => {
                horizontalLine();
                value.forEach(item => console.log(`${item._id}: ${item.name} - ${item.email}`));
                horizontalLine();
            });
        }
    }
}