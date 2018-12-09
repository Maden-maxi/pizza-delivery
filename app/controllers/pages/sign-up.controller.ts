import { Route } from '../../modules/router/route';
import { signUpView } from '../../views/pages/sign-up.view';

export class SignUpController extends Route {
    path = 'sign-up';
    async get(data, callback) {
        callback(
            200,
            signUpView(
                {
                    title: 'Sign Up',
                    description: 'Become customer or consumer',
                    customClass: 'sign-up'
                },
                {
                    title: 'Sign Up',
                }
            ),
            'html'
        );
    }
}