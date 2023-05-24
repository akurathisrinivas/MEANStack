import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgnaisationsComponent } from './orgnaisations.component';

describe('OrgnaisationsComponent', () => {
  let component: OrgnaisationsComponent;
  let fixture: ComponentFixture<OrgnaisationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgnaisationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgnaisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
