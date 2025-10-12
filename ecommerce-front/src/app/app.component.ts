import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './commons/components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterOutlet, ToastComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce-front';
}
