import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit {

  @Input("user") user: any; 
  @Input("createUser") createUser: any; 
  @Input("modalRef") modalRef: any; 

  constructor(
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
  }

  submitNewUser(){
    this.createUser().then(() => {
      this.modalRef.close();
    }).catch((e: any) => console.log(e));
  }
}
