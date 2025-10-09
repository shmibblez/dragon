import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FretboardComponent } from "../components/fretboard/fretboard";
import { Lair } from './services/lair';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FretboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})


export class App {
  title = 'dragon';
  constructor(readonly lair: Lair) { }
}

