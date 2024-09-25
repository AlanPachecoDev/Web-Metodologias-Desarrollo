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

//CLASE para parsear el resultado de la api
interface Trabajador {
  COMP_Codigo: string,
  Id_Trabajador: string,
  Tipo_trabajador: string,
  Apellido_Paterno: string,
  Apellido_Materno: string,
  Nombres: string,
  Identificacion: string,
  Entidad_Bancaria: string,
  CarnetIESS: string,
  Direccion: string,
  Telefono_Fijo: string,
  Telefono_Movil: string,
  Genero: string,
  Nro_Cuenta_Bancaria: string,
  Codigo_Categoria_Ocupacion: string,
  Ocupacion: string,
  Centro_Costos: string,
  Nivel_Salarial: string,
  EstadoTrabajador: string,
  Tipo_Contrato: string,
  Tipo_Cese: string,
  EstadoCivil: string,
  TipodeComision: string,
  FechaNacimiento: string,
  FechaIngreso: string,
  FechaCese: string,
  PeriododeVacaciones: string,
  FechaReingreso: string,
  Fecha_Ult_Actualizacion: string,
  EsReingreso: string,
  BancoCTA_CTE: string,
  Tipo_Cuenta: string,
  RSV_Indem_Acumul: string,
  Año_Ult_Rsva_Indemni: string,
  Mes_Ult_Rsva_Indemni: string,
}


@Component({
  selector: 'app-listar-trabajadores',
  templateUrl: './listar-trabajadores.component.html',
  styleUrls: ['./listar-trabajadores.component.css']
})

export class ListarTrabajadoresComponent {

  busquedaTrabajador: String = "";
  title = 'Interfaz-Login';

  //Para las columnas de la tabla
  displayedColumns: string[] = ['COMP_Codigo', 'Id_Trabajador', 'Tipo_trabajador', 'Apellido_Paterno', 'Apellido_Materno',
    'Nombres', 'Identificacion', 'Entidad_Bancaria', 'CarnetIESS', 'Direccion', 'Telefono Fijo', 'Telefono Movil', 'Genero', 'Nro_Cuenta_Bancaria', 'Ocupacion', 'FechaIngreso','Tipo_Contrato', 'Editar', 'Borrar'];
  trabajadores: Trabajador[] = [];

  mostrarAgregar: boolean = false;
  mostrarEditar: boolean = false;
  elementToEdit: any;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { };

  //Cuando se inicia la página, lo primero que se hace es cargar los costos
  ngOnInit(): void {
    const url = `${apiUrl}/ListarTrabajadores?sucursal=` + this.route.snapshot.paramMap.get('codigo');
    this.http.get<Trabajador[]>(`${url}`).subscribe(response => {
      this.trabajadores = response;
      console.log("this.trabajadores: ", this.trabajadores);
    });

  }
  
  //Borrar un centro de costos
  async btnBorrar(element: any) {

    //Validación de seguridad
    await Swal.fire({
      title: '¡Acción crítica!',
      text: '¿Desea eliminar el trabajador?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        try {

          //Si el usuario confirmó que quiere borrar el centro de costos

          //Url que lleva el código y el nombre del centro de costos como parámetros
          //const url = `${apiUrl}/DeleteMovimientoPlanilla?codigoMovimiento=${element.CodigoConcepto}&descripcionMovimiento=${element.Concepto}`;
          const url = `${apiUrl}/DeleteTrabajador?sucursal=${element.COMP_Codigo}&codigoEmpleado=${element.Id_Trabajador}`;

          //Se hace la eliminación en la api
          this.http.get<Trabajador[]>(url).subscribe(async (response) => {

            //Si la eliminación fue exitosa
            console.log("response[0]: ", response);
            if (response[0].COMP_Codigo.localeCompare("Eliminación Exitosa") === 0) {

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

  //Para mostrar el agregar o no
  showAdd() {
    this.mostrarAgregar = !this.mostrarAgregar;
  }
  showEdit(element?: any) {
    this.elementToEdit = element;
    console.log("this.elementToEdit: ", this.elementToEdit);
    this.mostrarEditar = !this.mostrarEditar;

  }

  buscar() {
    //Si el nombre está vacío no busca
    if (this.busquedaTrabajador.length < 1) {
      return;
    }

    try {

      //Si hay datos válidos busca en la api
      const url = `${apiUrl}/SearchMovimientoPlanilla?concepto=${this.busquedaTrabajador}`;

      this.http.get<Trabajador[]>(url).subscribe(async (response) => {

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

          this.trabajadores = response;
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
