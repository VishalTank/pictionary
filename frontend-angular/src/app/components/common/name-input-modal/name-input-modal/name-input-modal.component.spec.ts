import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameInputModalComponent } from './name-input-modal.component';

describe('NameInputModalComponent', () => {
  let component: NameInputModalComponent;
  let fixture: ComponentFixture<NameInputModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameInputModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameInputModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
