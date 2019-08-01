import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayshareComponent } from './payshare.component';

describe('PayshareComponent', () => {
  let component: PayshareComponent;
  let fixture: ComponentFixture<PayshareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayshareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayshareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
