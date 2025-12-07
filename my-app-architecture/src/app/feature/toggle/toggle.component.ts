import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent {
  name: string = '';
  addName(name: string) {
    this.name = name;
    return this.name;
  }
}
