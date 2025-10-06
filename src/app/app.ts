/**
 * global todo:
 *  - fretboard layout (guitars usually have 24 frets max)
 *    - blip layout
 *    - blip positioning/layout inside fretboard
 *    - add fretboard markers (dots)
 *  - add more scales and make sure current ones are correct
 *  - add tuning options
 *  - add string options (6, 7, or 8, maybe 4 or 5 for ukuleles)
 */


import { Component, signal, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Scale, ScaleRecipes } from './objects/scale';
import { Note } from './objects/note';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('dragon');

}

/**
 * app state
 * 
 * all state variables here have accompanying selectors
 * so they can be selected by user
 */
export class AppState {
  // current scale
  scale = signal(new Scale("Major", ScaleRecipes["Major"], "C"));
  // guitar tuning
  tuning = signal<Note[]>(["E", "A", "D", "G", "B", "E"]);
}

/**
 * Dragon's Lair stores app state
 */
@Injectable({providedIn: 'root'})
export class Lair {
  private appState = new BehaviorSubject<AppState>(new AppState());
  data$ = this.appState.asObservable();
}
