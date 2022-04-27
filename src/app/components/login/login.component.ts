import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {
    this.authService.logout(false)
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      "correo": ['', [Validators.required, Validators.maxLength(40)]],
      "password": ['', [Validators.required, Validators.maxLength(40)]]
    })
  }

  get correo() { return this.loginForm.controls['correo'] }

  get password() { return this.loginForm.controls['password'] }

  login () {
    if (this.loginForm.invalid) {
      Swal.fire('Atención', 'Usuario y/o contraseña incorrectos. Campos incorrectos', 'warning')
      return
    }

    this.authService.login(
      this.loginForm.getRawValue().correo,
      this.loginForm.getRawValue().password
    ).subscribe((result: any) => {
        localStorage.setItem('access_token', result.token)
        this.router.navigate(['/dashboard'])
    }, (err: any) => {
        let error = err.error.msg
        Swal.fire('Atención',error, 'warning')
    })
  }

}
