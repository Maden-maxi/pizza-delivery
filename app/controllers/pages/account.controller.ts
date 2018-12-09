import { accountView } from '../../views/pages/account.view';
import { Route } from '../../modules/router/route';

export class AccountController extends Route {
    path = 'account';
    async get(data, callback) {
        callback(
            200,
            accountView({
                title: 'Account',
                description: 'User account',
                customClass: 'account'
            }, {
                title: 'Login',
            }),
            'html'
        );
    }
}