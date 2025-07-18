import { Injectable, inject } from '@angular/core';
import { ISucursal } from '../models/sucursal.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  private _http = inject(HttpClient);
  private urlBase: string = environment.apiUrl + '/sucursales';;

  obtenerSucursales(): Observable<ISucursal[]> {
    return this._http.get<ISucursal[]>(this.urlBase);
  }

  obtenerSucursalPorCodigo(codigo: number): Observable<ISucursal> {
    return this._http.get<ISucursal>(`${this.urlBase}/${codigo}`);
  }

  crearSucursal(sucursal: ISucursal): Observable<ISucursal> {
    return this._http.post<ISucursal>(this.urlBase, sucursal);
  }

  actualizarSucursal(codigo: number, sucursal: ISucursal): Observable<ISucursal> {
    return this._http.put<ISucursal>(`${this.urlBase}/${codigo}`, sucursal);
  }

  eliminarSucursal(codigo: number): Observable<void> {
    return this._http.delete<void>(`${this.urlBase}/${codigo}`);
  }
}