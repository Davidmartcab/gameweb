import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccuseComponent } from './accuse.component';

describe('AccuseComponent', () => {
  let component: AccuseComponent;
  let fixture: ComponentFixture<AccuseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccuseComponent]
    });
    fixture = TestBed.createComponent(AccuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
