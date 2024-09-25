import { Component } from '@angular/core';

import { Router } from '@angular/router';

//para hacer llamadas a la api
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
//Para variables de entorno
import { environment } from '../../../environments/environments';
//Alertas
import Swal from 'sweetalert2';

//URL DE LA API
const apiUrl = environment.API_URL;

import { validarCredenciales } from '../credentialsComponent';

interface GestionCC {
  Sucursal: number;
  CodigoConceptoNomina: number;
  CodigoCategoriaocupacional: number;
  DescripcionConcepto: string;
  CodigoOperacion: string;
  CodigoCuentaContable: number;
  CodigoTipoCuenta: string;
  DescripcionCuenta: string;
  Mensaje: null;
}
//{"":"1","":"Sueldos Autoridades y Directiv","Mensaje":null}

@Component({
  selector: 'app-gestion-cuenta-contable',
  templateUrl: './gestion-cuenta-contable.component.html',
  styleUrls: ['./gestion-cuenta-contable.component.css'],
})
export class GestionCuentaContableComponent {
  title = 'Interfaz-Login';

  //Para las columnas de la tabla
  displayedColumns: string[] = [
    'CodigoConceptoNomina',
    'DescripcionConcepto',
    'CodigoCategoriaocupacional',
    'DescripcionConcepto',
    'CodigoOperacion',
    'CodigoCuentaContable',
    'CodigoTipoCuenta',
    'DescripcionCuenta',
    'Editar',
    'Borrar',
  ];
  gcs: GestionCC[] = [];

  busquedaConcepto: String = '';

  mostrarAgregar: boolean = false;
  mostrarEditar: boolean = false;
  elementToEdit: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  //Cuando se inicia la página, lo primero que se hace es cargar los costos
  ngOnInit(): void {
    const url =
      `${apiUrl}/GestionCuentaContable?sucursal=` +
      this.route.snapshot.paramMap.get('codigo');
    this.http.get<GestionCC[]>(`${url}`).subscribe((response) => {
      this.gcs = response;
      console.log('this.gcs: ', this.gcs);
    });
  }

  //Para mostrar el agregar o no
  showAdd() {
    this.mostrarAgregar = !this.mostrarAgregar;
  }

  showEditar(element?: any) {
    this.elementToEdit = element;

    this.mostrarEditar = !this.mostrarEditar;
  }

  //Borrar un centro de costos
  async btnBorrar(element: any) {
    console.log('element gcc: ', element);
    //Validación de seguridad
    await Swal.fire({
      title: '¡Acción crítica!',
      text: '¿Desea eliminar la gestión de cuenta contable?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          //Si el usuario confirmó que quiere borrar el centro de costos

          //Url que lleva el código y el nombre del centro de costos como parámetros
          const url = `${apiUrl}/DeleteGestionCuentaContable?Sucursal=${element.Sucursal}&CodigoConceptoNomina=${element.CodigoConceptoNomina}&CodigoCategoOcupacional=${element.CodigoCategoriaocupacional}&CodigoOperacion=${element.CodigoOperacion}&CodigoCuenta=${element.CodigoCuentaContable}&CodigoTipoCuenta=${element.CodigoTipoCuenta}`;

          //Se hace la eliminación en la api
          this.http.get<String>(url).subscribe(async (response) => {
            //Si la eliminación fue exitosa
            console.log('response: ', response);
            //[0].Concepto.localeCompare("Eliminación Exitosa") === 0
            if (
              response == 'Eliminación Exitosa' ||
              response == 'Error converting data type numeric to numeric.'
            ) {
              await Swal.fire({
                title: 'Eliminación correcta',
                text: 'El movimiento de la gestión de cuenta contable',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              });
              //Se recarga la página
              location.reload();
            } else {
              //Si la eliminación falló
              Swal.fire({
                title: 'Eliminación fallida',
                text: 'La gestión de cuenta contable NO se eliminó correctamente',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              });
            }
          });
        } catch (error) {
          console.error('error en home component:', error);
        }
      } else {
        //Si el usuario canceló la eliminación
        Swal.fire({
          title: 'Acción cancelada',
          text: 'No se eliminó la gestión de cuenta contable',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        });
        return;
      }
    });
  }

  buscar() {
    this.gcs =  this.gcs.filter((element) => {
      return element.DescripcionConcepto.includes(this.busquedaConcepto.toString());
    });
  }

  navegarAtras() {
    this.router.navigate(['/home']);
  }
}
