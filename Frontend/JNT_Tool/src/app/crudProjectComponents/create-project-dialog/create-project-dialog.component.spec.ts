import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectDialogComponent } from './create-project-dialog.component';

describe('CreateProjectDialogComponent', () => {
  let component: CreateProjectDialogComponent;
  let fixture: ComponentFixture<CreateProjectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProjectDialogComponent]
    });
    fixture = TestBed.createComponent(CreateProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
