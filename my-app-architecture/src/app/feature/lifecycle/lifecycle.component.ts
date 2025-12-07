import {
  Component,
  Input,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  templateUrl: './lifecycle.component.html',
  styleUrls: ['./lifecycle.component.scss'],
})
export class LifecycleComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() message: string = '';

  constructor() {
    console.log('🔥 Constructor');
  }

  ngOnChanges() {
    console.log('🔄 ngOnChanges - @Input() thay đổi');
  }

  ngOnInit() {
    console.log('🚀 ngOnInit - Component khởi tạo');
  }

  ngDoCheck() {
    console.log('🔍 ngDoCheck - Kiểm tra dữ liệu thủ công');
  }

  ngAfterContentInit() {
    console.log('📌 ngAfterContentInit - Content Projection xong');
  }

  ngAfterContentChecked() {
    console.log('✅ ngAfterContentChecked - Content cập nhật');
  }

  ngAfterViewInit() {
    console.log('🎨 ngAfterViewInit - View đã render');
  }

  ngAfterViewChecked() {
    console.log('🔎 ngAfterViewChecked - View cập nhật');
  }

  ngOnDestroy() {
    console.log('❌ ngOnDestroy - Component bị hủy');
  }
}
