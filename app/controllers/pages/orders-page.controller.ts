import { Route } from '../../modules/router/route';
import { ordersView } from '../../views/pages/orders.view';

export class OrdersPageController extends Route {
    path = 'orders';
    get(data, callback) {
        callback(
            200,
            ordersView(
                {
                    title: 'Orders',
                    description: 'orders',
                    customClass: 'orders'
                },
                {}
            ),
            'html'
        )
    }
}