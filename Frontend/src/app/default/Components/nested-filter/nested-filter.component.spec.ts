import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedFilterComponent } from './nested-filter.component';

describe('NestedFilterComponent', () => {
  let component: NestedFilterComponent;
  let fixture: ComponentFixture<NestedFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NestedFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
