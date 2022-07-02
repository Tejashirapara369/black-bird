import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@black-bird/users';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  editMode = false;
  isSubmitted = false;
  countries = [];
  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    isAdmin: [false],
    street: [''],
    apartment: [''],
    zip: ['', [Validators.maxLength(6), Validators.minLength(4)]],
    city: [''],
    country: ['']
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._checkEditMode();
    this.countries = this.userService.getCountryList();
  }

  onSubmit() {
    console.log('this.userForm', this.userForm)
    this.isSubmitted = true;
    if (this.userForm.invalid) return;

    if (this.editMode) {
      this._updateUser(this.route.snapshot.params.id, this.userForm.value);
    } else {
      this._createUser(this.userForm.value);
    }
  }

  onCancel() {}

  private _updateUser(id, user) {
    this.userService.updateUser(id, user).subscribe({
      next: (res) => {
        if (res)
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `User ${res.name} updated successfuly.`
          });
        this.location.back();
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Not able to create User!'
        })
    });
  }

  private _createUser(user) {
    this.userService.createUser(user).subscribe({
      next: (res) => {
        if (res)
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `User ${res.name} created successfuly`
          });
        this.location.back();
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Not able to create User!'
        })
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.editMode = true;
        this.userService.getUserById(id).subscribe((res) => {
          this.userForm.patchValue(res);
        });
        this.userForm.get('password').setValidators([]);
        this.userForm.get('password').updateValueAndValidity();
      }
    });
  }
}
