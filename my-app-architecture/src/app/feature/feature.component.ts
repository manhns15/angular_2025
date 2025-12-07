import { Component, ViewChild } from '@angular/core';
import { ToggleComponent } from './toggle/toggle.component';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
})
export class FeatureComponent {
  @ViewChild('toggleComp') toggleComp!: ToggleComponent;

  title = 'feature works!';
  username = 'manhns';
  name = 'Nguyen Sy Manh';
  isBtn = true;
  age = 12;

  toggleButton() {
    this.isBtn = !this.isBtn;
  }
  save(username: string) {
    console.log('username:' + username);
  }

  handleSubmit(name: string) {
    return this.toggleComp.addName(name);
  }
}
