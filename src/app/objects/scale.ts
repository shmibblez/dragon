import { Interval, IntervalToSemitones } from "./interval";
import { allNotesWithSharps, Note } from "./note";

/**
 * @prop name name of the scale
 * @prop notes notes in the scale
 */
export class Scale {
    constructor(
        public readonly name: string,
        public readonly intervals: Interval[],
        public readonly isCustom: boolean,
    ) { }

    /**
     * 
     * @returns sharp notes in this scale
     */
    getNotes(root: Note): Note[] {
        var notes: Note[] = [];
        var allNotes = [...allNotesWithSharps, ...allNotesWithSharps];
        for (let interval of this.intervals) {
            const semitones = IntervalToSemitones[interval];
            const noteIndex = (allNotes.indexOf(root) + semitones) % 12;
            notes.push(allNotes[noteIndex]);
        }

        return notes;
    }
}

/**
 * ScaleRecipes define the intervals for common scales
 * The intervals are relative to the root note (1)
 * Example: Major scale = [1, 3, 5, 6, 8] = root, major third, perfect fifth, major sixth, octave
 * 
 * todo: review and add more scales, these were autocompleted
 */
export const ScaleRecipes: Map<string, Scale> = new Map([
    // w = whole step, h = half step
    // stolen from [here](https://muted.io/scale-formulas-intervals/)
    // Major: w w h w w w h
    ["Major", new Scale("Major", ["p1", "M2", "M3", "P4", "P5", "M6", "M7", "P8"], true)],
    // Minor / Natural Minor: w h w w h w w
    ["Minor", new Scale("Minor", ["p1", "M2", "m3", "P4", "P5", "m6", "m7", "P8"], true)],
    /*----- VERIFIED UP TO HERE (compared with existing charts to make sure intervals not shifted) -----*/
    // Melodic minor: w h w w w w h
    ["Melodic Minor", new Scale("Melodic Minor", ["p1", "M2", "m3", "P4", "P5", "M6", "M7", "P8"], true)],
    // Harmonic Minor: w h w w h (w+h) h
    ["Harmonic Minor", new Scale("Harmonic Minor", ["p1", "M2", "m3", "P4", "P5", "m6", "M7", "P8"], true)],
    // Dorian Scale: w h w w w h w
    ["Dorian", new Scale("Dorian", ["p1", "M2", "m3", "P4", "P5", "M6", "m7", "P8"], true)],
    ["Phrygian", new Scale("Phrygian", ["p1", "m2", "m3", "P4", "P5", "m6", "m7", "P8"], true)],
    ["Lydian", new Scale("Lydian", ["p1", "M2", "M3", "A4", "P5", "M6", "M7", "P8"], true)],
    ["Mixolydian", new Scale("Mixolydian", ["p1", "M2", "M3", "P4", "P5", "M6", "m7", "P8"], true)],
    ["Locrian", new Scale("Locrian", ["p1", "m2", "m3", "P4", "A4", "m6", "m7", "P8"], true)],
    ["Minor Pentatonic", new Scale("Minor Pentatonic", ["p1", "m3", "P4", "P5", "m7", "P8"], true)],
    ["Major Pentatonic", new Scale("Major Pentatonic", ["p1", "M2", "M3", "P5", "M6", "P8"], true)],
    ["Major Blues", new Scale("Major Blues", ["p1", "M2", "m3", "M3", "P5", "M6", "P8"], true)],
    ["Minor Blues", new Scale("Minor Blues", ["p1", "m3", "P4", "A4", "P5", "m7", "P8"], true)],
    ["Augmented", new Scale("Augmented", ["p1", "m3", "M3", "P5", "m6", "M7", "P8"], true)],
    ["Diminished", new Scale("Diminished", ["p1", "M2", "m3", "P4", "A4", "m6", "M6", "M7", "P8"], true)],
]);