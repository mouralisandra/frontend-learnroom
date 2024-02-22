import {Component, inject} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {SignUp} from "@core/models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  formData: SignUp = { name: '', user: true, password: '', email: '' };

  constructor() {}

  onSubmit(form: NgForm) {
    if (form.value !== null && form.value !== undefined) {
      this.formData = { ...this.formData, ...form.value };

      this.authService
        .signUp({
          email: this.formData.email as string,
          password: this.formData.password as string,
          name: this.formData.name as string,
          user: this.formData.user.toString() === 'true',
        } as SignUp)
        .subscribe();

      this.router.navigate(['/classroom'])
    }
  }
}
