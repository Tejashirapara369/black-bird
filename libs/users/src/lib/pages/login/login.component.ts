import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'black-bird-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  isSubmitted = false;
  authError: string | undefined;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (res) => {
        this.storageService.setToken(res.token);
        this.router.navigate(['/']);
        this.authError = undefined;
      },
      error: (err: HttpErrorResponse) => {
        this.authError =
          err.status === 400
            ? 'Email or password are invalid!'
            : 'Error in the server, please try after some time!';
      }
    });
  }
}
