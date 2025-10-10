import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FretboardComponent } from "../components/fretboard/fretboard";
import { Lair } from './services/lair';
import { OptionsComponent } from '../components/options/options';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FretboardComponent, OptionsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})


export class App {
  title = 'dragon';
  constructor(readonly lair: Lair) { }
}

