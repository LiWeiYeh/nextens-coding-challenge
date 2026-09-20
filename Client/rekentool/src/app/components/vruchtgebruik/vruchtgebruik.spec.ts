import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { of, throwError } from 'rxjs';

import { Vruchtgebruik } from './vruchtgebruik';
import { VruchtgebruikService } from '../../services/vruchtgebruik.service';
import { VruchtgebruikResponse } from '../../models/vruchtgebruik-response';
import { Geslacht } from '../../models/geslacht';
import { Berekeningsmethode } from '../../models/berekeningsmethode';

describe('Vruchtgebruik', () => {
  let component: Vruchtgebruik;
  let fixture: ComponentFixture<Vruchtgebruik>;

  const vruchtgebruikServiceMock = {
    calculate: vi.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vruchtgebruik],
      providers: [
        {
          provide: VruchtgebruikService,
          useValue: vruchtgebruikServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Vruchtgebruik);
    component = fixture.componentInstance;

    vruchtgebruikServiceMock.calculate.mockReset();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call the API when the form is invalid', () => {
    component.calculate();

    expect(vruchtgebruikServiceMock.calculate).not.toHaveBeenCalled();
  });

  it('should mark the form controls as touched when the form is invalid', () => {
    component.calculate();

    expect(component.form.controls.eigendomswaarde.touched).toBe(true);
    expect(component.form.controls.leeftijd.touched).toBe(true);
    expect(component.form.controls.geslacht.touched).toBe(true);
    expect(component.form.controls.berekeningsmethode.touched).toBe(true);
  });

  it('should call the API with the form values when the form is valid', () => {
    component.form.setValue({
      eigendomswaarde: 100000,
      leeftijd: 35,
      geslacht: Geslacht.Vrouw,
      berekeningsmethode: Berekeningsmethode.EenLeven
    });

    vruchtgebruikServiceMock.calculate.mockReturnValue(
      of({
        eigendomswaarde: 100000,
        factor: 12,
        vruchtgebruikwaarde: 48000
      } satisfies VruchtgebruikResponse)
    );

    component.calculate();

    expect(vruchtgebruikServiceMock.calculate).toHaveBeenCalledWith({
      eigendomswaarde: 100000,
      leeftijd: 35,
      geslacht: Geslacht.Vrouw,
      berekeningsmethode: Berekeningsmethode.EenLeven
    });
  });

  it('should store the result when the API call succeeds', () => {
    const response: VruchtgebruikResponse = {
      eigendomswaarde: 100000,
      factor: 12,
      vruchtgebruikwaarde: 48000
    };

    component.form.setValue({
      eigendomswaarde: 100000,
      leeftijd: 35,
      geslacht: Geslacht.Vrouw,
      berekeningsmethode: Berekeningsmethode.EenLeven
    });

    vruchtgebruikServiceMock.calculate.mockReturnValue(of(response));

    component.calculate();

    expect(component.result()).toEqual(response);
    expect(component.errorMessage()).toBeUndefined();
  });

  it('should show an error message when the API call fails', () => {
    component.form.setValue({
      eigendomswaarde: 100000,
      leeftijd: 35,
      geslacht: Geslacht.Vrouw,
      berekeningsmethode: Berekeningsmethode.EenLeven
    });

    vruchtgebruikServiceMock.calculate.mockReturnValue(
      throwError(() => new Error('API error'))
    );

    component.calculate();

    expect(component.result()).toBeUndefined();
    expect(component.errorMessage()).toBe(
      'Er is iets misgegaan bij het berekenen. Probeer het opnieuw.'
    );
  });
});
