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
    ["Major", new Scale("Major", ["p1", "M2", "P4", "P5", "M6", "P8"], true)],
    ["Minor", new Scale("Minor", ["p1", "m2", "P4", "P5", "m6", "P8"], true)],
    ["Harmonic Minor", new Scale("Harmonic Minor", ["p1", "m2", "P4", "P5", "m6", "P8"], true)],
    ["Melodic Minor", new Scale("Melodic Minor", ["p1", "M2", "P4", "P5", "M6", "P8"], true)],
    ["Pentatonic Major", new Scale("Pentatonic Major", ["p1", "M2", "P4", "P5", "P8"], true)],
    ["Pentatonic Minor", new Scale("Pentatonic Minor", ["p1", "m2", "P4", "P5", "P8"], true)],
    ["Blues", new Scale("Blues", ["p1", "m2", "P4", "P5", "m6", "P8"], true)],
]);