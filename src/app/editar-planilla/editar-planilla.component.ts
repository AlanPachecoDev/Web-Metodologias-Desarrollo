import { Component } from '@angular/core';

//para hacer llamadas a la api
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
//Para variables de entorno
import { environment } from '../../../environments/environments';

//Alertas
import Swal from 'sweetalert2';

const apiUrl = environment.API_URL;
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
  selector: 'app-editar-planilla',
  templateUrl: './editar-planilla.component.html',
  styleUrls: ['./editar-planilla.component.css']
})
export class EditarPlanillaComponent {
  element = {
    CodigoConcepto: 1,
    Concepto: "",
    Prioridad: 1,
    TipoOperacion: "",
    Cuenta1: "",
    Cuenta2: "",
    Cuenta3: "",
    Cuenta4: "",
    MovimientoExcepcion1: "",
    MovimientoExcepcion2: "",
    MovimientoExcepcion3: "",
    Traba_Aplica_iess: "",
    Traba_Proyecto_imp_renta: "",
    Aplica_Proy_Renta: "",
    Empresa_Afecta_Iess: "",
    mensaje: null
  };


  CodigoConcepto: any;
  tiposOperaciones: any;
  movimientosExcepcion12: any;
  movimientosExcepcion3: any;
  opcionesTraba_Aplica_iess: any;
  opcionesTrabAfecImpuestoRenta: any;
  constructor(private http: HttpClient, private router: ActivatedRoute, private route: Router) { }

  actualizarValor(type: string, content: string) {
    if (type.localeCompare("TipoOperacion") === 0) {
      this.element.TipoOperacion = content;
    }
    if (type.localeCompare("MovimientoExcepcion1") === 0) {
      this.element.MovimientoExcepcion1 = content;
    }
    if (type.localeCompare("MovimientoExcepcion2") === 0) {
      this.element.MovimientoExcepcion2 = content;
    }
    if (type.localeCompare("MovimientoExcepcion3") === 0) {
      this.element.MovimientoExcepcion3 = content;
    }
    if (type.localeCompare("Traba_Aplica_iess") === 0) {
      this.element.Traba_Aplica_iess = content;
    }
    if (type.localeCompare("Traba_Proyecto_imp_renta") === 0) {
      this.element.Traba_Proyecto_imp_renta = content;
    }
    if (type.localeCompare("Aplica_Proy_Renta") === 0) {
      this.element.Aplica_Proy_Renta = content;
    }
    if (type.localeCompare("Empresa_Afecta_Iess") === 0) {
      this.element.Empresa_Afecta_Iess = content;
    }
  }

  ngOnInit(): void {
    //Recuperar objeto a mofificar
    let concepto: any;

    concepto = this.router.snapshot.paramMap.get('concepto') ? this.router.snapshot.paramMap.get('concepto') : "";
    this.buscar(concepto);
    //Recuperamos movimiento plantilla a editar

    this.http.get(`${apiUrl}/TipoOperacion`).subscribe(response => {

      this.tiposOperaciones = response;
    });

    this.http.get(`${apiUrl}/MovimientosExcepcion12`).subscribe(response => {

      this.movimientosExcepcion12 = response;
    });

    this.http.get(`${apiUrl}/MovimientosExcepcion3`).subscribe(response => {

      this.movimientosExcepcion3 = response;
    });

    this.http.get(`${apiUrl}/TrabaAfectaIESS`).subscribe(response => {

      this.opcionesTraba_Aplica_iess = response;

    });

    this.http.get(`${apiUrl}/TrabAfecImpuestoRenta`).subscribe(response => {

      this.opcionesTrabAfecImpuestoRenta = response;
    });
  }

