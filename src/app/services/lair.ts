import { Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Scale, ScaleRecipes } from "../objects/scale";
import { Note } from "../objects/note";
import { Tuning, TuningRecipes } from "../objects/tuning";

/**
 * Dragon's Lair stores app state
 */
@Injectable({ providedIn: 'root' })
export class LairService {
  private appState = new BehaviorSubject<Lair>(DEFAULT_LAIR);
  public appState$ = this.appState.asObservable();

  get scale() {
    return this.appState.getValue().scale
  }

  get rootNote() {
    return this.appState.getValue().rootNote
  }

  get tuning() {
    return this.appState.getValue().tuning
  }

  get numberOfFrets() {
    return this.appState.getValue().numberOfFrets
  }

  get numberOfStrings() {
    return this.appState.getValue().numberOfStrings
  }

  get leftOrRightHanded() {
    return this.appState.getValue().leftOrRightHanded
  }

  get noteType() {
    return this.appState.getValue().noteType
  }

  updateTuning(tuning: Tuning) {
    this.appState.next({ ...this.appState.getValue(), tuning })
  }

  updateScale(scale: Scale) {
    this.appState.next({ ...this.appState.getValue(), scale })
  }
}

/**
 * app state
 * 
 * all state variables here have accompanying selectors
 * so they can be selected by user
 */
export interface Lair {
  // current scale
  scale: Scale;
  rootNote: Note;
  // guitar tuning
  tuning: Tuning;
  numberOfFrets: number;
  numberOfStrings: number;
  leftOrRightHanded: "left" | "right";
  noteType: "sharp" | "flat";
}

const DEFAULT_LAIR: Lair = {
  // current scale
  scale: ScaleRecipes.get("Major")!,
  rootNote: "C",
  // guitar tuning
  tuning: TuningRecipes.get("Standard")!,
  numberOfFrets: 24,
  numberOfStrings: 6,
  leftOrRightHanded: "right",
  noteType: "sharp",
}