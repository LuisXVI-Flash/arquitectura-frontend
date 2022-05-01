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
      .then(() => {this.updateProduct(product.idproducto)})
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
      .then(() => { this.deleteProduct(product.idproducto) })
      .catch((err) => { console.log(err) });
  }

  ngAfterViewInit(): void {
    this.modalService.register(this.modalComponent)
  }

  getProducts() {
    this.productService.getList().subscribe((response: any) => {
        this.productList = response.result
        this.dtTrigger.next(response.result)
    }, (err: any) => {

    })
  }

  getRegisterForm() {
    return `<div id="update-form">
    <label>Cód. Identificación: </label>
    <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-sim-card"></i> </span>
        <input type="text" name="id" id="id" placeholder="Cod. Identificación" class="form-control"">
    </div>
    <label>Codigo PAC: </label>
    <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-microchip"></i> </span>
        <input type="text" name="pac" id="pac" placeholder="Codigo PAC" class="form-control" autocomplete="off" ">
    </div>
  </div>`;
  }

  getUpdateForm(product: any) {
    return `<div id="update-form">
        <label>Cód. Identificación: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-file-signature"></i> </span>
            <input type="text" name="id" id="id" placeholder="Cod. Identificacion" class="form-control" value="${ product.id }">
        </div>
        <label>Codigo PAC: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-file-medical-alt"></i> </span>
            <input type="text" name="pac" id="pac" placeholder="Codigo PAC" class="form-control" autocomplete="off" value="${ product.pac }">
        </div>
        <label>Estado: </label>
        <div class="form-group input-group-prepend"><span class="input-group-text"><i class="fas fa-info-circle"></i> </span>
            <select name="" id="active" class="form-control">
                <option value="1" ${ product.estado === true ? 'selected' : '' }>Habilitado</option>
                <option value="0" ${ product.estado === false ? 'selected' : '' }>Desahabilitado</option>
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
    let idProducto = (<HTMLInputElement>document.getElementById('id')).value;
    let pac = (<HTMLInputElement>document.getElementById('pac')).value;
    let estado = (<HTMLInputElement>document.getElementById('active')).value;

    this.productService.updateProduct(productId, idProducto, pac, estado).subscribe((result: any) => {
        Swal.fire('Atención','Se actualizó correctamente el producto', 'success')
        this.rerenderProducts()
    }, (err: any) => {
      Swal.fire('Atención',err.message, 'error')
    })
  }

  saveProduct() : any {
    let id = (<HTMLInputElement>document.getElementById('id')).value;
    let pac = (<HTMLInputElement>document.getElementById('pac')).value;

    this.productService.addProduct(id, pac).subscribe((result) => {
        Swal.fire('Atención','Se creó correctamente el producto', 'success')
        this.rerenderProducts()
    }, (err) => {
      Swal.fire('Atención',err.message, 'error')
    });

    this.clearForm();
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe((result: any) => {
      if (result.status === 200) {
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
    (<HTMLInputElement>document.getElementById('id')).value = '';
    (<HTMLInputElement>document.getElementById('pac')).value = '';
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
