import { Component } from '@angular/core';
import { Input } from '@angular/core';

import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  emisorSeleccionado: any;

  codigo: string | null;

  constructor(private localStorageService: LocalStorageService) {
    this.codigo = this.localStorageService.obtenerDatoDelLocalStorage() || '';
  }


}
