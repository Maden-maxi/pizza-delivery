import { horizontalLine } from '../utils';
import { ProductController } from '../../../controllers/api/product.controller';

export function menuItems(args?) {
    const products = new ProductController();
    if (args) {
        if (args.id) {}
    }
    products.get({}, (status, value, type) => {
       horizontalLine();
       value.forEach(item => console.log(`${item._id}: ${item.title} - ${item.price}$`));
       horizontalLine();
    });
}