import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  @ViewChild('modalRegistro')
  modalComponent!: ModalComponent;
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>()
  userList: any
  userListAdmin: any
  showModal: boolean = false;
  constructor(
    private userService: UserService,
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
    this.getUsers()
  }

  ngAfterViewInit(): void {
    this.modalService.register(this.modalComponent)
  }

  getUsers() {
    this.userService.getList().subscribe((response: any) => {
        const array = response.result.filter((a: any,i: any,e:any) => {
          let cargo = e[i].idcargo_trabajador
          switch (cargo) {
            case 1:
              e[i].idcargo_trabajador = 'Administrador del sistema'
              break;
            case 2:
              e[i].idcargo_trabajador = 'Back Auditor'
              break;
            case 3:
              e[i].idcargo_trabajador = 'Administrador de datos'
              break;
          }
          return a
        })
        this.userListAdmin = array
        this.userList = this.userListAdmin
        this.dtTrigger.next(this.userListAdmin)
    }, (err: any) => {

    })
  }

  obtenerAdmin(rol: string) {
    return rol == "ADMIN_ROL"
  }

  rerenderUsers() {
    this.userService.getList().subscribe((response: any) => {
        this.userList = response.result
        this.rerender()
    }, (err: any) => {
      //this.modalService.show('Aviso', 'Ocurrió un error al listar los usuarios.');
    })
  }

  showAddUserModal(): void {
    this.showModal = true;
    this.modalService.show('Registro de Usuario', this.getRegisterForm(), true)
      .then(() => { this.saveUser() })
      .catch(() => { this.clearForm() });
  }

  showEditar(user: any): void {
    this.modalService.show('Editar Usuario',this.getUpdateForm(user), true)
      .then(() => {this.updateUser(user.idtrabajador)})
      .catch((err) => console.log(err))
  }

  showEliminar(user: any): void {
    this.modalService.show('Advertencia', this.getDeleteForm(), true)
      .then(() => { this.deleteUser(user.idtrabajador) })
      .catch((err) => { console.log(err) });
  }

  getRegisterForm() {
    return `<div id="register-form">
        <label>Nombres: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i> </span>
            <input type="text" name="first-name" id="first-name" placeholder="Nombre" class="form-control" autocomplete="off">
        </div>
        <label>Apellidos: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i> </span>
            <input type="text" name="last-name" id="last-name" placeholder="Apellidos" class="form-control" autocomplete="off">
        </div>
        <label>E-mail: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-envelope"></i> </span>
            <input type="email" name="email" id="email" placeholder="E-mail" class="form-control" autocomplete="off">
        </div>
        <label>Usuario: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-portrait"></i> </span>
            <input type="text" name="username" id="username" placeholder="Usuario" class="form-control" autocomplete="off">
        </div>
        <label>Contraseña: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-key"></i> </span>
            <input type="text" name="password" id="password" placeholder="Contraseña" class="form-control" autocomplete="off" >
        </div>
        <label>Rol: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-user-tag"></i> </span>
            <select name="" id="role" class="form-control">
                <option value="1" >Administrador del Sistema</option>
                <option value="2" >Back Auditor</option>
                <option value="3" >Administrador de datos</option>
            </select>
        </div>
        <label>Estado: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-info-circle"></i> </span>
            <select name="" id="active" class="form-control">
                <option value="1" >Habilitado</option>
                <option value="0" >Desahabilitado</option>
            </select>
        </div>
      </div>`;
  }

  getUpdateForm(user: any) {
    return `<div id="update-form">
        <label>Nombres: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i> </span>
            <input type="text" name="first-name" id="first-name" placeholder="Nombre" class="form-control" value="${ user.nombres }">
        </div>
        <label>Apellidos: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i> </span>
            <input type="text" name="last-name" id="last-name" placeholder="Apellidos" class="form-control" value="${ user.apellidos }">
        </div>
        <label>E-mail: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-envelope"></i> </span>
            <input type="email" name="email" id="email" placeholder="E-mail" class="form-control" autocomplete="off" value="${ user.correo }">
        </div>
        <label>Usuario: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-portrait"></i> </span>
            <input type="text" name="username" id="username" placeholder="Usuario" class="form-control" autocomplete="off" value="${ user.usuario }">
        </div>
        <label>Contraseña: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-key"></i> </span>
            <input type="text" name="password" id="password" placeholder="Contraseña" class="form-control" autocomplete="off" >
        </div>
        <label>Rol: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-user-tag"></i> </span>
            <select name="" id="role" class="form-control">
                <option value="1" ${ user.idcargo_trabajador === 'Administrador del sistema' ? 'selected' : '' }>Administrador del Sistema</option>
                <option value="2" ${ user.idcargo_trabajador === 'Back Auditor' ? 'selected' : '' }>Back Auditor</option>
                <option value="3" ${ user.idcargo_trabajador === 'Administrador de datos' ? 'selected' : '' }>Administrador de datos</option>
            </select>
        </div>
        <label>Estado: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-info-circle"></i> </span>
            <select name="" id="active" class="form-control">
                <option value="1" ${ user.estado === 1 ? 'selected' : '' }>Habilitado</option>
                <option value="0" ${ user.estado === 0 ? 'selected' : '' }>Desahabilitado</option>
            </select>
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

  saveUser() : any {
    let firstName = (<HTMLInputElement>document.getElementById('first-name')).value;
    let lastName = (<HTMLInputElement>document.getElementById('last-name')).value;
    let email = (<HTMLInputElement>document.getElementById('email')).value;
    let username = (<HTMLInputElement>document.getElementById('username')).value;
    let password = (<HTMLInputElement>document.getElementById('password')).value;
    let role = (<HTMLInputElement>document.getElementById('role')).value;

    this.userService.addUser(firstName, lastName, email, username, password, role).subscribe((result) => {
        Swal.fire('Atención','Se creó correctamente el usuario', 'success')
        this.rerenderUsers()
    }, (err) => {
      Swal.fire('Atención',err.message, 'error')
    });

    this.clearForm();
  }

  updateUser(userId: any) {
    let firstName = (<HTMLInputElement>document.getElementById('first-name')).value;
    let lastName = (<HTMLInputElement>document.getElementById('last-name')).value;
    let email = (<HTMLInputElement>document.getElementById('email')).value;
    let username = (<HTMLInputElement>document.getElementById('username')).value;
    let password = (<HTMLInputElement>document.getElementById('password')).value;
    let role = (<HTMLInputElement>document.getElementById('role')).value;
    let active = (<HTMLInputElement>document.getElementById('active')).value;

    this.userService.updateUser(userId, firstName, lastName, email, username, password, role, active ).subscribe((result: any) => {
        Swal.fire('Atención','Se actualizó correctamente el usuario', 'success')
        this.rerenderUsers()
    }, (err: any) => {
      Swal.fire('Atención',err.message, 'error')
    })
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe((result: any) => {
      if (result.status === 200) {
        Swal.fire('Atención','Se eliminó correctamente el usuario', 'success')
        this.rerenderUsers()
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
    (<HTMLInputElement>document.getElementById('username')).value = '';
    (<HTMLInputElement>document.getElementById('password')).value = '';
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.getUsers()
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
