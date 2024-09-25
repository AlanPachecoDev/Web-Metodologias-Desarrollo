import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginComponent } from './login/login.component';
import { ListarCComponent } from './listarcc/listarcc.component';
import { EditarCentroCostoComponent } from './editar-centro-costo/editar-centro-costo.component';
import { NuevoCentroCostoComponent } from './nuevo-centro-costo/nuevo-centro-costo.component';
import { HomeComponent } from './home/home.component';
import { ListarPlanillasComponent } from './listar-planillas/listar-planillas.component';
import { AgregarPlanillaComponent } from './agregar-planilla/agregar-planilla.component';
import { EditarPlanillaComponent } from './editar-planilla/editar-planilla.component';
import { ListarTrabajadoresComponent } from './listar-trabajadores/listar-trabajadores.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { MantenimientosComponent } from './mantenimientos/mantenimientos.component';
import { GestionCuentaContableComponent } from './gestion-cuenta-contable/gestion-cuenta-contable.component';

const routes: Routes = [
  // Otras rutas de tu aplicación
  { path: '', component: LoginComponent }, 
  { path: 'login', component: LoginComponent }, // Agrega esta línea para la ruta del LoginComponent
  { path: 'home', component: HomeComponent },
  { path: 'operaciones/:codigo', component: OperacionesComponent},
  { path: 'mantenimientos', component: MantenimientosComponent},
  { path: 'editarCC/:codigo/:nombreCC', component: EditarCentroCostoComponent},
  { path: 'nuevoCC', component: NuevoCentroCostoComponent },
  { path: 'listarcc', component : ListarCComponent},
  { path: 'listarPlanillas', component: ListarPlanillasComponent },
  { path: 'agregarPlanilla', component: AgregarPlanillaComponent },
  { path: 'editarPlanilla/:concepto', component: EditarPlanillaComponent },
  { path: 'listar-trabajadores/:codigo', component: ListarTrabajadoresComponent },
  { path: 'gestion-cuenta-contable/:codigo' , component: GestionCuentaContableComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
