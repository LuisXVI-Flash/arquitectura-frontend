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
        const array = response.usuario.filter((a: any,i: any) => {
          if (a.rol == "ADMIN_ROLE") {
            return a
          }
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
      .then(() => {this.updateUser(user.uid)})
      .catch((err) => console.log(err))
  }

  showEliminar(user: any): void {
    this.modalService.show('Advertencia', this.getDeleteForm(), true)
      .then(() => { this.deleteUser(user.uid) })
      .catch((err) => { console.log(err) });
  }

  getRegisterForm() {
    return `<div id="register-form">
        <label>Nombres: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i> </span>
            <input type="text" name="first-name" id="first-name" placeholder="Nombre" class="form-control">
        </div>
        <label>Edad: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="far fa-calendar-alt"></i> </span>
            <input type="number" name="edad" id="edad" placeholder="Edad" class="form-control">
        </div>
        <label>E-mail: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-envelope"></i> </span>
            <input type="email" name="email" id="email" placeholder="E-mail" class="form-control" autocomplete="off">
        </div>
        <label>Contraseña: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-lock"></i> </span>
            <input type="text" name="password" id="password" placeholder="Contraseña" class="form-control" autocomplete="off">
        </div>
        <label>Rol: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-key"></i> </span>
            <select name="" id="role" class="form-control">
                <option value="ADMIN_ROLE">Administrador</option>
                <option value="USER_ROLE">Usuario</option>
            </select>
        </div>
      </div>`;
  }

  getUpdateForm(user: any) {
    return `<div id="update-form">
        <label>Nombres: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i> </span>
            <input type="text" name="first-name" id="first-name" placeholder="Nombre" class="form-control" value="${ user.nombre }">
        </div>
        <label>E-mail: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-envelope"></i> </span>
            <input type="email" name="email" id="email" placeholder="E-mail" class="form-control" autocomplete="off" value="${ user.correo }">
        </div>
        <label>Imagen: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-portrait"></i> </span>
            <input type="text" name="img" id="img" placeholder="Imagen" class="form-control" autocomplete="off" value="${ user.img }">
        </div>
        <label>Rol: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-key"></i> </span>
            <select name="" id="role" class="form-control">
                <option value="ADMIN_ROLE" ${ user.rol === 'ADMIN_ROLE' ? 'selected' : '' }>Administrador</option>
                <option value="USER_ROLE" ${ user.rol === 'USER_ROLE' ? 'selected' : '' }>Usuario</option>
            </select>
        </div>
        <label>Estado: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-info-circle"></i> </span>
            <select name="" id="active" class="form-control">
                <option value="1" ${ user.estado === true ? 'selected' : '' }>Habilitado</option>
                <option value="0" ${ user.estado === false ? 'selected' : '' }>Desahabilitado</option>
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
    let age = parseInt((<HTMLInputElement>document.getElementById('edad')).value);
    let email = (<HTMLInputElement>document.getElementById('email')).value;
    let password = (<HTMLInputElement>document.getElementById('password')).value;
    let role = (<HTMLInputElement>document.getElementById('role')).value;

    this.userService.addUser(firstName, age, email, password, role).subscribe((result) => {
        Swal.fire('Atención','Se creó correctamente el usuario', 'success')
        this.rerenderUsers()
    }, (err) => {
      Swal.fire('Atención',err.message, 'error')
    });

    this.clearForm();
  }

  updateUser(userId: any) {
    let firstName = (<HTMLInputElement>document.getElementById('first-name')).value;
    let email = (<HTMLInputElement>document.getElementById('email')).value;
    let img = (<HTMLInputElement>document.getElementById('img')).value;
    let role = (<HTMLInputElement>document.getElementById('role')).value;

    this.userService.updateUser(userId, firstName, img, email, role ).subscribe((result: any) => {
        Swal.fire('Atención','Se actualizó correctamente el usuario', 'success')
        this.rerenderUsers()
    }, (err: any) => {
      Swal.fire('Atención',err.message, 'error')
    })
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe((result: any) => {
      if (result.ok) {
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
    (<HTMLInputElement>document.getElementById('phone')).value = '';
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
