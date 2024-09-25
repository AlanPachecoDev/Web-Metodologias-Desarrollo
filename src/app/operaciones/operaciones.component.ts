import { Component } from '@angular/core';

//para hacer llamadas a la api
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
//Para variables de entorno
import { environment } from '../../../environments/environments';
import { ActivatedRoute } from '@angular/router';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';


//URL DE LA API
const apiUrl = environment.API_URL;

interface CentroDeCosto {
  Codigo: string;
  NombreCentroCostos: string;
  // Otros atributos...
}

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css'],
})
export class OperacionesComponent {
  costos: CentroDeCosto[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.http.get<CentroDeCosto[]>(`${apiUrl}/Costos`).subscribe((response) => {
      this.costos = response;
    });
  }

  goToWorkers() {
    let codigo: any;

    codigo = this.route.snapshot.paramMap.get('codigo')
      ? this.route.snapshot.paramMap.get('codigo')
      : '';
    console.log('codigo: ', codigo);
    this.router.navigate(['/listar-trabajadores', codigo]);
  }

  goGCC() {
    let codigo: any;

    codigo = this.route.snapshot.paramMap.get('codigo')
      ? this.route.snapshot.paramMap.get('codigo')
      : '';
    console.log('codigo: ', codigo);
    this.router.navigate(['/gestion-cuenta-contable', codigo]);
  }

  // generarArchivoCSV(): void {
  //   const csvContent = this.convertirDatosACSV(this.costos);
  //   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  //   saveAs(blob, 'datos_costos.xls');
  // }

  
  // convertirDatosACSV(datos: any[]): string {
  //   const encabezados = Object.keys(datos[0]);
  //   const filas = datos.map(dato => encabezados.map(encabezado => dato[encabezado]).join(','));
  //   const contenido = [encabezados.join(','), ...filas].join('\n');
  //   return contenido;
  // }


  generarArchivoCSV(): void {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(this.convertirDatosAXLS(this.costos));
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
    XLSX.writeFile(workbook, 'datos_costos.xls');
  }
  
  convertirDatosAXLS(datos: any[]): any[][] {
    const encabezados = Object.keys(datos[0]);
    const filas = datos.map(dato => encabezados.map(encabezado => dato[encabezado]));
    return [encabezados, ...filas];
  }

  
}
