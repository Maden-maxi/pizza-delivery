import { Route } from '../../modules/router/route';
import { productView } from '../../views/pages/product.view';

export class ProductDetailController extends Route {
    path = /^product\/([a-z0-9]+)/;
    params = ['_id'];
    async get(data, callback) {
        callback(
            200,
            productView(
                {
                    title: 'Edit product',
                    description: 'Edit product',
                    customClass: 'Edit-product'
                },
                {id: data.params._id}
            ),
            'html'
        );
    }
}