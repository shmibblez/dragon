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

  get noteNamingConvention() {
    return this.appState.getValue().noteNamingConvention
  }

  get strings() {
    return Array.from({ length: this.numberOfStrings }, (_, i) => i + 1);
  }

  updateRootNote(root: Note) {
    this.appState.next({ ...this.appState.getValue(), rootNote: root })
    document.cookie = `rootNote=${root}; path=/; max-age=31536000;` // 1 year
  }

  updateTuning(tuning: Tuning) {
    this.appState.next({ ...this.appState.getValue(), tuning: tuning })
    document.cookie = `tuningName=${tuning.name}; path=/; max-age=31536000;` // 1 year
  }

  updateScale(scale: Scale) {
    this.appState.next({ ...this.appState.getValue(), scale: scale })
    document.cookie = `scaleName=${scale.name}; path=/; max-age=31536000;` // 1 year
  }

  updateNumberOfStrings(n: NumberOfStrings) {
    this.appState.next({ ...this.appState.getValue(), numberOfStrings: n, tuning: TuningRecipes.get(n)!.get("Standard")! })
    document.cookie = `numberOfStrings=${n}; path=/; max-age=31536000;` // 1 year
  }

  updateLeftOrRightHanded(direction: "left" | "right") {
    this.appState.next({ ...this.appState.getValue(), leftOrRightHanded: direction })
    document.cookie = `leftOrRightHanded=${direction}; path=/; max-age=31536000;` // 1 year
  }

  updateThiccStringLocation(location: "top" | "bottom") {
    this.appState.next({ ...this.appState.getValue(), thiccStringLocation: location })
    document.cookie = `thiccStringLocation=${location}; path=/; max-age=31536000;` // 1 year
  }

  updateNoteNamingConvention(convention: "letters" | "solfège") {
    this.appState.next({ ...this.appState.getValue(), noteNamingConvention: convention })
    document.cookie = `noteNamingConvention=${convention}; path=/; max-age=31536000;` // 1 year
  }

  updateNoteType(type: "sharp" | "flat") {
    this.appState.next({ ...this.appState.getValue(), noteType: type })
    document.cookie = `noteType=${type}; path=/; max-age=31536000;` // 1 year
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
  noteNamingConvention: "letters" | "solfège";
}

const DEFAULT_LAIR: Lair = {
  // current scale
  scale: ScaleRecipes.get("Major")!,
  rootNote: getCookie('rootNote', "C") as Note,
  // guitar tuning
  tuning: getCookieTuning(),
  numberOfFrets: 14,
  numberOfStrings: parseInt(getCookie('numberOfStrings', "6")) as NumberOfStrings,
  thiccStringLocation: getCookie('thiccStringLocation', "bottom") as "top" | "bottom",
  leftOrRightHanded: getCookie('leftOrRightHanded', "right") as "left" | "right",
  noteType: getCookie('noteType', "sharp") as "sharp" | "flat",
  noteNamingConvention: getCookie('noteNamingConvention', "letters") as "letters" | "solfège",
}

function getCookie<T>(name: string, defaultValue: T): T {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1] as T || defaultValue;
}

function getCookieTuning() {
  const tuning = TuningRecipes.get(parseInt(getCookie("numberOfStrings", "6")) as NumberOfStrings)!.get(getCookie('tuningName', "Standard"))!
  return tuning ?? TuningRecipes.get(6)!.get("Standard")!
}