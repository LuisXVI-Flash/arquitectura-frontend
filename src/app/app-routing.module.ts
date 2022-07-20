import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { SolicitudProductoComponent } from "./components/solicitud-producto/solicitud-producto.component";

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', loadChildren: () => import("./components/sidebar/sidebar.module").then(m => m.SidebarModule)},
    { path: 'solicitudes', component: SolicitudProductoComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}