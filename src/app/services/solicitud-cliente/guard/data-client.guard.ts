import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SolicitudClienteService } from '../solicitud-cliente.service';

@Injectable({
  providedIn: 'root'
})
export class DataClientGuard implements CanActivate {
  constructor(
    public authService: SolicitudClienteService,
    public router: Router
) { }

canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLogged) {
        this.router.navigate(['/'])
        return false
    }

    return true
}
}