import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantsComponent } from './pants.component';

describe('PantsComponent', () => {
  let component: PantsComponent;
  let fixture: ComponentFixture<PantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PantsComponent]
    });
    fixture = TestBed.createComponent(PantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
