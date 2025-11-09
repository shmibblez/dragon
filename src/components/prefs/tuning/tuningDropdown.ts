import { Component, Input, Signal } from "@angular/core";
import { ChipComponent } from "../../chip/chip";
import { LairService } from "../../../app/services/lair";
import { Tuning, TuningRecipes } from "../../../app/objects/tuning";
import { SelectionBarComponent } from "../../selectionBar/selectionBar";
import { allNotesWithSharps, Note } from "../../../app/objects/note";

/**
 * tuning prefs menu
 * 
 * // todo: add custom impl
 */
@Component({
    selector: "tuningDropdown",
    templateUrl: "./tuningDropdown.html",
    styleUrls: ["../../../app/app.scss"],
    imports: [ChipComponent, SelectionBarComponent],
})
export class TuningDropdownComponent {
    @Input() onTuningSelected!: (tuning: string) => void;

    constructor(private lair: LairService) { }

    get tunings() {
        return Array.from(TuningRecipes.get(this.lair.numberOfStrings)!.keys());
    }

    get strings() {
        return this.lair.strings;
    }

    get stringNotes() {
        return this.lair.tuning.notes;
    }

    get allSharpNotes() {
        return allNotesWithSharps;
    }

    isSelected(tuning: string): boolean {
        return this.lair.tuning.name === tuning;
    }

    isTuningCustom(): boolean {
        const tuning = this.lair.tuning;
        return tuning.isCustom;
    }

    onCustomTuningClicked() {
        if (this.lair.tuning.isCustom) {
            this.lair.updateTuning(TuningRecipes.get(this.lair.numberOfStrings)!.get("Standard")!);
        } else {
            const standardNotes = TuningRecipes.get(this.lair.numberOfStrings)!.get("Standard")!.notes
            this.lair.updateTuning(new Tuning("Custom", standardNotes, true));
        }
    }

    onCustomTuningNoteSelected(stringIndex: number): (note: Note) => void {
        return (note: Note) => {
            if (!this.lair.tuning.isCustom) {
                return;
            }
            const newNotes = [...this.lair.tuning.notes];
            newNotes[stringIndex] = note;
            this.lair.updateTuning(new Tuning("Custom", newNotes, true));
        }
    }
}