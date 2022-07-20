import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { DataTablesModule } from 'angular-datatables';
import { Authenticationinterceptor } from './services/auth/authenticationconfig.interceptor';
import { SolicitudProductoComponent } from './components/solicitud-producto/solicitud-producto.component';
import { SolicitudClienteComponent } from './components/solicitud-cliente/solicitud-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SolicitudProductoComponent,
    SolicitudClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: Authenticationinterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
