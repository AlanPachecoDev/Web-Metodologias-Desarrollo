import { Component } from '@angular/core';

import { Router } from '@angular/router';

//para hacer llamadas a la api
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
//Para variables de entorno
import { environment } from '../../../environments/environments';
//Alertas
import Swal from 'sweetalert2'

//URL DE LA API
const apiUrl = environment.API_URL;

import { validarCredenciales } from '../credentialsComponent';


//CLASE para parsear el resultado de la api
interface MovimientoPlanilla {
  CodigoConcepto: number,
  Concepto: string,
  Prioridad: number,
  TipoOperacion: string,
  Cuenta1: string,
  Cuenta2: string,
  Cuenta3: string,
  Cuenta4: string,
  MovimientoExcepcion1: string,
  MovimientoExcepcion2: string,
  MovimientoExcepcion3: string,
  Aplica_iess: string,
  Aplica_imp_renta: string,
  Empresa_Afecta_Iess: string,
  Mensaje: null
}



@Component({
  selector: 'app-listar-planillas',
  templateUrl: './listar-planillas.component.html',
  styleUrls: ['./listar-planillas.component.css']
})


export class ListarPlanillasComponent {


  title = 'Interfaz-Login';

  //Para las columnas de la tabla
  displayedColumns: string[] = ['Codigo', 'Concepto', 'Prioridad', 'TipoOperacion', 'Cuenta1', 'Aplica_iess', 'Aplica_imp_renta', 'Empresa_Afecta_Iess', 'Editar', 'Borrar'];
  planillas: MovimientoPlanilla[] = [];

  busquedaConcepto: String = "";

  mostrarAgregar: boolean = false;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { };

  //Cuando se inicia la página, lo primero que se hace es cargar los costos
  ngOnInit(): void {
    const url = `${apiUrl}/ListarPlanillas`;
    this.http.get<MovimientoPlanilla[]>(`${url}`).subscribe(response => {
      this.planillas = response;
      console.log("this.planillas: ", this.planillas);
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
      text: '¿Desea eliminar el movimiento de planilla?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        try {

          //Si el usuario confirmó que quiere borrar el centro de costos

          //Url que lleva el código y el nombre del centro de costos como parámetros
          const url = `${apiUrl}/DeleteMovimientoPlanilla?codigoMovimiento=${element.CodigoConcepto}&descripcionMovimiento=${element.Concepto}`;

          //Se hace la eliminación en la api
          this.http.get<MovimientoPlanilla[]>(url).subscribe(async (response) => {

            //Si la eliminación fue exitosa
            console.log("response[0]: ", response);
            if (response[0].Concepto.localeCompare("Eliminación Exitosa") === 0) {

              await Swal.fire({
                title: 'Eliminación correcta',
                text: 'El movimiento de planilla se eliminó correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              })
              //Se recarga la página
              location.reload();
            } else {
              //Si la eliminación falló
              Swal.fire({
                title: 'Eliminación fallida',
                text: 'El movimiento de planilla  NO se eliminó correctamente',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              })
            }

          })
        }
        catch (error) {
          console.error("error en home component:", error);
        }
      } else {
        //Si el usuario canceló la eliminación
        Swal.fire({
          title: 'Acción cancelada',
          text: 'No se eliminó el movimiento de planilla',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        })
        return;
      }
    })
  }

  btnEditar(element: any) {
    this.router.navigate(['/editarPlanilla', element.Concepto]);
  }


  buscar() {
    //Si el nombre está vacío no busca
    if (this.busquedaConcepto.length < 1) {
      return;
    }

    try {

      //Si hay datos válidos busca en la api
      const url = `${apiUrl}/SearchMovimientoPlanilla?concepto=${this.busquedaConcepto}`;

      this.http.get<MovimientoPlanilla[]>(url).subscribe(async (response) => {

        if (!response || response == null) {

          await Swal.fire({
            title: 'Búsqueda incorrecta',
            text: 'No se encontró un centro de costos con la descripción proporcionada',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          })

          return;
        }
        if (response.length > 0) {

          this.planillas = response;
        }


      })
    }
    catch (error) {

      console.error("Error en búsqueda en home component:", error);

    }
  }


  navegarAtras() {
    this.router.navigate(['/home']);
  }
}
