import { Note } from "./note";

export class Tuning {
    constructor(
        public readonly name: string,
        public readonly notes: Note[],
        public readonly isDefault: boolean = false,
    ) { }
}

export const TuningRecipes: Map<string, Tuning> = new Map([
    ["Standard", new Tuning("Standard", ["E", "A", "D", "G", "B", "E"], true)],
    ["Drop D", new Tuning("Drop D", ["D", "A", "D", "G", "B", "E"], true)],
    ["Open G", new Tuning("Open G", ["D", "G", "D", "G", "B", "D"], true)],
]);