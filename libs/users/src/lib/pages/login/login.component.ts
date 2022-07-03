import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'black-bird-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  isSubmitted = false;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    console.log('this.loginForm.value', this.loginForm.value);
  }
}
