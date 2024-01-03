import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateButtonComponent } from './update-button.component';

describe('UpdateButtonComponent', () => {
  let component: UpdateButtonComponent;
  let fixture: ComponentFixture<UpdateButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateButtonComponent]
    });
    fixture = TestBed.createComponent(UpdateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
