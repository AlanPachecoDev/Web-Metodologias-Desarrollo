import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  guardarDatoEnLocalStorage(codigo: string) {
    localStorage.setItem('codigo', codigo);
  }

  obtenerDatoDelLocalStorage(): string | null{
    return localStorage.getItem('codigo');
  }
}
