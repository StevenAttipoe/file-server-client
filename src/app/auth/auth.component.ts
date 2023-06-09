import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [
  ]
})
export class AuthComponent {
  isLoginSelected: boolean | null = null;

  constructor(private router: Router) {
  }

  toggleForm(isLogin: boolean): void {
    this.isLoginSelected = isLogin;
  }

  signIn(): void {
    this.router.navigate(['/dashboard']);
  }
}