  async editarMovimientoPlanilla() {
    //Validación de seguridad
    await Swal.fire({
      title: '¡Acción crítica!',
      text: '¿Desea editar el movimiento de planilla?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        try {

          //Configura los valores
          if (this.element.TipoOperacion.localeCompare("Ingresos") === 0) {
            this.element.TipoOperacion = "I";
          } else {
            this.element.TipoOperacion = "E";
          }


          if (this.element.MovimientoExcepcion1.localeCompare("Horas Movimiento Planilla") === 0) {
            this.element.MovimientoExcepcion1 = "H";
          } else if (this.element.MovimientoExcepcion1.localeCompare("Movimiento Planilla") === 0) {
            this.element.MovimientoExcepcion1 = "M";
          } else {
            this.element.MovimientoExcepcion1 = "C";
          }

          if (this.element.MovimientoExcepcion2.localeCompare("Horas Movimiento Planilla") === 0) {
            this.element.MovimientoExcepcion2 = "H";
          } else if (this.element.MovimientoExcepcion2.localeCompare("Movimiento Planilla") === 0) {
            this.element.MovimientoExcepcion2 = "M";
          } else {
            this.element.MovimientoExcepcion2 = "C";
          }

          if (this.element.MovimientoExcepcion3.localeCompare("Sierra") === 0) {
            this.element.MovimientoExcepcion3 = "S";
          } else if (this.element.MovimientoExcepcion3.localeCompare("Costa") === 0) {
            this.element.MovimientoExcepcion3 = "C";
          } else if (this.element.MovimientoExcepcion3.localeCompare("No Aplica") === 0) {
            this.element.MovimientoExcepcion3 = "N";
          } else {
            this.element.MovimientoExcepcion3 = "X";
          }

          if (this.element.Traba_Aplica_iess.localeCompare("Si") === 0) {
            this.element.Traba_Aplica_iess = "1";
          } else {
            this.element.Traba_Aplica_iess = "0";
          }
          if (this.element.Traba_Proyecto_imp_renta.localeCompare("Aplica") === 0) {
            this.element.Traba_Proyecto_imp_renta = "1";
          } else {
            this.element.Traba_Proyecto_imp_renta = "0";
          }

          if (this.element.Aplica_Proy_Renta.localeCompare("Si") === 0) {
            this.element.Aplica_Proy_Renta = "1";
          } else {
            this.element.Aplica_Proy_Renta = "0";
          }

          if (this.element.Empresa_Afecta_Iess.localeCompare("Si") === 0) {
            this.element.Empresa_Afecta_Iess = "1";
          } else {
            this.element.Empresa_Afecta_Iess = "0";
          }
          const url = `${apiUrl}/UpdateMovimientoPlanilla?codigo=${this.element.CodigoConcepto}&concepto=${this.element.Concepto}&prioridad=${this.element.Prioridad}&tipoOperacion=${this.element.TipoOperacion}&c1=${this.element.Cuenta1}&c2=${this.element.Cuenta2}&c3=${this.element.Cuenta3}&c4=${this.element.Cuenta4}&me1=${this.element.MovimientoExcepcion1}`;
          const url2 = `&me2=${this.element.MovimientoExcepcion2}&me3=${this.element.MovimientoExcepcion3}&Traba_Aplica_iess=${this.element.Traba_Aplica_iess}&Traba_Proyecto_imp_renta=${this.element.Traba_Proyecto_imp_renta}&Aplica_Proy_Renta=${this.element.Aplica_Proy_Renta}&Empresa_Afecta_Iess=${this.element.Empresa_Afecta_Iess}`;

          this.http.get<MovimientoPlanilla[]>(url + url2).subscribe(async (response) => {
            if (response == null || response == undefined) {
              Swal.fire({
                title: 'Error',
                text: '¡El movimiento de plantilla no se actualizó correctamente!',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              })
              return;
            }

            if (response[0].Concepto == this.element.Concepto) {

              Swal.fire({
                title: 'Éxito',
                text: '¡El movimiento de plantilla se actualizó correctamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              })
              //Redirecciona a home
              this.route.navigate(['/listarPlanillas']);

            } else {
              Swal.fire({
                title: 'Error',
                text: '¡El movimiento de plantilla no se actualizó correctamente!',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              })
              return;
            }

          })
        }
        catch (error) {

          console.log("error:", error);

        }
      }else {
        //Si el usuario canceló la edición
        Swal.fire({
          title: 'Acción cancelada',
          text: 'No se editó el movimiento de planilla',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        })
        return;
      }
    }
    );


  }

