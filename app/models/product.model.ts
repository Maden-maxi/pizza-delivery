import { CollectionModel } from './collection.model';
import { ObjectId } from 'bson';

export class ProductModel extends CollectionModel {
    name = 'products';
    async readByIds(ids) {
        const objectIds = ids.map(id => new ObjectId(id));
        return await this.read({_id: {$in: objectIds}});
    }
}