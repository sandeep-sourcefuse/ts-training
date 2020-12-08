import {IRead} from '../interfaces/generic-read-interface';
import {IWrite} from '../interfaces/generic-write-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export abstract class CRUDRepository<T> implements IWrite<T>, IRead<T>{
    
    public baseUrl: string = `${environment.api.baseUrl}`;

    constructor(
        protected _http: HttpClient
    ) {}

    create(endPoint: string, item: T): Observable<T> {
        return this._http.post<T>(`${this.baseUrl+endPoint}`, item);
    }
    update(endPoint: string, item: T): Observable<T> {
        return this._http.put<T>(`${this.baseUrl+endPoint}`, item);
    }
    delete(endPoint: string): Observable<boolean> {
        return this._http.delete<boolean>(`${this.baseUrl+endPoint}`);
    }
    find(endPoint: string): Observable<T[]> {
        return this._http.get<T[]>(`${this.baseUrl+endPoint}`);
    }
    findOne(endPoint: string): Observable<T> {
        throw new Error('Method not implemented.');
    }
}