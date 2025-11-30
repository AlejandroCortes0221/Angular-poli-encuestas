import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEncuestaComponent } from './forms-encuesta.component';

describe('FormsEncuestaComponent', () => {
  let component: FormsEncuestaComponent;
  let fixture: ComponentFixture<FormsEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsEncuestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
