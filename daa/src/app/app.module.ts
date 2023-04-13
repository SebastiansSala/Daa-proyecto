import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AddComponent } from './components/reservation/add/add/add.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UploadComponent } from './components/dashboard/reservaciones/upload/upload.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { INDEX_COMPONENT } from './index/index.component';
import { ReservacionesComponent } from './components/dashboard/reservaciones/reservaciones/reservaciones.component';
import { UsuariosComponent } from './components/dashboard/usuarios/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    UploadComponent,
    AddComponent,
    ReservationComponent,
    ReservacionesComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    {provide: INDEX_COMPONENT, useClass: IndexComponent},
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
