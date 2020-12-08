import moment from "moment";
import { DateFormatTransform } from '../decorators/DateFormatTransform';

//custom type for address but not in use
type Address = string;

export enum UserRoles{
    SuperAdmin,
    Admin,
    Subscriber
}

//interface for user
export interface UserI{
    id?: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    phone: string;
    role: UserRoles;
    address: Address;
    created_at?: string;
    modified_at?: string;
    editMode?: boolean;
    editedData?: UserI
}

//user class which implement user interface
export class User implements UserI {

    public id;
    public first_name;
    public middle_name;
    public last_name;
    public email;
    public phone;
    public role;
    public address;
    public editMode = false;
    public editedData;
    public created_at;
    public modified_at;

    @DateFormatTransform("created_at")
    public createdAt?: Date;

    @DateFormatTransform("modified_at")
    public modifiedAt?: Date;

    constructor(user: UserI) {
        this.id = user.id;
        this.first_name = user.first_name;
        this.middle_name = user.middle_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.phone = user.phone;
        this.role = user.role;
        this.address = user.address;
        this.created_at = user.created_at;
        this.modified_at = user.modified_at;
        this.editedData = user;
    }

    //function with default parameter
    getCreatedAt(format: string = "LLLL"): string {
        return moment(this.created_at).format(format);
    }

    //function with default parameter
    getModifiedAt(format: string = "LLLL"): string {
        return moment(this.modified_at).format(format);
    }

    saveData(){

        if(
            !this.editedData.first_name || 
            !this.editedData.email || 
            (!this.editedData.role && this.editedData.role != 0)
        ){
            alert("Please check all required filled");
            return;
        }
        this.first_name = this.editedData.first_name;
        this.middle_name = this.editedData.middle_name;
        this.last_name = this.editedData.last_name;
        this.email = this.editedData.email;
        this.phone = this.editedData.phone;
        this.role = this.editedData.role;
        this.address = this.editedData.address;

        this.modified_at = this.editedData.modified_at = moment().format("YYYY-MM-DDTHH:mm:ssZ");

        this.editMode = false;
    }

    cancelEditing(){
        
        this.editedData.first_name = this.first_name;
        this.editedData.middle_name = this.middle_name;
        this.editedData.last_name = this.last_name;
        this.editedData.email = this.email;
        this.editedData.phone = this.phone;
        this.editedData.role = this.role;
        this.editedData.address = this.address;

        this.editMode = false;
    }

    enableEditing(){
        this.editMode = true;
    }

    getRole(): string{
        return UserRoles[this.role];
    }
}

