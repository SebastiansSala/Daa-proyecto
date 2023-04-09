import { Component } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';
import { MatDialog} from '@angular/material/dialog';
import { RegisterComponent } from '../components/register/register.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent {
  
  constructor(private dialog: MatDialog, public authService: AuthService){
  }

    hamburguesas = [
      { title: 'Hamburguesa de carne', price: '$200', desc: 'Hamburguesa con carne de res, queso y vegetales.' },
      { title: 'Hamburguesa de pollo', price: '$180', desc: 'Hamburguesa con pollo, queso y vegetales.' },
      { title: 'Hamburguesa vegetariana', price: '$220', desc: 'Hamburguesa vegetariana con falafel, queso y vegetales.' },
      { title: 'Hamburguesa de pollo', price: '$180', desc: 'Hamburguesa con pollo, queso y vegetales.' },
      { title: 'Hamburguesa vegetariana', price: '$220', desc: 'Hamburguesa vegetariana con falafel, queso y vegetales.' },
      { title: 'Hamburguesa de carne', price: '$200', desc: 'Hamburguesa con carne de res, queso y vegetales.' },
    ];
    tacos = [
      { title: 'Taco de carne asada', price: '$50', desc: 'Taco de carne asada con cebolla, cilantro y salsa.' },
      { title: 'Taco al pastor', price: '$45', desc: 'Taco al pastor con piña, cebolla y cilantro.' },
      { title: 'Taco vegetariano', price: '$60', desc: 'Taco vegetariano con champiñones, pimiento y salsa.' },
      { title: 'Taco de carne asada', price: '$50', desc: 'Taco de carne asada con cebolla, cilantro y salsa.' },
      { title: 'Taco al pastor', price: '$45', desc: 'Taco al pastor con piña, cebolla y cilantro.' },
      { title: 'Taco vegetariano', price: '$60', desc: 'Taco vegetariano con champiñones, pimiento y salsa.' },
      { title: 'Taco al pastor', price: '$45', desc: 'Taco al pastor con piña, cebolla y cilantro.' },
      { title: 'Taco vegetariano', price: '$60', desc: 'Taco vegetariano con champiñones, pimiento y salsa.' }
    ];
    pizzas = [
      { title: 'Pizza margarita', price: '$250', desc: 'Pizza con salsa de tomate, queso mozzarella y albahaca.' },
      { title: 'Pizza pepperoni', price: '$280', desc: 'Pizza con salsa de tomate, queso mozzarella y pepperoni.' },
      { title: 'Pizza vegetariana', price: '$300', desc: 'Pizza con salsa de tomate, queso mozzarella y vegetales.' },
      { title: 'Pizza margarita', price: '$250', desc: 'Pizza con salsa de tomate, queso mozzarella y albahaca.' },
      { title: 'Pizza pepperoni', price: '$280', desc: 'Pizza con salsa de tomate, queso mozzarella y pepperoni.' },
      { title: 'Pizza vegetariana', price: '$300', desc: 'Pizza con salsa de tomate, queso mozzarella y vegetales.' },
      { title: 'Pizza margarita', price: '$250', desc: 'Pizza con salsa de tomate, queso mozzarella y albahaca.' },
      { title: 'Pizza pepperoni', price: '$280', desc: 'Pizza con salsa de tomate, queso mozzarella y pepperoni.' },
    ];

  selectedMenu: string = '';

getMenuItems() {
  switch (this.selectedMenu) {
    case 'hamburguesas':
      return this.hamburguesas;
    case 'pizzas':
      return this.pizzas;
    case 'tacos':
      return this.tacos;
    default:
      return this.hamburguesas;
  }
}
  

  hide = true;
  openLoginDialog() {
    this.dialog.open(LoginComponent, {
    });
  }
  openRegisterDialog() {
    this.dialog.open(RegisterComponent, {
    });
  }
}
