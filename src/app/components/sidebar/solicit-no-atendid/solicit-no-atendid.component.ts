import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SolicitudService } from 'src/app/services/solicitud/solicitud.service';
import Swal from 'sweetalert2';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-solicit-no-atendid',
  templateUrl: './solicit-no-atendid.component.html',
  styleUrls: ['./solicit-no-atendid.component.css']
})
export class SolicitNoAtendidComponent implements OnInit {

  @ViewChild('modalRegistro')
  modalComponent!: ModalComponent;
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>()
  solicitudList: any
  showModal: boolean = false;
  constructor(private solicitudService: SolicitudService, private modalService: ModalService) { }

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
    this.getSolicitudes()
  }

  getSolicitudes() {
    this.solicitudService.getUnattended().subscribe((response: any) => {
        this.solicitudList = response.result
        this.dtTrigger.next(response.result)
    }, (err: any) => {

    })
  }

  showActivar(product: any): void {
    this.modalService.show('Advertencia', this.getActivateForm(), true)
      .then(() => { this.activateProduct(product) })
      .catch((err) => { console.log(err) });
  }

  getActivateForm() {
    return `
            <p>
                ¿Seguro de marcar esta solicitud como atendida? Esta acción no se puede deshacer
            </p>
          `;
  }

  activateProduct(product: any) {
    this.solicitudService.activateProduct(product).subscribe((result: any) => {
      console.log("a",product)
      if (result.status === 200) {
        Swal.fire('Atención','Se eliminó correctamente el producto', 'success')
        this.rerenderSolicitudes()
      } else {
        Swal.fire('Atención',result.message, 'warning')
      }
    }, (err: any) => {
      Swal.fire('Atención',err.message, 'error')
    })
  }

  rerenderSolicitudes() {
    this.solicitudService.getUnattended().subscribe((response: any) => {
        this.solicitudList = response.result
        this.rerender()
    }, (err: any) => {
    })
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.getSolicitudes()
    });
  }

  ngAfterViewInit(): void {
    this.modalService.register(this.modalComponent)
  }
}