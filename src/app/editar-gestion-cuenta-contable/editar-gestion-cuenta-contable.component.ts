import { Component, Input } from '@angular/core';

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
  CodigoConcepto: number;
  Concepto: string;
  Prioridad: number;
  TipoOperacion: string;
  Cuenta1: string;
  Cuenta2: string;
  Cuenta3: string;
  Cuenta4: string;
  MovimientoExcepcion1: string;
  MovimientoExcepcion2: string;
  MovimientoExcepcion3: string;
  Aplica_iess: string;
  Aplica_imp_renta: string;
  Empresa_Afecta_Iess: string;
  Mensaje: null;
}

@Component({
  selector: 'app-editar-gestion-cuenta-contable',
  templateUrl: './editar-gestion-cuenta-contable.component.html',
  styleUrls: ['./editar-gestion-cuenta-contable.component.css'],
})
export class EditarGestionCuentaContableComponent {
  @Input() element: any;

  // element = {
  //   CodigoConcepto: 1,
  //   Concepto: '',
  //   Prioridad: 1,
  //   TipoOperacion: '',
  //   Cuenta1: '',
  //   Cuenta2: '',
  //   Cuenta3: '',
  //   Cuenta4: '',
  //   MovimientoExcepcion1: '',
  //   MovimientoExcepcion2: '',
  //   MovimientoExcepcion3: '',
  //   Traba_Aplica_iess: '',
  //   Traba_Proyecto_imp_renta: '',
  //   Aplica_Proy_Renta: '',
  //   Empresa_Afecta_Iess: '',
  //   mensaje: null,
  // };

  categoriasOcupaciones: any;
  tipoOperacion: any;
  codigoTipoCuenta: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { };


  ngOnInit(): void {
    //categoriasOcupaciones
    this.http.get(`${apiUrl}/CategoriaOcupacional`).subscribe((response) => {
      this.categoriasOcupaciones = response;

      console.log('categoriasOcupaciones: ', this.categoriasOcupaciones);
    });
    //tipoOperacion

    this.http.get(`${apiUrl}/tipoOperacion`).subscribe((response) => {
      this.tipoOperacion = response;

      console.log('tipoOperacion: ', this.tipoOperacion);
    });

    this.http.get(`${apiUrl}/TipoCuenta`).subscribe((response) => {
      this.codigoTipoCuenta = response;

      console.log('codigoTipoCuenta: ', this.codigoTipoCuenta);
    });
  }

  async editarMovimientoPlanilla() {
    //Validación de seguridad
    await Swal.fire({
      title: '¡Acción crítica!',
      text: '¿Desea editar la gestión de cuenta contable?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          console.log('element a EditGestionCuentaContable: ', this.element);
          const url = `${apiUrl}/EditGestionCuentaContable?Sucursal=${this.element.Sucursal}&CodigoConceptoNomina=${this.element.CodigoConceptoNomina}&CodigoCategoOcupacional=${this.element.CodigoCategoriaOcupacional}&CodigoOperacion=${this.element.CodigoOperacion}&CodigoCuenta=${this.element.CodigoCuenta}&CodigoTipoCuenta=${this.element.CodigoTipoCuenta}`;

          this.http.get<String>(url).subscribe(async (response) => {
            console.log('La gestión de cuenta contable response: ', response);
            if (
              response == null ||
              response == undefined ||
              response != "Procedure or function TTHH_SP_TRAE_GESTION_CUENTA_CONTABLE_NOMINA_SEARCH has too many arguments specified."
            ) {
              await Swal.fire({
                title: 'Actualización correcta',
                text: '¡La gestión de cuenta contable no se actualizó correctamente!',
                icon: 'error',
                confirmButtonText: 'Aceptar',
              })
              return;
            }else{
              await Swal.fire({
                title: 'Actualización correcta',
                text: 'La gestión de cuenta contable se actualizó correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              })
              //Redirecciona a home
              this.router.navigate([
                '/gestion-cuenta-contable',
                this.route.snapshot.paramMap.get('codigo'),
              ]);
            } 
          });
        } catch (error) {
          console.log('error:', error);
        }
      } else {
        //Si el usuario canceló la edición
        Swal.fire({
          title: 'Acción cancelada',
          text: 'No se editó el movimiento de planilla',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
        });
        return;
      }
    });
  }

  navegarAtras() {
    this.router.navigate(['/listarPlanillas']);
  }
}
