import { Component, ElementRef, HostListener, signal, WritableSignal } from "@angular/core";
import { DropdownComponent } from "../dropdown/dropdown";
import { ChipComponent } from "../chip/chip";
import { TuningDropdownComponent } from "./tuning/tuningDropdown";
import { NumberOfStrings, TuningRecipes } from "../../app/objects/tuning";
import { LairService } from "../../app/services/lair";
import { ScaleRecipes } from "../../app/objects/scale";
import { ScaleDropdownComponent } from "./scale/scaleDropdown";
import { allNotesWithSharps, isSameNote, Note } from "../../app/objects/note";
import { LayoutDropdownComponent } from "./layout/layoutDropdown";

type pref = "strings" | "tuning" | "scales" | "root" | "layout" | null;

@Component({
    selector: "prefs",
    templateUrl: "./prefs.html",
    styleUrls: ["../../app/app.scss", "./prefs.scss"],
    imports: [DropdownComponent, ChipComponent, TuningDropdownComponent, ScaleDropdownComponent, LayoutDropdownComponent],
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
            this.updateUi(false)
        }
    }

    get numberOfStrings(): NumberOfStrings {
        return this.lair.numberOfStrings
    }

    isNoteRoot(n: Note): boolean {
        return isSameNote(n, this.lair.rootNote)
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.updateUi(this.selectedOption() !== null)
    }

    updateUi(prefShown: boolean = true) {
        const prefElement = this.elementRef.nativeElement.querySelector("#prefs");
        const dropdownContentElement = this.elementRef.nativeElement.querySelector("#dropdown-content")
        // update borders if pref shown
        const br = window.innerWidth < 600 ? "max(5vw, 7.5mm)": "min(3.5vw, 14mm)"
        if (prefElement) {
            prefElement.style.borderRadius = prefShown ? `${br} ${br} 0 0` : br;
            prefElement.style.borderBottom = prefShown ? "none" : "2px solid white";
            prefElement.style.paddingBottom = prefShown ? "calc(2px + 1vw)" : "1vw";
        }
        if (dropdownContentElement) {
            dropdownContentElement.style.borderRadius = prefShown ? `0 0 ${br} ${br}` : br;
        }
    }

    stringsPrefSelected(event: PointerEvent) {
        this.selectedOption.set("strings");
        event.stopPropagation();
        this.updateUi();
    }

    tuningPrefSelected(event: PointerEvent) {
        this.selectedOption.set("tuning");
        event.stopPropagation();
        this.updateUi();
    }

    scalesPrefSelected(event: PointerEvent) {
        this.selectedOption.set("scales");
        event.stopPropagation();
        this.updateUi();
    }

    rootPrefSelected(event: PointerEvent) {
        this.selectedOption.set("root");
        event.stopPropagation();
        this.updateUi();
    }

    layoutPrefSelected(event: PointerEvent) {
        this.selectedOption.set("layout");
        event.stopPropagation();
        this.updateUi();
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