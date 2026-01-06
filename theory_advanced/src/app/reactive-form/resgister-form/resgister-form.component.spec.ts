import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgisterFormComponent } from './resgister-form.component';

describe('ResgisterFormComponent', () => {
  let component: ResgisterFormComponent;
  let fixture: ComponentFixture<ResgisterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResgisterFormComponent]
    });
    fixture = TestBed.createComponent(ResgisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
