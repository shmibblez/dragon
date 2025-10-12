import { Component, ElementRef, HostListener, signal, WritableSignal } from "@angular/core";
import { DropdownComponent } from "../dropdown/dropdown";
import { ChipComponent } from "../chip/chip";
import { TuningDropdownComponent } from "./tuning/tuningDropdown";
import { NumberOfStrings, TuningRecipes } from "../../app/objects/tuning";
import { LairService } from "../../app/services/lair";
import { ScaleRecipes } from "../../app/objects/scale";
import { ScaleDropdownComponent } from "./scale/scaleDropdown";
import { allNotesWithSharps, isSameNote, Note } from "../../app/objects/note";

type pref = "strings" | "tuning" | "scales" | "root" | null;

@Component({
    selector: "prefs",
    templateUrl: "./prefs.html",
    styleUrls: ["../../app/app.scss", "./prefs.scss"],
    imports: [DropdownComponent, ChipComponent, TuningDropdownComponent, ScaleDropdownComponent],
})
export class PrefsComponent {
    selectedOption: WritableSignal<pref> = signal(null);
    readonly stringNumbers: NumberOfStrings[] = [4, 5, 6, 7, 8];
    readonly notes = allNotesWithSharps

    constructor(private lair: LairService, private elementRef: ElementRef) { }

    @HostListener("document:click", ["$event.target"])
    public onClick(targetElement: EventTarget | null): void {
        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.selectedOption.set(null)
        }
    }

    get numberOfStrings(): NumberOfStrings {
        return this.lair.numberOfStrings
    }

    isNoteRoot(n: Note): boolean {
        return isSameNote(n, this.lair.rootNote)
    }

    stringsPrefSelected(event: PointerEvent) {
        this.selectedOption.set("strings");
        event.stopPropagation();
    }

    tuningPrefSelected(event: PointerEvent) {
        this.selectedOption.set("tuning");
        event.stopPropagation();
    }

    scalesPrefSelected(event: PointerEvent) {
        this.selectedOption.set("scales");
        event.stopPropagation();
    }

    rootPrefSelected(event: PointerEvent) {
        this.selectedOption.set("root");
        event.stopPropagation();
    }

    onTuningSelected(tuning: string) {
        const nStrings = this.lair.numberOfStrings
        this.lair.updateTuning(TuningRecipes.get(nStrings)!.get(tuning)!);
    }

    onScaleSelected(scale: string) {
        this.lair.updateScale(ScaleRecipes.get(scale)!)
    }

    onStringsSelected(n: NumberOfStrings) {
        this.lair.updateNumberOfStrings(n)
    }

    onRootSelected(n: Note) {
        this.lair.updateRootNote(n)
    }
}