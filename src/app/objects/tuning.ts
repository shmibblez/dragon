import { Note } from "./note";

export class Tuning {
    constructor(
        public readonly name: string,
        public readonly notes: Note[],
        public readonly isDefault: boolean = false,
    ) { }
}

export type NumberOfStrings = 4 | 5 | 6 | 7 | 8;

export const TuningRecipes: Map<NumberOfStrings, Map<string, Tuning>> = new Map(
    [
        [4, new Map([
            ["Standard", new Tuning("Baritone", ["G", "C", "E", "A"], true)],
            ["Traditional Hawaiian", new Tuning("Traditional Hawaiian", ["A", "D", "F#", "B"], true)],
            ["Baritone Standard", new Tuning("Baritone Standard", ["D", "G", "B", "E"], true)],
            ["Open G", new Tuning("Open G", ["D", "G", "D", "G"], true)],
        ])],
        [5, new Map([
            ["Standard", new Tuning("Standard", ["E", "A", "D", "G", "B"], true)],
            ["Drop D", new Tuning("Drop D", ["D", "A", "D", "G", "B"], true)],
            ["Celtic", new Tuning("Celtic", ["D", "A", "D", "G", "A"], true)],
            ["Double Drop D", new Tuning("Double Drop D", ["D", "A", "D", "G", "B"], true)],
            ["Open E", new Tuning("Open E", ["E", "B", "E", "G#", "B"], true)],
            ["Open G", new Tuning("Open G", ["D", "G", "D", "G", "B"], true)],
            ["Open D", new Tuning("Open D", ["D", "A", "D", "F#", "A"], true)],
            ["Open A", new Tuning("Open A", ["E", "A", "E", "A", "C#"], true)],
        ])],
        [6, new Map([
            ["Standard", new Tuning("Standard", ["E", "A", "D", "G", "B", "E"], true)],
            ["Drop D", new Tuning("Drop D", ["D", "A", "D", "G", "B", "E"], true)],
            ["Celtic", new Tuning("Celtic", ["D", "A", "D", "G", "A", "D"], true)],
            ["Double Drop D", new Tuning("Double Drop D", ["D", "A", "D", "G", "B", "D"], true)],
            ["Open E", new Tuning("Open E", ["E", "B", "E", "G#", "B", "E"], true)],
            ["Open G", new Tuning("Open G", ["D", "G", "D", "G", "B", "D"], true)],
            ["Open D", new Tuning("Open D", ["D", "A", "D", "F#", "A", "D"], true)],
            ["Open A", new Tuning("Open A", ["E", "A", "E", "A", "C#", "E"], true)],
        ])],
        [7, new Map([
            ["Standard", new Tuning("Standard", ["B", "E", "A", "D", "G", "B", "E"], true)],
            ["Drop A", new Tuning("Drop A", ["A", "E", "A", "D", "G", "B", "E"], true)],
            ["Drop D", new Tuning("Drop D", ["B", "D", "A", "D", "G", "B", "E"], true)],
            ["Double D", new Tuning("Double D", ["D", "D", "A", "D", "G", "B", "E"], true)],
            ["A Standard", new Tuning("A Standard", ["A", "D", "G", "C", "F", "A", "D"], true)],
            ["Drop E", new Tuning("Drop E", ["E", "B", "E", "A", "D", "G", "B"], true)],
            ["Open C", new Tuning("Open C", ["G", "C", "G", "C", "G", "C", "E"], true)],
            ["Treble A", new Tuning("Treble A", ["E", "A", "D", "G", "B", "E", "A"], true)],
            ["Open G", new Tuning("Open G", ["D", "G", "B", "D", "G", "B", "D"], true)],
        ])],
        [8, new Map([
            ["Standard", new Tuning("Standard", ["F#", "B", "E", "A", "D", "G", "B", "E"], true)],
            ["F", new Tuning("F", ["F", "Bb", "Eb", "Ab", "Db", "Gb", "Bb", "Eb"], true)],
            ["E", new Tuning("E", ["E", "A", "D", "G", "C", "F", "A", "D"], true)],
            ["Eb", new Tuning("Eb", ["Eb", "Ab", "Db", "Gb", "B", "E", "Ab", "D"], true)],
            ["A", new Tuning("A", ["A", "D", "G", "C", "F", "A", "D", "G"], true)],
            ["High A", new Tuning("High A", ["B", "E", "A", "D", "G", "B", "E", "A"], true)],
            ["Drop E", new Tuning("Drop E", ["E", "B", "E", "A", "D", "G", "B", "E"], true)],
            ["Drop Eb", new Tuning("Drop Eb", ["Eb", "Bb", "Eb", "Ab", "Db", "Gb", "Bb", "Eb"], true)],
            ["Drop D", new Tuning("Drop D", ["D", "A", "D", "G", "C", "F", "A", "D"], true)],

        ])],
    ]
);