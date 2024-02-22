import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AssignementDetailsComponent} from './assignement-details.component';

describe('AssignementDetailsComponent', () => {
  let component: AssignementDetailsComponent;
  let fixture: ComponentFixture<AssignementDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignementDetailsComponent],
    });
    fixture = TestBed.createComponent(AssignementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
