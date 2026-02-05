import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipesComponentComponent } from './pipes-component.component';

describe('PipesComponentComponent', () => {
  let component: PipesComponentComponent;
  let fixture: ComponentFixture<PipesComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipesComponentComponent]
    });
    fixture = TestBed.createComponent(PipesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
