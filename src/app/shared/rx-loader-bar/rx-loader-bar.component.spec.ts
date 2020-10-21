import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxLoaderBarComponent } from './rx-loader-bar.component';

describe('RxLoaderBarComponent', () => {
  let component: RxLoaderBarComponent;
  let fixture: ComponentFixture<RxLoaderBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxLoaderBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxLoaderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
