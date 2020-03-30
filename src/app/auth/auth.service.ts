import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { User } from 'firebase';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  public crearUsuario(nombre: string, email: string, password: string) {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        Swal.fire('Tenemos problemas', error.message, 'error');
      });
  }

  public login(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        Swal.fire('Tenemos problemas', error.message, 'error');
      });
  }

  public initAuthListener() {
    this.auth.authState.subscribe((user: User) => {
      console.log(user);
    });
  }

  public isAuth() {
    return this.auth.authState.pipe(
      map(user => {
        if (user == null) {
          this.router.navigate(['login']);
        }

        return user != null;
      }),
    );
  }
}
