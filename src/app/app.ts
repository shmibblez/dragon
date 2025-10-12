import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FretboardComponent } from "../components/fretboard/fretboard";
import { LairService } from './services/lair';
import { PrefsComponent } from '../components/prefs/prefs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FretboardComponent, PrefsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})


export class App {
  title = 'dragon';
  constructor(readonly lair: LairService) { }
}

