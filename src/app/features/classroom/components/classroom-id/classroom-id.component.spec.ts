import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClassroomIdComponent} from './classroom-id.component';

describe('ClassroomIdComponent', () => {
  let component: ClassroomIdComponent;
  let fixture: ComponentFixture<ClassroomIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassroomIdComponent],
    });
    fixture = TestBed.createComponent(ClassroomIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
