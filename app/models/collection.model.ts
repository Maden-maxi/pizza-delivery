import { DataBase } from '../modules/database';
import { ObjectId } from 'bson';

export interface IBase {
    _id?: string;
    createdAt?: number;
    updatedAt?: number;
}

export class BaseEntity {
    createdAt: number;
    updatedAt: number;
    constructor() {
        const d = Date.now();
        this.createdAt = d;
        this.updatedAt = d;
    }
}

export class CollectionModel {
    name: string;
    /**
     *
     * @param data
     */
    async create(data: any) {
        const mongoClient = await DataBase();
        const result = await mongoClient.db().collection(this.name).insertOne(data);
        await mongoClient.close();
        return result;
    }

    /**
     *
     * @param _id
     */
    async readOne(_id) {
        const mongoClient = await DataBase();
        const result = await mongoClient.db().collection(this.name).findOne({_id: new ObjectId(_id)});
        await mongoClient.close();
        return result;
    }
    async read(filter = {}) {
        const mongoClient = await DataBase();
        const result = await mongoClient.db().collection(this.name).find(filter).toArray();
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
    async delete(_id) {
        const mongoClient = await DataBase();
        const result = await mongoClient.db().collection(this.name).deleteOne({
            _id: new ObjectId(_id)
        });
        await mongoClient.close();
        return result;
    }
}