import { Route } from '../../modules/router/route';
import { homeView } from '../../views/pages/home.view';

export class HomeController extends Route {
    path = '';
    async get(data, callback) {
        callback(
            200,
            homeView({
                title: 'Home',
                description: 'Pizza delivery, the cheapest prices here',
                customClass: 'home'
            }, {
                title: 'Welcome to pizza store',
                description: 'Here you can find many pizza stores and order pizza with delivery as a user. And you can provide pizza menu and provide delivery service as a Store.'
            }),
            'html'
        );
    }
}