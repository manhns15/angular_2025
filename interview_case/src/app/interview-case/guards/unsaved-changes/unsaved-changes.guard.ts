import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

// Interface mà component cần implement
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('🔍 UnsavedChangesGuard: Kiểm tra thay đổi chưa lưu');
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
