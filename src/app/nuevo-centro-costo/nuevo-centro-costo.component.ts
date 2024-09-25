import { Component } from '@angular/core';

//para hacer llamadas a la api
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//Para variables de entorno
import { environment } from '../../../environments/environments';
const apiUrl = environment.API_URL;
interface CentroDeCosto {
  Codigo: string;
  NombreCentroCostos: string;
  // Otros atributos...
}
//Alertas
import Swal from 'sweetalert2'

@Component({
  selector: 'app-nuevo-centro-costo',
  templateUrl: './nuevo-centro-costo.component.html',
  styleUrls: ['./nuevo-centro-costo.component.css']
})

export class NuevoCentroCostoComponent {
  element = { Codigo: "", NombreCentroCostos: "" };
  constructor(private http: HttpClient, private router: Router) { }

  crearNuevoCC() {
    console.log("element a crear: ", this.element);

    try {

      const url = `${apiUrl}/CreateCentroDeCosto?codigoCentroCostos=${this.element.Codigo}&descripcioncentrocostos=${this.element.NombreCentroCostos}`;

      this.http.get<CentroDeCosto[]>(url).subscribe(async (response) => {



        if (response == null || response == undefined) {
          alert("El centro de costos no se actualizó correctamente");
          return;
        }

        console.log("response: ", response[0]);

        if (response[0].NombreCentroCostos == this.element.NombreCentroCostos) {

          await Swal.fire({
            title: "Confirmación",
            text: "El centro de costos se creó correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
          })
          this.router.navigate(['/listarcc']);

        } else {
          await Swal.fire({
            title: "Confirmación",
            text: "El centro de costos no se creó correctamente",
            icon: "warning",
            confirmButtonText: "Aceptar",
          })

        }

      })


    }
    catch (error) {

      console.log("error:", error);

    }
  }
}
