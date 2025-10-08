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
        public readonly root: Note,
    ) { }

    /**
     * 
     * @returns sharp notes in this scale
     */
    getNotes(): Note[] {
        var notes: Note[] = [];
        var allNotes = [...allNotesWithSharps, ...allNotesWithSharps];
        for (let interval of this.intervals) {
            const semitones = IntervalToSemitones[interval];
            const noteIndex = (allNotes.indexOf(this.root) + semitones) % 12;
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
export const ScaleRecipes: { [name: string]: Interval[] } = {
    "Major": ["p1", "M2", "P4", "P5", "M6", "P8"],
    "Minor": ["p1", "m2", "P4", "P5", "m6", "P8"],
    "Harmonic Minor": ["p1", "m2", "P4", "P5", "m6", "P8"],
    "Melodic Minor": ["p1", "M2", "P4", "P5", "M6", "P8"],
    "Pentatonic Major": ["p1", "M2", "P4", "P5", "P8"],
    "Pentatonic Minor": ["p1", "m2", "P4", "P5", "P8"],
    "Blues": ["p1", "m2", "P4", "P5", "m6", "P8"],

}