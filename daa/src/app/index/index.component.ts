import { Component } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';
import { MatDialog} from '@angular/material/dialog';
import { RegisterComponent } from '../components/register/register.component';
import { AuthService } from '../services/auth.service';
import { InjectionToken } from '@angular/core';

export const INDEX_COMPONENT = new InjectionToken('IndexComponent');

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
      { title: 'Hamburguesa clásica', price: '$180', desc: ' Hamburguesa de carne de res 100% con queso cheddar, lechuga, tomate, cebolla y salsa especial.' },
      { title: 'Hamburguesa con champiñones y queso de cabra', price: '$220', desc: 'Hamburguesa de carne de res 100% con champiñones salteados, queso de cabra y cebolla caramelizada.' },
    ];
    tacos = [
      { title: 'Taco de carne asada', price: '$50', desc: 'Taco de carne asada con cebolla, cilantro y salsa.' },
      { title: 'Taco al pastor', price: '$45', desc: 'Taco al pastor con piña, cebolla y cilantro.' },
      { title: 'Taco vegetariano', price: '$60', desc: 'Taco vegetariano con champiñones, pimiento y salsa.' },
      { title: 'Tacos de pollo', price: '$50', desc: 'Taco de  pollo desmenuzado, lechuga, queso y salsa de tomate.' },
      { title: 'Tacos de pescado', price: '$45', desc: 'Tacos con filete de pescado a la parrilla, repollo rallado, salsa de cilantro y limón. ' },
      { title: 'Tacos de camarones al ajillo', price: '$60', desc: 'Tacos con camarones salteados en ajo y chile, lechuga, tomate y salsa de aguacate.' },
      { title: 'Tacos de barbacoa', price: '$45', desc: 'Tacos con carne de res cocida a fuego lento en una salsa de chiles y especias, cebolla y cilantro. ' },
    ];
    pizzas = [
      { title: 'Pizza margarita', price: '$250', desc: 'Pizza con salsa de tomate, queso mozzarella y albahaca.' },
      { title: 'Pizza pepperoni', price: '$280', desc: 'Pizza con salsa de tomate, queso mozzarella y pepperoni.' },
      { title: 'Pizza vegetariana', price: '$310', desc: 'Pizza con salsa de tomate, queso mozzarella y vegetales.' },
      { title: 'Pizza Hawaiana', price: '$250', desc: 'Pizza con salsa de tomate, jamón, piña y queso mozzarella.' },
      { title: 'Pizza de pollo y pesto', price: '$280', desc: ' Pizza con salsa pesto de albahaca, pollo a la parrilla, tomates cherry y queso mozzarella.' },
      { title: 'Pizza de champiñones y cebolla caramelizada', price: '$300', desc: 'Pizza con champiñones salteados, cebolla caramelizada, queso gouda y queso mozzarella.' },
      { title: 'Pizza de salami y jalapeños', price: '$250', desc: 'Pizza con salami, jalapeños, aceitunas y queso mozzarella.' },
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
