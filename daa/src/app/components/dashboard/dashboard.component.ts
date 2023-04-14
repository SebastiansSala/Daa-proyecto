import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(public authService: AuthService) {}
  selectedComponent: string = 'reservaciones';
  selectComponent(componentName: string): void {
    this.selectedComponent = componentName;
  }
}
