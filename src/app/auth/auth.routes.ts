import { Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [

      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'forget',
        component: ForgetPasswordComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];

export default authRoutes;
