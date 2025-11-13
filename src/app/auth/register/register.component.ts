import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, LoadingComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../auth.component.css'],
})
export class RegisterComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  nombres = '';
  apellidos = '';
  email = '';
  password = '';
  passwordConfirm = '';
  popupType: 'loading' | 'error' | 'success' | '' = '';
  loading = signal(false);
  popupMessage = signal('');

  onSubmit() {
    this.loading.set(true);
    this.popupType = 'loading';
    this.popupMessage.set('Creando Usuario...');

    const data = {
      nombres: this.nombres,
      apellidos: this.apellidos,
      correo: this.email,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
    };
    if (this.password !== this.passwordConfirm) {
      this.popupType = 'error';
      this.popupMessage.set('Las contraseñas no coinciden');
      return;
    }
    this.authService
      .createUser(data)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.popupType = 'success';
          this.popupMessage.set(`Usuario Creado`);

          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000);
        },
        error: (err) => {
          this.popupType = 'error';
          this.popupMessage.set(err.error.message);
        },
      });
  }
}
