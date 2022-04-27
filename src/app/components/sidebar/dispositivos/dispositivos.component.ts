import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ProductService } from 'src/app/services/product/product.service';
import Swal from 'sweetalert2';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.component.html',
  styleUrls: ['./dispositivos.component.css']
})
export class DispositivosComponent implements OnInit {

  @ViewChild('modalRegistro')
  modalComponent!: ModalComponent;
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>()
  productList: any
  showModal: boolean = false;

  constructor(
    private productService: ProductService,
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
    this.getProducts()
  }

  showEditar(product: any): void {
    this.modalService.show('Editar Producto',this.getUpdateForm(product), true)
      .then(() => {this.updateProduct(product._id)})
      .catch((err) => console.log(err))
  }

  showAddProductModal(): void {
    this.showModal = true;
    this.modalService.show('Registro de Producto', this.getRegisterForm(), true)
      .then(() => { this.saveProduct() })
      .catch(() => { this.clearForm() });
  }

  showEliminar(product: any): void {
    this.modalService.show('Advertencia', this.getDeleteForm(), true)
      .then(() => { this.deleteProduct(product._id) })
      .catch((err) => { console.log(err) });
  }

  ngAfterViewInit(): void {
    this.modalService.register(this.modalComponent)
  }

  getProducts() {
    this.productService.getList().subscribe((response: any) => {
        this.productList = response.productos
        this.dtTrigger.next(response.productos)
    }, (err: any) => {

    })
  }

  getRegisterForm() {
    return `<div id="update-form">
    <label>Nombre: </label>
    <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-file-signature"></i> </span>
        <input type="text" name="first-name" id="first-name" placeholder="Nombre" class="form-control"">
    </div>
    <label>Descripción: </label>
    <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-file-medical-alt"></i> </span>
        <input type="text" name="descripcion" id="descripcion" placeholder="Descripción" class="form-control" autocomplete="off" ">
    </div>
    <label>Precio: </label>
    <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-dollar-sign"></i> </span>
        <input type="number" name="precio" id="precio" placeholder="Precio" class="form-control" autocomplete="off" ">
    </div>
    <label>Id Producto: </label>
    <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-fingerprint"></i> </span>
        <input type="text" name="idProducto" id="idProducto" placeholder="idProducto" class="form-control" autocomplete="off" ">
    </div>
    <label>PAC: </label>
    <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fab fa-buffer"></i> </span>
        <input type="text" name="pac" id="pac" placeholder="PAC" class="form-control" autocomplete="off"">
    </div>
    <label>Imagen: </label>
    <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-images"></i> </span>
        <input type="text" name="img" id="img" placeholder="Imagen" class="form-control" autocomplete="off">
    </div>
  </div>`;
  }

  getUpdateForm(product: any) {
    return `<div id="update-form">
        <label>Nombre: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-file-signature"></i> </span>
            <input type="text" name="first-name" id="first-name" placeholder="Nombre" class="form-control" value="${ product.nombre }">
        </div>
        <label>Descripción: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-file-medical-alt"></i> </span>
            <input type="text" name="descripcion" id="descripcion" placeholder="Descripción" class="form-control" autocomplete="off" value="${ product.descripcion }">
        </div>
        <label>Precio: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-dollar-sign"></i> </span>
            <input type="number" name="precio" id="precio" placeholder="Precio" class="form-control" autocomplete="off" value="${ product.precio }">
        </div>
        <label>Id Producto: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-fingerprint"></i> </span>
            <input type="text" name="idProducto" id="idProducto" placeholder="idProducto" class="form-control" autocomplete="off" value="${ product.idProducto }">
        </div>
        <label>PAC: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fab fa-buffer"></i> </span>
            <input type="text" name="pac" id="pac" placeholder="PAC" class="form-control" autocomplete="off" value="${ product.mac }">
        </div>
        <label>Imagen: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-images"></i> </span>
            <input type="text" name="img" id="img" placeholder="Imagen" class="form-control" autocomplete="off" value="${ product.img }">
        </div>
        <label>Disponible: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-info-circle"></i> </span>
            <select name="" id="active" class="form-control">
                <option value="true" ${ product.estado === true ? 'selected' : '' }>Habilitado</option>
                <option value="false" ${ product.estado === false ? 'selected' : '' }>Desahabilitado</option>
            </select>
        </div>
      </div>`;
  }

  getDeleteForm() {
    return `
            <p>
                ¿Seguro de eliminar este producto? Esta acción no se puede deshacer
            </p>
          `;
  }

  updateProduct(productId: any) {
    let firstName = (<HTMLInputElement>document.getElementById('first-name')).value;
    let descripcion = (<HTMLInputElement>document.getElementById('descripcion')).value;
    let precio = parseInt((<HTMLInputElement>document.getElementById('precio')).value);
    let idProducto = (<HTMLInputElement>document.getElementById('idProducto')).value;
    let mac = (<HTMLInputElement>document.getElementById('pac')).value;
    let img = (<HTMLInputElement>document.getElementById('img')).value;
    let estado = (<HTMLInputElement>document.getElementById('active')).value;
    let booleano = String(estado) === "true"

    this.productService.updateProduct(productId, firstName, descripcion, precio, idProducto, mac, img, booleano ).subscribe((result: any) => {
        Swal.fire('Atención','Se actualizó correctamente el producto', 'success')
        this.rerenderProducts()
    }, (err: any) => {
      Swal.fire('Atención',err.message, 'error')
    })
  }

  saveProduct() : any {
    let firstName = (<HTMLInputElement>document.getElementById('first-name')).value;
    let descripcion = (<HTMLInputElement>document.getElementById('descripcion')).value;
    let precio = parseInt((<HTMLInputElement>document.getElementById('precio')).value);
    let idProducto = (<HTMLInputElement>document.getElementById('idProducto')).value;
    let mac = (<HTMLInputElement>document.getElementById('pac')).value;
    let img = (<HTMLInputElement>document.getElementById('img')).value;

    this.productService.addProduct(firstName, descripcion, precio, idProducto, mac, img).subscribe((result) => {
        Swal.fire('Atención','Se creó correctamente el producto', 'success')
        this.rerenderProducts()
    }, (err) => {
      Swal.fire('Atención',err.message, 'error')
    });

    this.clearForm();
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe((result: any) => {
      if (result.ok) {
        Swal.fire('Atención','Se eliminó correctamente el producto', 'success')
        this.rerenderProducts()
      } else {
        Swal.fire('Atención',result.message, 'warning')
      }
    }, (err: any) => {
      Swal.fire('Atención',err.message, 'error')
    })
  }

  rerenderProducts() {
    this.productService.getList().subscribe((response: any) => {
        this.productList = response.result
        this.rerender()
    }, (err: any) => {
    })
  }

  clearForm() {
    (<HTMLInputElement>document.getElementById('first-name')).value = '';
    (<HTMLInputElement>document.getElementById('descripcion')).value = '';
    (<HTMLInputElement>document.getElementById('precio')).value = '';
    (<HTMLInputElement>document.getElementById('idProducto')).value = '';
    (<HTMLInputElement>document.getElementById('pac')).value = '';
    (<HTMLInputElement>document.getElementById('img')).value = '';
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.getProducts()
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
