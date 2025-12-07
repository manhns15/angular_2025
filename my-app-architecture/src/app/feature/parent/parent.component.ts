import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
})
export class ParentComponent {
  parentName: string = '';
  num: number = 0;
  items = ['item1', 'item2', 'item3'];

  addItem(newItem: string) {
    this.items.push(newItem);
  }
}
