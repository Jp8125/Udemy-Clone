import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletecheckoutComponent } from './completecheckout.component';

describe('CompletecheckoutComponent', () => {
  let component: CompletecheckoutComponent;
  let fixture: ComponentFixture<CompletecheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletecheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletecheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
