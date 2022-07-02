import { Component, OnInit } from '@angular/core';
import { User, UserService } from '@black-bird/users';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._getUserList();
  }

  deleteUser(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(id).subscribe({
          next: () => {
            this._getUserList();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User Deleted successfuly'
            });
          },
          error: () =>
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Not able to delete User!'
            })
        });
      },
      reject: () => {}
    });
  }

  private _getUserList() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }
}
