import { horizontalLine } from '../utils';
import { ProductController } from '../../../controllers/api/product.controller';
import { ProductsController } from '../../../controllers/api/products.controller';

export function menuItems(args?) {
    const products = new ProductController();
    const product = new ProductsController();
    if (args) {

        if (args.id) {
            product.get(
                {
                    params: {
                        _id: args.id
                    }
                },
                (status, item, type) => {
                    console.log(`${item._id}: ${item.title} - ${item.price}$`);
                    console.log(`description: ${item.description}`);
                }
            )
        }
        if (!Object.keys(args).length) {
            products.get({}, (status, value, type) => {
                horizontalLine();
                value.forEach(item => console.log(`${item._id}: ${item.title} - ${item.price}$`));
                horizontalLine();
            });
        }
    }

}