import { UserI, User } from 'src/models/users';
import { CRUDRepository } from './base/crud-repository';
import moment from "moment";

export class UsersRepository extends CRUDRepository<UserI>{

    initializeData: boolean = false;
    users: User[] = [];
    newUser: UserI = {
        "first_name": "",
        "middle_name": "",
        "last_name": "",
        "email": "",
        "phone": "",
        "role": 0,
        "address": "" 
    };

    loadData(){
        this.find("/users").subscribe((usersData: UserI[]) => {
            this.initializeData = true;
            this.users = usersData.map((user: UserI) => new User({...user}));
        })
    }

    deleteUser(selectedUser: UserI){
        this.delete(`/users/${selectedUser.id}`).subscribe((result: boolean) => {
           this.users = this.users.filter((user: User) => user.id != selectedUser.id);
        })
    }

    async createUser(){

        if(
            !this.newUser.first_name || 
            !this.newUser.email || 
            (!this.newUser.role && this.newUser.role != 0)
        ){
            alert("Please check all required filled");
            return;
        }

        let currentDateTime = moment().format("YYYY-MM-DDTHH:mm:ssZ");
        this.newUser.created_at = currentDateTime;
        this.newUser.modified_at = currentDateTime;

        return new Promise(res => {
            this.create("/users", this.newUser).subscribe((user: UserI) => {
                this.users.unshift(new User(user));
                res();
            })
        })
    }

    updateUser(user: User){
        this.update(`/users/${user.id}`, user.editedData).subscribe((updatedUser: UserI) => {
            user.saveData();
        })
    }

    findUser(id: number){
        this.findOne(`/users/${id}`).subscribe((user: UserI) => {
            this.users = [new User(user)];
        })
    }

    countsOfUsers(): Promise<number> {
        return Promise.resolve(this.users.length);
    }
}