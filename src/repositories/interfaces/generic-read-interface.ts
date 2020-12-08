import { Observable } from 'rxjs';

export interface IRead<T> {
    find(endPoint: string): Observable<T[]>
    findOne(endPoint: string, id: number): Observable<T>
}