import { Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Scale, ScaleRecipes } from "../objects/scale";
import { Note } from "../objects/note";

/**
 * Dragon's Lair stores app state
 */
@Injectable({providedIn: 'root'})
export class Lair {
  appState = new BehaviorSubject<AppState>(new AppState());
  appState$ = this.appState.asObservable();
}

/**
 * app state
 * 
 * all state variables here have accompanying selectors
 * so they can be selected by user
 */
export class AppState {
  protected readonly title = signal('dragon');
  // current scale
  scale = signal(new Scale("Major", ScaleRecipes["Major"], "C"));
  // guitar tuning
  tuning = signal<Note[]>(["E", "A", "D", "G", "B", "E"]);
  numberOfFrets = signal(24);
  numberOfStrings = signal(6);
  leftOrRightHanded = signal<"left" | "right">("right");
  noteType = signal<"sharp" | "flat">("sharp");
}