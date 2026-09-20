import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { VruchtgebruikService } from '../../services/vruchtgebruik.service';
import { Geslacht } from '../../models/geslacht';
import { Berekeningsmethode, BerekeningsmethodeLabels } from '../../models/berekeningsmethode';
import { VruchtgebruikResponse } from '../../models/vruchtgebruik-response';
import { CurrencyPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-vruchtgebruik',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CurrencyPipe,
    MatProgressSpinnerModule
  ],
  templateUrl: './vruchtgebruik.html',
  styleUrl: './vruchtgebruik.scss',
})
export class Vruchtgebruik {
  private readonly formBuilder = inject(FormBuilder);
  private readonly vruchtgebruikService = inject(VruchtgebruikService);
  readonly berekeningsmethodes = Object.values(Berekeningsmethode);
  readonly berekeningsmethodeLabels = BerekeningsmethodeLabels;

  errorMessage = signal<string | undefined>(undefined);
  result = signal<VruchtgebruikResponse | undefined>(undefined);
  isLoading = signal(false);

  readonly geslachten = Object.values(Geslacht);

  readonly form = this.formBuilder.nonNullable.group({
    eigendomswaarde: [0, [Validators.required, Validators.min(0.01)]],
    leeftijd: [0, [Validators.required, Validators.min(0)]],
    geslacht: ['', Validators.required],
    berekeningsmethode: ['', Validators.required],
  });


  calculate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(undefined);
    this.result.set(undefined);

    this.vruchtgebruikService.calculate(this.form.getRawValue()).subscribe({
      next: (response: VruchtgebruikResponse) => {
        this.result.set(response);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Er is iets misgegaan bij het berekenen. Probeer het opnieuw.');
        this.isLoading.set(false);
      }
    });
  }
}