  buscar(concepto: String) {
    //Si el nombre está vacío no busca
    if (concepto.length < 1) {
      return;
    }
    try {
      //Si hay datos válidos busca en la api
      const url = `${apiUrl}/SearchMovimientoPlanilla?concepto=${concepto}`;

      this.http.get<MovimientoPlanilla[]>(url).subscribe(async (response) => {

        if (!response || response == null) {

          await Swal.fire({
            title: 'Búsqueda incorrecta',
            text: 'No se encontró un centro de costos con la descripción proporcionada',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          })
          this.route.navigate(['/listarPlanillas']);
          return;
        }
        if (response.length > 0) {
          //this.router.navigate(['/editarPlanilla', element.Concepto]);
          this.CodigoConcepto = response[0].CodigoConcepto;
          this.element.CodigoConcepto = response[0].CodigoConcepto,
            this.element.Concepto = response[0].Concepto;
          this.element.Prioridad = response[0].Prioridad;

          if (response[0].TipoOperacion.localeCompare("E") === 0) {
            this.element.TipoOperacion = "Egresos";
          } else {
            this.element.TipoOperacion = "Ingresos";
          }

          this.element.Cuenta1 = response[0].Cuenta1;
          this.element.Cuenta2 = response[0].Cuenta2;
          this.element.Cuenta3 = response[0].Cuenta3;
          this.element.Cuenta4 = response[0].Cuenta4;

          if (response[0].MovimientoExcepcion1.localeCompare("H") === 0) {
            this.element.MovimientoExcepcion1 = "Horas Movimiento Planilla";
          } else if (response[0].MovimientoExcepcion1.localeCompare("M") === 0) {
            this.element.MovimientoExcepcion1 = "Movimiento Planilla";
          } else {
            this.element.MovimientoExcepcion1 = "Cuenta Corriente";
          }

          if (response[0].MovimientoExcepcion2.localeCompare("H") === 0) {
            this.element.MovimientoExcepcion2 = "Horas Movimiento Planilla";
          } else if (response[0].MovimientoExcepcion2.localeCompare("M") === 0) {
            this.element.MovimientoExcepcion2 = "Movimiento Planilla";
          } else {
            this.element.MovimientoExcepcion2 = "Cuenta Corriente";
          }
          this.element.MovimientoExcepcion3 = response[0].MovimientoExcepcion3;
          if (response[0].MovimientoExcepcion3.localeCompare("No procesar") === 0) {
            this.element.MovimientoExcepcion3 = "No Procesar";
          }

          if (response[0].Aplica_iess.localeCompare("Si Aplica") === 0) {
            this.element.Traba_Aplica_iess = "Si";
          } else {
            this.element.Traba_Aplica_iess = "No";
          }

          if (response[0].Aplica_imp_renta.localeCompare("No Aplica") === 0) {
            this.element.Aplica_Proy_Renta = "No";
          } else {
            this.element.Aplica_Proy_Renta = "Si";
          }

          if (response[0].Empresa_Afecta_Iess.localeCompare("Si Aplica") === 0) {
            this.element.Empresa_Afecta_Iess = "Si";
          } else {
            this.element.Empresa_Afecta_Iess = "No";
          }

          this.element.mensaje = response[0].Mensaje;
        }


      })
    }
    catch (error) {

      console.error("Error en búsqueda en editar movimiento de planilla:", error);

    }
  }

  navegarAtras() {
    this.route.navigate(['/listarPlanillas']);
  }
}
