import { ChangeDetectionStrategy, Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-pipes-component',
  templateUrl: './pipes-component.component.html',
  styleUrls: ['./pipes-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipesComponentComponent {
  players = [
    { name: 'Bruno Fernandes', active: true },
    { name: 'Kobbie Mainoo', active: true },
    { name: 'Marcus Rashford', active: false },
  ];

  check() {
    console.log('%c OnPushComponent bị quét!', 'color: cyan');
    return new Date().getSeconds();
  }

  addByPush() {
    this.players.push({ name: 'Alejandro Garnacho', active: true });
    console.warn('Đã Push Garnacho (Reference không đổi)');
  }

  // TRƯỜNG HỢP 2: Tạo mảng mới hoàn toàn
  addBySpread() {
    this.players = [...this.players, { name: 'Rasmus Højlund', active: true }];
    console.warn('Đã Spread Højlund (Reference ĐÃ THAY ĐỔI)');
  }

  dummyClick() {
    // Không làm gì cả, chỉ để kích hoạt Change Detection
  }
}
