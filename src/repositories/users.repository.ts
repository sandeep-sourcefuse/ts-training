import { UserI, User } from 'src/models/users';
import { CRUDRepository } from './base/crud-repository';
import moment from "moment";

export class UsersRepository extends CRUDRepository<UserI>{

    initializeData: boolean = false;
    users: User[] = [];

    loadData(){
        this.find().then((usersData: UserI[]) => {
            this.initializeData = true;
            this.users = usersData.map((user: UserI) => new User({...user}));
        })
    }

    deleteUser(id: number){
        this.delete(id).then((result: boolean) => {
           if(result) this.users = this.users.filter((user: User) => user.id != id);
        })
    }

    async createUser(){

        let currentDateTime = moment().format("YYYY-MM-DD HH:mm");
        let userCounts = await this.countsOfUsers();
        let userData: UserI = {
            "id": new Date().getTime(),
            "first_name": "Rabbi "+userCounts,
            "middle_name": "Bolles",
            "last_name": "Owens",
            "email": "rowens0@uol.com.br",
            "phone": "399-901-9893",
            "role": 1,
            "address": "98 Shoshone Junction",
            "created_at": currentDateTime,
            "modified_at": currentDateTime
        };

        this.create(userData).then((user: UserI) => {
            this.users.unshift(new User(user));
        })
    }

    updateUser(user: User){
        this.update(user.id, user.editedData).then((updatedUser: UserI) => {
            user.saveData();
        })
    }

    findUser(id: number){
        this.findOne(id).then((user: UserI) => {
            this.users = [new User(user)];
        })
    }

    countsOfUsers(): Promise<number> {
        return Promise.resolve(this.users.length);
    }
}