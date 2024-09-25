import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importar FormsModule


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';

//UI
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ListarCComponent } from './listarcc/listarcc.component';

import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

//Para consumir Apis
import { HttpClientModule } from '@angular/common/http';
import { EditarCentroCostoComponent } from './editar-centro-costo/editar-centro-costo.component';
import { NuevoCentroCostoComponent } from './nuevo-centro-costo/nuevo-centro-costo.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { ListarPlanillasComponent } from './listar-planillas/listar-planillas.component';

import { AgregarPlanillaComponent } from './agregar-planilla/agregar-planilla.component';
//Para hacer los selectde la interfaz
import { MatSelectModule } from '@angular/material/select';
import { EditarPlanillaComponent } from './editar-planilla/editar-planilla.component';

import { ListarTrabajadoresComponent } from './listar-trabajadores/listar-trabajadores.component';
import { AgregarTrabajadorComponent } from './agregar-trabajador/agregar-trabajador.component';
import { EditarTrabajadorComponent } from './editar-trabajador/editar-trabajador.component';
import { MantenimientosComponent } from './mantenimientos/mantenimientos.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { GestionCuentaContableComponent } from './gestion-cuenta-contable/gestion-cuenta-contable.component';
import { AgregarGestionCuentaContableComponent } from './agregar-gestion-cuenta-contable/agregar-gestion-cuenta-contable.component';
import { EditarGestionCuentaContableComponent } from './editar-gestion-cuenta-contable/editar-gestion-cuenta-contable.component';


// Los iconos por defecto de SweetAlert2 son los siguientes: error, warning, success y question

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListarCComponent,
    EditarCentroCostoComponent,
    NuevoCentroCostoComponent,
    NavBarComponent,
    HomeComponent,
    ListarPlanillasComponent,
    AgregarPlanillaComponent,
    EditarPlanillaComponent,
    ListarTrabajadoresComponent,
    AgregarTrabajadorComponent,
    EditarTrabajadorComponent,
    MantenimientosComponent,
    OperacionesComponent,
    GestionCuentaContableComponent,
    AgregarGestionCuentaContableComponent,
    EditarGestionCuentaContableComponent
  ],
  imports: [
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule ,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,

    HttpClientModule ,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  bootstrap: [AppComponent],
  exports: [
    
    ]
})
export class AppModule { }
