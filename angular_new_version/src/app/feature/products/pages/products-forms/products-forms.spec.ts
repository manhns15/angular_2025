import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsForms } from './products-forms';

describe('ProductsForms', () => {
  let component: ProductsForms;
  let fixture: ComponentFixture<ProductsForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsForms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
