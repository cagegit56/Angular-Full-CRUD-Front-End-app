import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JewelleryComponent } from './jewellery.component';

describe('JewelleryComponent', () => {
  let component: JewelleryComponent;
  let fixture: ComponentFixture<JewelleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JewelleryComponent]
    });
    fixture = TestBed.createComponent(JewelleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
