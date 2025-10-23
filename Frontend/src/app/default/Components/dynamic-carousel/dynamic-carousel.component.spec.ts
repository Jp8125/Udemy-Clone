import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCarouselComponent } from './dynamic-carousel.component';

describe('DynamicCarouselComponent', () => {
  let component: DynamicCarouselComponent;
  let fixture: ComponentFixture<DynamicCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
