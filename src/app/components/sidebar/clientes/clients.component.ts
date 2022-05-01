import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import Swal from 'sweetalert2';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  @ViewChild('modalRegistro')
  modalComponent!: ModalComponent;
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>()
  clientList: any
  clientListAdmin: any
  showModal: boolean = false;
  constructor(
    private clientService: ClientService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pageLength: 10,
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Mostrando desde _START_ al _END_ de _TOTAL_ registros",
        infoEmpty: "Mostrando ningún registro.",
        infoFiltered: "(filtrado _MAX_ registros total)",
        infoPostFix: "",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      },
      responsive: true
    };
    this.getClients()
  }

  ngAfterViewInit(): void {
    this.modalService.register(this.modalComponent)
  }

  getClients() {
    this.clientService.listClient().subscribe((response: any) => {
        const array = response.result.filter((a: any,i: any) => {
            return a
        })
        this.clientListAdmin = array
        this.clientList = this.clientListAdmin
        this.dtTrigger.next(this.clientListAdmin)
    }, (err: any) => {

    })
  }

  obtenerAdmin(rol: string) {
    return rol == "USER_ROLE"
  }

  rerenderClients() {
    this.clientService.listClient().subscribe((response: any) => {
        this.clientList = response.result
        this.rerender()
    }, (err: any) => {
    })
  }

  showAddClientModal(): void {
    this.showModal = true;
    this.modalService.show('Registro de Cliente', this.getRegisterForm(), true)
      .then(() => { this.saveClient() })
      .catch(() => { this.clearForm() });
  }

  showEditar(client: any): void {
    this.modalService.show('Editar cliente',this.getUpdateForm(client), true)
      .then(() => {this.updateClient(client.idcliente)})
      .catch((err) => console.log(err))
  }

  showEliminar(client: any): void {
    this.modalService.show('Advertencia', this.getDeleteForm(), true)
      .then(() => { this.deleteClient(client.idcliente) })
      .catch((err) => { console.log(err) });
  }

  getRegisterForm() {
    return `<div id="register-form">
        <label>Nombres: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i> </span>
            <input type="text" name="first-name" id="first-name" placeholder="Nombres" class="form-control" autocomplete="off">
        </div>
        <label>Apellidos: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="far fa-user"></i> </span>
            <input type="text" name="last-name" id="last-name" placeholder="Apellidos" class="form-control" autocomplete="off">
        </div>
        <label>E-mail: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-envelope"></i> </span>
            <input type="email" name="email" id="email" placeholder="E-mail" class="form-control" autocomplete="off">
        </div>
        <label>D.N.I.: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-portrait"></i> </span>
            <input type="number" name="dni" id="dni" placeholder="D.N.I." class="form-control" autocomplete="off">
        </div>
        <label>Celular: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-phone"></i> </span>
            <input type="number" name="celular" id="celular" placeholder="Celular" class="form-control" autocomplete="off">
        </div>
      </div>`;
  }

  getUpdateForm(client: any) {
    return `<div id="update-form">
        <label>Nombres: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i> </span>
            <input type="text" name="first-name" id="first-name" placeholder="Nombres" class="form-control" value="${ client.nombres }">
        </div>
        <label>Apellidos: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="far fa-user"></i> </span>
            <input type="text" name="last-name" id="last-name" placeholder="Apellidos" class="form-control" autocomplete="off" value="${ client.apellidos }">
        </div>
        <label>E-mail: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-envelope"></i> </span>
            <input type="email" name="email" id="email" placeholder="E-mail" class="form-control" autocomplete="off" value="${ client.correo }">
        </div>
        <label>D.N.I.: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-portrait"></i> </span>
            <input type="number" name="dni" id="dni" placeholder="D.N.I." class="form-control" autocomplete="off" value="${ client.dni }">
        </div>
        <label>Celular: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-phone"></i> </span>
            <input type="number" name="celular" id="celular" placeholder="Celular" class="form-control" autocomplete="off" value="${ client.celular }">
        </div>
      </div>`;
  }

  getDeleteForm() {
    return `
            <p>
                ¿Seguro de eliminar este usuario? Esta acción no se puede deshacer
            </p>
          `;
  }

  saveClient() : any {
    let firstName = (<HTMLInputElement>document.getElementById('first-name')).value;
    let lastname = (<HTMLInputElement>document.getElementById('last-name')).value;
    let email = (<HTMLInputElement>document.getElementById('email')).value;
    let dni = (<HTMLInputElement>document.getElementById('dni')).value;
    let celular = (<HTMLInputElement>document.getElementById('celular')).value;

    this.clientService.addClient(firstName, lastname, email, dni, celular).subscribe((result) => {
        Swal.fire('Atención','Se creó correctamente el cliente', 'success')
        this.rerenderClients()
    }, (err) => {
      Swal.fire('Atención',err.message, 'error')
    });

    this.clearForm();
  }

  updateClient(idcliente: any) {
    let firstName = (<HTMLInputElement>document.getElementById('first-name')).value;
    let lastname = (<HTMLInputElement>document.getElementById('last-name')).value;
    let email = (<HTMLInputElement>document.getElementById('email')).value;
    let dni = (<HTMLInputElement>document.getElementById('dni')).value;
    let celular = (<HTMLInputElement>document.getElementById('celular')).value;

    this.clientService.updateClient(idcliente, firstName, lastname, email, dni, celular).subscribe((result: any) => {
        Swal.fire('Atención','Se actualizó correctamente el cliente', 'success')
        this.rerenderClients()
    }, (err: any) => {
      Swal.fire('Atención',err.message, 'error')
    })
  }

  deleteClient(id: any) {
    this.clientService.deleteClient(id).subscribe((result: any) => {
      if (result.status === 200) {
        Swal.fire('Atención','Se eliminó correctamente el cliente', 'success')
        this.rerenderClients()
      } else {
        Swal.fire('Atención',result.message, 'warning')
      }
    }, (err: any) => {
      Swal.fire('Atención',err.message, 'error')
    })
  }

  clearForm() {
    (<HTMLInputElement>document.getElementById('first-name')).value = '';
    (<HTMLInputElement>document.getElementById('last-name')).value = '';
    (<HTMLInputElement>document.getElementById('email')).value = '';
    (<HTMLInputElement>document.getElementById('dni')).value = '';
    (<HTMLInputElement>document.getElementById('celular')).value = '';
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.getClients()
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
