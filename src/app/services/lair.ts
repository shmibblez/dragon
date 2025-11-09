import { Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Scale, ScaleRecipes } from "../objects/scale";
import { Note } from "../objects/note";
import { NumberOfStrings, Tuning, TuningRecipes } from "../objects/tuning";
import { Interval } from "../objects/interval";

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

  get thiccStringLocation() {
    return this.appState.getValue().thiccStringLocation
  }

  get leftOrRightHanded() {
    return this.appState.getValue().leftOrRightHanded
  }

  get noteType() {
    return this.appState.getValue().noteType
  }

  get strings() {
    return Array.from({ length: this.numberOfStrings }, (_, i) => i + 1);
  }

  updateRootNote(root: Note) {
    this.appState.next({ ...this.appState.getValue(), rootNote: root })
  }

  updateTuning(tuning: Tuning) {
    this.appState.next({ ...this.appState.getValue(), tuning: tuning })
  }

  updateScale(scale: Scale) {
    this.appState.next({ ...this.appState.getValue(), scale: scale })
  }

  updateNumberOfStrings(n: NumberOfStrings) {
    this.appState.next({ ...this.appState.getValue(), numberOfStrings: n, tuning: TuningRecipes.get(n)!.get("Standard")! })
  }

  updateLeftOrRightHanded(direction: "left" | "right") {
    this.appState.next({ ...this.appState.getValue(), leftOrRightHanded: direction })
  }

  updateThiccStringLocation(location: "top" | "bottom") {
    this.appState.next({ ...this.appState.getValue(), thiccStringLocation: location })
  }

  toggleCustomScaleInterval(interval: Interval) {
    if (!this.appState.getValue().scale.isCustom) return;
    const scale = this.appState.getValue().scale;
    if (scale.intervals.includes(interval)) {
      this.removeIntervalFromCustomScale(interval);
    } else {
      this.addIntervalToCustomScale(interval);
    }
    console.log("Toggled interval:", interval, "New intervals:", this.appState.getValue().scale.intervals);
  }

  private addIntervalToCustomScale(interval: Interval) {
    if (!this.appState.getValue().scale.isCustom) return;
    const scale = this.appState.getValue().scale;
    if (scale.intervals.includes(interval)) return;
    scale.intervals.push(interval);
    this.appState.next({ ...this.appState.getValue(), scale: scale });
  }

  private removeIntervalFromCustomScale(interval: Interval) {
    if (!this.appState.getValue().scale.isCustom) return;
    let scale = this.appState.getValue().scale;
    if (!scale.intervals.includes(interval)) return;
    scale = new Scale("Custom", scale.intervals.filter(i => i !== interval), true);
    this.appState.next({ ...this.appState.getValue(), scale: scale });
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
  numberOfStrings: NumberOfStrings;
  thiccStringLocation: "top" | "bottom";
  leftOrRightHanded: "left" | "right";
  noteType: "sharp" | "flat";
}

const DEFAULT_LAIR: Lair = {
  // current scale
  scale: ScaleRecipes.get("Major")!,
  rootNote: "C",
  // guitar tuning
  tuning: TuningRecipes.get(6)!.get("Standard")!,
  numberOfFrets: 14,
  numberOfStrings: 6,
  thiccStringLocation: "bottom",
  leftOrRightHanded: "right",
  noteType: "sharp",
}