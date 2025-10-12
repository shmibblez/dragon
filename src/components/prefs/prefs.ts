import { Component, ElementRef, HostListener, signal, WritableSignal } from "@angular/core";
import { DropdownComponent } from "../dropdown/dropdown";
import { ChipComponent } from "../chip/chip";
import { TuningDropdownComponent } from "./tuning/tuningDropdown";
import { TuningRecipes } from "../../app/objects/tuning";
import { LairService } from "../../app/services/lair";
import { ScaleRecipes } from "../../app/objects/scale";
import { ScaleDropdownComponent } from "./scale/scaleDropdown";

type pref = "tuning" | "strings" | "scales" | null;

@Component({
    selector: "prefs",
    templateUrl: "./prefs.html",
    styleUrls: ["../../app/app.scss", "./prefs.scss"],
    imports: [DropdownComponent, ChipComponent, TuningDropdownComponent, ScaleDropdownComponent],
})
export class PrefsComponent {
    selectedOption: WritableSignal<pref> = signal(null);

    constructor(private lair: LairService, private elementRef: ElementRef) { }

    @HostListener("document:click", ["$event.target"])
    public onClick(targetElement: EventTarget | null): void {
        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.selectedOption.set(null)
        }
    }

    tuningPrefSelected(event: PointerEvent) {
        this.selectedOption.set("tuning");
        event.stopPropagation();
    }

    stringsPrefSelected(event: PointerEvent) {
        this.selectedOption.set("strings");
        event.stopPropagation();
    }

    scalesPrefSelected(event: PointerEvent) {
        this.selectedOption.set("scales");
        event.stopPropagation();
    }

    onTuningSelected(tuning: string) {
        this.lair.updateTuning(TuningRecipes.get(tuning)!);
    }

    onScaleSelected(scale: string) {
        this.lair.updateScale(ScaleRecipes.get(scale)!)
    }
}