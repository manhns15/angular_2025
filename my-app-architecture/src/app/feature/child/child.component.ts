import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  private _count = 0;
  @Input() childName: string = '';

  @Input()
  set count(value: number) {
    this._count = value;
    this.doubleCount = this._count * 2;
  }
  get count(): number {
    return this._count;
  }
  doubleCount: number = 0;

  @Output() newValue = new EventEmitter<string>();
  addNewItem(value: string) {
    this.newValue.emit(value);
  }
}
