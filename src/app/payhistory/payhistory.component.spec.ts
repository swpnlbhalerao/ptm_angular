import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayhistoryComponent } from './payhistory.component';

describe('PayhistoryComponent', () => {
  let component: PayhistoryComponent;
  let fixture: ComponentFixture<PayhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
