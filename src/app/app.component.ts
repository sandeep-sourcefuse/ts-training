import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UsersRepository} from '../repositories/users.repository';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends UsersRepository {

  public modalRef: any;
  constructor(
    protected _http: HttpClient,
    public modalService: NgbModal
  ) {
      super(_http);
  }

  createUserModal() {
    this.modalRef = this.modalService.open(AddUserModalComponent, { size: 'lg' });
    this.modalRef.componentInstance.user = this.newUser;
    this.modalRef.componentInstance.createUser = this.createUser.bind(this);
    this.modalRef.componentInstance.modalRef = this.modalRef;
  }

  title: string = 'ts-training';
}
