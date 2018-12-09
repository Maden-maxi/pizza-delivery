import { Route } from '../../modules/router/route';
import { loginView } from '../../views/pages/login.view';

export class LoginController extends Route {
    path = 'login';
    async get(data, callback) {
        callback(
            200,
            loginView(
                {
                    title: 'Login',
                    description: 'Log in to your account',
                    customClass: 'login'
                },
                {
                    title: 'Login',
                },
            ),
            'html'
        );
    }
}