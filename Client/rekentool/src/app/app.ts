import { Component, signal } from '@angular/core';
import { Vruchtgebruik } from './components/vruchtgebruik/vruchtgebruik';

@Component({
  imports: [Vruchtgebruik],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App { }
