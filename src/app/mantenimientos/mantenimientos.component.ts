import { Component } from '@angular/core';

//para hacer llamadas a la api
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
//Para variables de entorno
import { environment } from '../../../environments/environments';

//Alertas
import Swal from 'sweetalert2';

//URL DE LA API
const apiUrl = environment.API_URL;

//Componente flotante
import { NuevoCentroCostoComponent } from '../nuevo-centro-costo/nuevo-centro-costo.component';

//CLASE para parsear el resultado de la api
interface CentroDeCosto {
  Codigo: string;
  NombreCentroCostos: string;
}

@Component({
  selector: 'app-mantenimientos',
  templateUrl: './mantenimientos.component.html',
  styleUrls: ['./mantenimientos.component.css'],
})
export class MantenimientosComponent {
  title = 'Interfaz-Login';

  //Para las columnas de la tabla
  displayedColumns: string[] = [
    'Codigo',
    'NombreCentroCostos',
    'Editar',
    'Borrar',
  ];

  costos: CentroDeCosto[] = [];

  busquedaNombreCC: String = '';

  mostrarAgregar: boolean = false;
  //Resto de tablas:

  //Trabajadores
  emisores: any;
  columnasEmisores: string[] = ['Codigo', 'NombreEmisor', 'Ruc'];


  
  columnasVarias: string[] = ['Codigo', 'Descripcion'];
  tipoTrabajador: any;
  generos: any;
  //"Codigo":"M","Descripcion":"Maculino"
  estadosTrabajador: any;
  //"Codigo":"V","Descripcion":"Vacaciones"
  estadosCiviles: any;
  //"Codigo":"5","Descripcion":"Unión_Libre"
  tiposCese: any;
  //"Codigo":"2","Descripcion":"Reduccion_Personal"
  tiposContrato: any;
  //"Codigo":"7","Descripcion":"De_Aprendizaje"
  tiposComision: any;
  //"Codigo":"Cajero","Descripcion":"C"
  tipoVacaciones: any;
  //"Codigo":"2","Descripcion":"15 días"
  esReingreso: any;
  //"Codigo":"0","Descripcion":"No"
  tiposCuenta: any;
  //"Codigo":"1 ","Descripcion":"Ahorros"
  
  

  constructor(private http: HttpClient, private router: Router) {}

  //Cuando se inicia la página, lo primero que se hace es cargar los costos
  ngOnInit(): void {
    //Centro de costos
    this.http.get<CentroDeCosto[]>(`${apiUrl}/Costos`).subscribe((response) => {
      this.costos = response;
    });

    this.http.get(`${apiUrl}/Emisores`).subscribe((response) => {
      this.emisores = response;

      console.log('Emisores: ', this.emisores);
    });

    this.http.get(`${apiUrl}/TipoTrabajador`).subscribe((response) => {
      this.tipoTrabajador = response;

      console.log('tipoTrabajador: ', this.tipoTrabajador);
    });

    this.http.get(`${apiUrl}/Generos`).subscribe((response) => {
      this.generos = response;

      console.log('generos: ', this.generos);
    });

    this.http.get(`${apiUrl}/EstadoTrabajador`).subscribe((response) => {
      this.estadosTrabajador = response;

      console.log('estadosTrabajador: ', this.estadosTrabajador);
    });

    this.http.get(`${apiUrl}/EstadoCivil`).subscribe((response) => {
      this.estadosCiviles = response;

      console.log('EstadoCivil: ', this.estadosCiviles);
    });

    this.http.get(`${apiUrl}/TipoCese`).subscribe((response) => {
      this.tiposCese = response;

      console.log('tiposCese: ', this.tiposCese);
    });

    this.http.get(`${apiUrl}/TipoContrato`).subscribe((response) => {
      this.tiposContrato = response;

      console.log('tiposContrato: ', this.tiposContrato);
    });

    this.http.get(`${apiUrl}/TipoComision`).subscribe((response) => {
      this.tiposComision = response;

      console.log('TipoComision: ', this.tiposComision);
    });

    this.http.get(`${apiUrl}/TipoVacacion`).subscribe((response) => {
      this.tipoVacaciones = response;

      console.log('tipoVacaciones: ', this.tipoVacaciones);
    });

    this.http.get(`${apiUrl}/EsReingreso`).subscribe((response) => {
      this.esReingreso = response;

      console.log('esReingreso: ', this.esReingreso);
    });

    this.http.get(`${apiUrl}/TipoCuenta`).subscribe((response) => {
      this.tiposCuenta = response;

      console.log('tiposCuenta: ', this.tiposCuenta);
    });
  }

  //Para mostrar el agregar o no
  showAdd() {
    this.mostrarAgregar = !this.mostrarAgregar;
  }

  //Borrar un centro de costos
  async btnBorrar(element: any) {
    //Validación de seguridad
    await Swal.fire({
      title: '¡Acción crítica!',
      text: '¿Desea eliminar el centro de costos?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          //Si el usuario confirmó que quiere borrar el centro de costos

          //Url que lleva el código y el nombre del centro de costos como parámetros
          const url = `${apiUrl}/DeleteCentroDeCosto?codigoCentroCostos=${element.Codigo}&descripcioncentrocostos=${element.NombreCentroCostos}`;

          //Se hace la eliminación en la api
          this.http.get<CentroDeCosto[]>(url).subscribe(async (response) => {
            //Si la eliminación fue exitosa
            if (
              response[0].NombreCentroCostos.localeCompare(
                'Eliminación Exitosa'
              ) === 0
            ) {
              await Swal.fire({
                title: 'Eliminación correcta',
                text: 'El centro de costos se eliminó correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              });
              //Se recarga la página
              location.reload();
            } else {
              //Si la eliminación falló
              Swal.fire({
                title: 'Eliminación fallida',
                text: 'El centro de costos NO se eliminó correctamente',
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
          text: 'No se eliminó el centro de costos',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        });
        return;
      }
    });
  }

  btnEditar(element: any) {
    this.router.navigate([
      '/editarCC',
      element.Codigo,
      element.NombreCentroCostos,
    ]);
  }

  goToNewCC() {
    this.router.navigate(['/nuevoCC']);
  }

  buscar() {
    //Si el nombre está vacío no busca
    if (this.busquedaNombreCC.length < 1) {
      return;
    }

    try {
      //Si hay datos válidos busca en la api
      const url = `${apiUrl}/SearchCentroDeCosto?descripcioncentrocostos=${this.busquedaNombreCC}`;

      this.http.get<CentroDeCosto[]>(url).subscribe(async (response) => {
        if (response == null) {
          await Swal.fire({
            title: 'Búsqueda incorrecta',
            text: 'No se encontró un centro de costos con la descripción proporcionada',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });

          return;
        }
        if (response.length > 0) {
          this.costos = response;
        }
      });
    } catch (error) {
      console.error('Error en búsqueda en home component:', error);
    }
  }

  navegarAtras() {
    this.router.navigate(['/home']);
  }
}
