import { DataBase } from '../modules/database';
import { CollectionModel, IBase } from './collection.model';
import { ObjectId } from 'bson';

export interface IUser extends IBase {
    email: string;
    password: string | any;
    name?: string;
    address?: string;
    role?: string;
    cart?: any;
    description?: string;
    currency?: string;
}

export class UserModel extends CollectionModel {
    name = 'users';
    async create(data: IUser) {
        const mongoClient = await DataBase();
        const result = await mongoClient.db().collection(this.name).insertOne(data);
        await mongoClient.close();
        return result;
    }
    async readByEmail(email) {
        const mongoClient = await DataBase();
        const result = await mongoClient.db().collection(this.name).findOne({email});
        await mongoClient.close();
        return result;
    }
    async update(_id, data: IUser) {
        const mongoClient = await DataBase();
        const result = await mongoClient.db().collection(this.name).findOneAndUpdate({
            _id: new ObjectId(_id)
        }, {$set: data});
        await mongoClient.close();
        return result;
    }
}