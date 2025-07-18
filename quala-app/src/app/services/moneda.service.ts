import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMoneda } from '../models/moneda.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  private _http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/monedas';

  obtenerMonedas(): Observable<IMoneda[]> {
    return this._http.get<IMoneda[]>(this.baseUrl);
  }
}
