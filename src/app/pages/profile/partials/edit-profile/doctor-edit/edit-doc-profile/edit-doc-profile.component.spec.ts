import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocProfileComponent } from './edit-doc-profile.component';

describe('EditDocProfileComponent', () => {
  let component: EditDocProfileComponent;
  let fixture: ComponentFixture<EditDocProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDocProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
