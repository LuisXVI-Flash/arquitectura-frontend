import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SidebarComponent } from "./sidebar.component";
import { ClientsComponent } from './clientes/clients.component';
import { DispositivosComponent } from './dispositivos/dispositivos.component';
import { SolicitGeneralComponent } from './solicit-general/solicit-general.component';
import { SolicitAtendidComponent } from './solicit-atendid/solicit-atendid.component';
import { SolicitNoAtendidComponent } from './solicit-no-atendid/solicit-no-atendid.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from "@angular/common";
import { DataTablesModule } from "angular-datatables";
import { AuthenticationGuard } from "src/app/services/auth/guard/authentication.guard";
import { ModalComponent,SafeHtmlPipe } from "../modal/modal.component";
const routes: Routes = [
    { path: '', component: SidebarComponent, canActivate: [AuthenticationGuard],
    children: [
        { path: 'clientes', component: ClientsComponent},
        { path: 'dispositivos', component: DispositivosComponent},
        { path: 'lista-general', component: SolicitGeneralComponent},
        { path: 'lista-atendidos', component: SolicitAtendidComponent},
        { path: 'lista-no-atendidos', component: SolicitNoAtendidComponent},
        { path: 'usuarios', component: UsuariosComponent},
        { path: '**', component: DashboardComponent },
    ]}
]

@NgModule({
    declarations: [
        SidebarComponent,
        ClientsComponent,
        DispositivosComponent,
        SolicitGeneralComponent,
        SolicitAtendidComponent,
        SolicitNoAtendidComponent,
        UsuariosComponent,
        DashboardComponent,
        ModalComponent,
        SafeHtmlPipe
      ],
      imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DataTablesModule
      ]
    })
export class SidebarModule {}