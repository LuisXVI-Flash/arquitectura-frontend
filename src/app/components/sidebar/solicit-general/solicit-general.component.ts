import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { SolicitudService } from 'src/app/services/solicitud/solicitud.service';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-solicit-general',
  templateUrl: './solicit-general.component.html',
  styleUrls: ['./solicit-general.component.css']
})
export class SolicitGeneralComponent implements OnInit {

  @ViewChild('modalRegistro')
  modalComponent!: ModalComponent;
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>()
  solicitudList: any
  showModal: boolean = false;
  constructor(
    private solicitudService: SolicitudService,
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
    this.getSolicitudes()
  }

  ngAfterViewInit(): void {
    this.modalService.register(this.modalComponent)
  }

  getSolicitudes() {
    this.solicitudService.getAttended().subscribe((response: any) => {
        this.solicitudList = response.result
        this.dtTrigger.next(response.result)
    }, (err: any) => {

    })
  }

}