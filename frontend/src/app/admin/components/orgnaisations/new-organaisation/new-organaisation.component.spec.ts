import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrganaisationComponent } from './new-organaisation.component';

describe('NewOrganaisationComponent', () => {
  let component: NewOrganaisationComponent;
  let fixture: ComponentFixture<NewOrganaisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOrganaisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrganaisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
