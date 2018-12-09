import { CollectionModel, IBase } from './collection.model';
import { ObjectId } from 'bson';
import { DataBase } from '../modules/database';

export interface IToken extends IBase {
    email: string;
    user: any;
    expires: number;
}

export class TokenModel extends CollectionModel {
    name = 'tokens';
    async create(data) {
        const mongoClient = await DataBase();
        const result = await mongoClient.db().collection(this.name).insertOne(data);
        await mongoClient.close();
        return result;
    }
    async update(_id, data) {
        const mongoClient = await DataBase();
        const result = await mongoClient.db().collection(this.name).findOneAndUpdate({
            _id: new ObjectId(_id)
        }, {$set: data});
        await mongoClient.close();
        return result;
    }
    async verify(_id, email) {
        const token = await this.readOne(_id);
        return token.email === email && token.expires > Date.now();
    }
}