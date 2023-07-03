import { Component } from '@angular/core';

@Component({
  // Decorator
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Patient App';
  name: string = 'Manish'; // property
}
