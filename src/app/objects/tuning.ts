import { Note } from "./note";

export class Tuning {
    constructor(
        public readonly name: string,
        public readonly notes: Note[],
        public readonly isCustom: boolean = true,
    ) { }
}

export type NumberOfStrings = 4 | 5 | 6 | 7 | 8;

export const TuningRecipes: Map<NumberOfStrings, Map<string, Tuning>> = new Map(
    [
        [4, new Map([
            ["Standard", new Tuning("Baritone", ["G", "C", "E", "A"], false)],
            ["Traditional Hawaiian", new Tuning("Traditional Hawaiian", ["A", "D", "F#", "B"], false)],
            ["Baritone Standard", new Tuning("Baritone Standard", ["D", "G", "B", "E"], false)],
            ["Open G", new Tuning("Open G", ["D", "G", "D", "G"], false)],
        ])],
        [5, new Map([
            ["Standard", new Tuning("Standard", ["E", "A", "D", "G", "B"], false)],
            ["Drop D", new Tuning("Drop D", ["D", "A", "D", "G", "B"], false)],
            ["Celtic", new Tuning("Celtic", ["D", "A", "D", "G", "A"], false)],
            ["Double Drop D", new Tuning("Double Drop D", ["D", "A", "D", "G", "B"], false)],
            ["Open E", new Tuning("Open E", ["E", "B", "E", "G#", "B"], false)],
            ["Open G", new Tuning("Open G", ["D", "G", "D", "G", "B"], false)],
            ["Open D", new Tuning("Open D", ["D", "A", "D", "F#", "A"], false)],
            ["Open A", new Tuning("Open A", ["E", "A", "E", "A", "C#"], false)],
        ])],
        [6, new Map([
            ["Standard", new Tuning("Standard", ["E", "A", "D", "G", "B", "E"], false)],
            ["Drop D", new Tuning("Drop D", ["D", "A", "D", "G", "B", "E"], false)],
            ["Celtic", new Tuning("Celtic", ["D", "A", "D", "G", "A", "D"], false)],
            ["Double Drop D", new Tuning("Double Drop D", ["D", "A", "D", "G", "B", "D"], false)],
            ["Open E", new Tuning("Open E", ["E", "B", "E", "G#", "B", "E"], false)],
            ["Open G", new Tuning("Open G", ["D", "G", "D", "G", "B", "D"], false)],
            ["Open D", new Tuning("Open D", ["D", "A", "D", "F#", "A", "D"], false)],
            ["Open A", new Tuning("Open A", ["E", "A", "E", "A", "C#", "E"], false)],
        ])],
        [7, new Map([
            ["Standard", new Tuning("Standard", ["B", "E", "A", "D", "G", "B", "E"], false)],
            ["Drop A", new Tuning("Drop A", ["A", "E", "A", "D", "G", "B", "E"], false)],
            ["Drop D", new Tuning("Drop D", ["B", "D", "A", "D", "G", "B", "E"], false)],
            ["Double D", new Tuning("Double D", ["D", "D", "A", "D", "G", "B", "E"], false)],
            ["A Standard", new Tuning("A Standard", ["A", "D", "G", "C", "F", "A", "D"], false)],
            ["Drop E", new Tuning("Drop E", ["E", "B", "E", "A", "D", "G", "B"], false)],
            ["Open C", new Tuning("Open C", ["G", "C", "G", "C", "G", "C", "E"], false)],
            ["Treble A", new Tuning("Treble A", ["E", "A", "D", "G", "B", "E", "A"], false)],
            ["Open G", new Tuning("Open G", ["D", "G", "B", "D", "G", "B", "D"], false)],
        ])],
        [8, new Map([
            ["Standard", new Tuning("Standard", ["F#", "B", "E", "A", "D", "G", "B", "E"], false)],
            ["F", new Tuning("F", ["F", "Bb", "Eb", "Ab", "Db", "Gb", "Bb", "Eb"], false)],
            ["E", new Tuning("E", ["E", "A", "D", "G", "C", "F", "A", "D"], false)],
            ["Eb", new Tuning("Eb", ["Eb", "Ab", "Db", "Gb", "B", "E", "Ab", "D"], false)],
            ["A", new Tuning("A", ["A", "D", "G", "C", "F", "A", "D", "G"], false)],
            ["High A", new Tuning("High A", ["B", "E", "A", "D", "G", "B", "E", "A"], false)],
            ["Drop E", new Tuning("Drop E", ["E", "B", "E", "A", "D", "G", "B", "E"], false)],
            ["Drop Eb", new Tuning("Drop Eb", ["Eb", "Bb", "Eb", "Ab", "Db", "Gb", "Bb", "Eb"], false)],
            ["Drop D", new Tuning("Drop D", ["D", "A", "D", "G", "C", "F", "A", "D"], false)],

        ])],
    ]
);