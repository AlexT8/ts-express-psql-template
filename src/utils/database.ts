import { DeepPartial, EntityTarget, ILike, ObjectLiteral, UpdateResult } from "typeorm";
import { AppDataSource } from "../db";

const getRepo = <T>(table: EntityTarget<T>) => AppDataSource.getRepository(table)

const findById = async <T>(table: EntityTarget<T>, id: string): Promise<T> => await getRepo(table).findOneBy({id} as any)
const findBy = async <T>(table: EntityTarget<T>, property: Partial<T>): Promise<T> => await getRepo(table).findOneBy(property as any)
const findOneByString = async <T>(table: EntityTarget<T>, property: Partial<T>): Promise<T> => await getRepo(table).findOne({
    [Object.entries(property)[0][0] as any]: ILike(`%${Object.entries(property)[0][1]}%`) as any
})

const deleteObject = async <T>(table: EntityTarget<ObjectLiteral>, property: Partial<T>) => getRepo(table).delete(property)

const saveObject = async <T>(table: EntityTarget<T>, object: DeepPartial<T>): Promise<T> => await getRepo(table).save(object)
const editObject = async <T>(table: EntityTarget<T>, id: string, object: Partial<T>): Promise<UpdateResult> => await getRepo(table).update(id, object as any)

const getAll = async <T>(table: EntityTarget<T>): Promise<T[]> => await getRepo(table).find({
    order: { createdAt: 'DESC' } as any
})

export const DbFunctions = {
    findById, findBy, deleteObject, saveObject, editObject, getAll, findOneByString
}