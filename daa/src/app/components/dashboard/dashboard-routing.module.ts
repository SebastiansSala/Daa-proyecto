import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { ReservacionesComponent } from "./reservaciones/reservaciones/reservaciones.component";
import { UsuariosComponent } from "./usuarios/usuarios/usuarios.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {path: '', pathMatch: 'full', component: DashboardComponent},
    {path: 'reservaciones', component: ReservacionesComponent},
    {path: 'usuarios', component: UsuariosComponent}
]

@NgModule({
    imports: [
        CommonModule, RouterModule.forChild(routes)],
        exports: [RouterModule],
})

export class DashboardRoutingModule {}