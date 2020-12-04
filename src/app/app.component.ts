import { Component } from '@angular/core';
import {UsersRepository} from '../repositories/users.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends UsersRepository {
  title: string = 'ts-training';
}
