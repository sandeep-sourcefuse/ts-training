import { from } from 'rxjs';
import {IRead} from '../interfaces/generic-read-interface';
import {IWrite} from '../interfaces/generic-write-interface';
import usersData from '../../datasource/users.json';

export abstract class CRUDRepository<T> implements IWrite<T>, IRead<T>{
    
    create(item: T): Promise<T> {
        return Promise.resolve(item);
    }
    update(id: number, item: T): Promise<T> {
        return Promise.resolve(item);
    }
    delete(id: number): Promise<boolean> {
        return Promise.resolve(true);
    }
    find(): Promise<T[]> {
        let UsersData: any[] = usersData; 
        return Promise.resolve<T[]>(UsersData);
    }
    findOne(id: number): Promise<T> {
        throw new Error('Method not implemented.');
    }
}