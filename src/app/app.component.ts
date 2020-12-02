import { Component } from '@angular/core';
import usersData from '../datasource/users.json';
import {User, UserI} from './models/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'ts-training';
  initializeData: boolean = false;
  users: User[] = [];

  loadData(){
    this.initializeData = true;
    this.users = usersData.map((user: UserI) => new User({...user}));
  }

  deleteUser(id: number){
    this.users = this.users.filter((user: any) => user.id != id);
  }
}
