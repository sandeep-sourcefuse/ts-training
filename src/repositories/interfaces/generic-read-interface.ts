export interface IRead<T> {
    find(): Promise<T[]>
    findOne(id: number): Promise<T>
}