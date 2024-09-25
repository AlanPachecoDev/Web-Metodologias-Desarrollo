import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageService } from '../local-storage.service';

//para hacer llamadas a la api
import { HttpClient } from '@angular/common/http';

//Para variables de entorno
import { environment } from '../../../environments/environments';
const apiUrl = environment.API_URL;
//Alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  respuestaApi: any;
  emisores: any;
  emisorSeleccionado: any='';  

  constructor(private router: Router, private http: HttpClient, private localStorageService: LocalStorageService) { };

  

  onEmisorSeleccionado() {
    console.log("emisorSeleccionado: ", this.emisorSeleccionado);
    // aquí puedes hacer lo que necesites con el valor seleccionado
    
  }

  ngOnInit(): void {
    this.emisorSeleccionado = null;
    console.log("apiUrl: ", apiUrl);
    this.http.get(`${apiUrl}/Emisores`).subscribe(response => {

      this.emisores = response;

      console.log("Emisores: ", this.emisores);
    });
  }

  async onSubmit() {

    //Si aún no ha seleccionado una sucursal
    if (this.emisorSeleccionado == "" || !this.emisorSeleccionado) {
      Swal.fire({
        title: 'Error',
        text: 'Se debe seleccionar una sucursal',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      })
      return;
    }



    // Lógica para procesar el formulario de login
    // Puedes usar this.username y this.password para acceder a los valores del formulario
    const url = `${apiUrl}?usuario=` + this.username + '&password=' + this.password;

    this.http.get(url).subscribe(async (response) => {

      this.respuestaApi = response;
      // Guardar la respuesta en una variable para su posterior uso
      this.respuestaApi = this.respuestaApi[0];

      //Comparar si las sucursales son iguales
      if (this.emisorSeleccionado.Codigo != this.respuestaApi.COMPANIA) {
        Swal.fire({
          title: 'Error',
          text: '¡Credenciales incorrectas, asegurese que los datos son correctos!',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        })
        return;
      }

      if (this.respuestaApi == null) {
        this.router.navigate(['/login']);
        return;
      }


      if (this.respuestaApi.OBSERVACION == "INGRESO EXITOSO") {
        //Guardamos el dato en el local storage
        console.log("this.emisorSeleccionado.Codigo: ", this.emisorSeleccionado.Codigo);
        this.localStorageService.guardarDatoEnLocalStorage(this.emisorSeleccionado.Codigo);
        this.router.navigate(['/home']);
       
        //this.router.navigate(['/listar-trabajadores', this.emisorSeleccionado.Codigo]);

      }

    });

  }

}