import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudClienteService } from 'src/app/services/solicitud-cliente/solicitud-cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitud-producto',
  templateUrl: './solicitud-producto.component.html',
  styleUrls: ['./solicitud-producto.component.css']
})
export class SolicitudProductoComponent implements OnInit {

  productForm! : FormGroup
  constructor(private formBuilder: FormBuilder, private authService: SolicitudClienteService, private router: Router) {
    this.authService.logout(false)
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      "id": ['', [Validators.required, Validators.maxLength(50)]],
      "pac": ['', [Validators.required, Validators.maxLength(50)]]
    })
  }

  get id() { return this.productForm.controls['id'] }

  get pac() { return this.productForm.controls['pac'] }

  verify() {
    this.authService.verifyProduct(
      this.productForm.getRawValue().id,
      this.productForm.getRawValue().pac
    ).subscribe((result: any) => {
      console.log(result);
        if (result.status == 400) {
          Swal.fire('Atención',result.message, 'warning')
          return
        } else if (result.status == 200) {
          localStorage.setItem('token_id', result.result[0].idproducto)
          this.router.navigate(['/datos-cliente'])
        }
    }, (err: any) => {
        let error = err.error.msg
        Swal.fire('Atención',error, 'warning')
    })
  }

}
