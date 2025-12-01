import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms'; // 👈 Importa esto
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.component.css'],
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  email = '';
  password = '';
  popupType: 'loading' | 'error' | 'success' | '' = '';
  loading = signal(false);
  popupMessage = signal('');

  onSubmit() {

    this.loading.set(true);
    this.popupType = 'loading';
    this.popupMessage.set('Verificando credenciales...');

    const data = { email: this.email, password: this.password };

    this.authService
      .login(data)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
            // 🟦 GUARDAR EN SESSION STORAGE
          sessionStorage.setItem('userId', res.user?.id);
          sessionStorage.setItem('userData', JSON.stringify(res));

          this.authService
          .getInfoUsuario(res.user?.id)
          .pipe(finalize(() => this.loading.set(false)))
          .subscribe({
            next: (res) => {
              sessionStorage.setItem('userInfo', JSON.stringify(res));
            },
            error: (err) => {
            console.log('Error cargando informacion del usuario');
            },
          });

          this.popupType = 'success';
          this.popupMessage.set(`Bienvenido ${res.user?.pnombre ?? 'usuario'}`);
          this.router.navigateByUrl('/encuestas');

        },
        error: (err) => {
          this.popupType = 'error';
          this.popupMessage.set(
            err?.status === 401
              ? 'Credenciales incorrectas'
              : 'Error de conexión con el servidor'
          );
        },
      });


  }
}
