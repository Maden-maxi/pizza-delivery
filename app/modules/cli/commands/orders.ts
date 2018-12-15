import { OrderModel } from '../../../models/order.model';
import { centered, horizontalLine } from '../utils';

export function ordersCommnand(args?) {
    const orderModel = new OrderModel();

    if (args) {
        if (args.id) {
            orderModel.readOne(args.id).then(value => {
                console.log(value);
            });
        }
        if (args.hasOwnProperty('last-day')) {
            // {"createdAt":{$gt:new Date(Date.now() - 24*60*60 * 1000)}}
            const d = new Date(Date.now() - 24*60*60 * 1000);
            orderModel.read({"createdAt":{$gt: Date.parse(d.toString()) }}).then(value => {
                console.log(value.map(v => v));
            });
        }
        if (!Object.keys(args).length) {
            orderModel.read().then(value => {
                centered('Orders ids');
                horizontalLine();
                value.forEach(item => console.log(`${item._id}`));
                horizontalLine();
            });
        }
    }


}