import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudClienteService } from 'src/app/services/solicitud-cliente/solicitud-cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitud-cliente',
  templateUrl: './solicitud-cliente.component.html',
  styleUrls: ['./solicitud-cliente.component.css']
})
export class SolicitudClienteComponent implements OnInit {

  clientForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private authService: SolicitudClienteService, private router: Router) { }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      "nombres": ['', [Validators.required, Validators.maxLength(50)]],
      "apellidos": ['', [Validators.required, Validators.maxLength(50)]],
      "correo": ['', [Validators.required, Validators.maxLength(70)]],
      "celular": ['', [Validators.required, Validators.maxLength(9)]],
      "dni": ['', [Validators.required, Validators.maxLength(8)]]
    })
  }

  get nombres() { return this.clientForm.controls['nombres']}
  get apellidos() { return this.clientForm.controls['apellidos']}
  get correo() { return this.clientForm.controls['correo']}
  get dni() { return this.clientForm.controls['dni']}
  get celular() { return this.clientForm.controls['celular']}

  request(){
    this.authService.saveRequest(
      this.clientForm.getRawValue().nombres,
      this.clientForm.getRawValue().apellidos,
      this.clientForm.getRawValue().correo,
      this.clientForm.getRawValue().dni,
      this.clientForm.getRawValue().celular
    ).subscribe((result: any) => {
      if (result.status == 400) {
        Swal.fire('Atención',result.message, 'warning')
        return
      } else if (result.status == 200) {
        Swal.fire('Completado','En unos días te contactaremos vía email si tu dispositivo está listo para usarse', 'success')
        this.router.navigate(['/solicitudes'])
      }
    })
  }

}
