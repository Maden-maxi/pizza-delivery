import { Route } from '../../modules/router/route';
import { createProductView } from '../../views/pages/create-product.view';

export class CreateProductController extends Route {
    path = 'create-product';
    async get(data, callback) {
        callback(
            200,
            createProductView({
                title: 'Create product',
                description: 'Create product',
                customClass: 'create-product'
            }, {
                title: 'Create-product',
            }),
            'html'
        );
    }
}