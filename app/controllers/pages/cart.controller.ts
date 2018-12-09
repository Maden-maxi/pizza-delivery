import { Route } from '../../modules/router/route';
import { cartView } from '../../views/pages/cart.view';

export class CartController extends Route {
    path = 'cart';
    async get(data, callback) {
        callback(
            200,
            cartView({
                title: 'Cart',
                description: 'Cart',
                customClass: 'cart-page'
            }, {
                title: 'Cart',
            }),
            'html'
        );
    }
}