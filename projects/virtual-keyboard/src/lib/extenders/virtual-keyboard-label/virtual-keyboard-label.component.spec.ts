import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualKeyboardLabelComponent } from './virtual-keyboard-label.component';

describe('VirtualKeyboardLabelComponent', () => {
  let component: VirtualKeyboardLabelComponent;
  let fixture: ComponentFixture<VirtualKeyboardLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualKeyboardLabelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VirtualKeyboardLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
