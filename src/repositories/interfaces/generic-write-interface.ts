import { Observable } from 'rxjs';

export interface IWrite<T> {
    create(endPoint: string, item: T): Observable<T>
    update(endPoint: string, item: T): Observable<T>
    delete(endPoint: string): Observable<boolean>
}