import { MongoClient } from 'mongodb';
const url = `mongodb://@db:27017/pizza`;

export async function DataBase() {
    try {
        return await MongoClient.connect(url, { useNewUrlParser: true });
    } catch (e) {
        console.log(e);
    }
}

export async function db(collection) {
    const {db, close} = await MongoClient.connect(url, { useNewUrlParser: true });
    return db().collection(collection);
}

export async function insertOne(collection, data) {
    const {db, close} = await DataBase();
    try {
        const result = await db().collection(collection).insertOne(data);
        await close();
        return result;
    } catch (e) {
        return e;
    }
}

export async function findOne(collection, filter) {
    const {db, close} = await DataBase();
    const result = await db().collection(collection).findOne(filter);
    await close();
    return result;
}

export async function findMany(collection, filter) {
    const {db, close} = await DataBase();
}

export async function updateOne(collection, filter, update) {
    const {db, close} = await DataBase();
    const result = await db().collection(collection).updateOne(filter, update);
    await close();
    return result;
}

export async function deleteOne(collection, filter) {
    const {db, close} = await DataBase();
    const result = await db().collection(collection).deleteOne(filter);
    await close();
    return result;
}