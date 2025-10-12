import { Component, Input, Signal } from "@angular/core";
import { ChipComponent } from "../../chip/chip";
import { LairService } from "../../../app/services/lair";
import { TuningRecipes } from "../../../app/objects/tuning";
import { Scale, ScaleRecipes } from "../../../app/objects/scale";

/**
 * tuning prefs menu
 * 
 * // todo: add custom impl
 */
@Component({
    selector: "tuningDropdown",
    templateUrl: "./tuningDropdown.html",
    styleUrls: ["../../../app/app.scss"],
    imports: [ChipComponent],
})
export class TuningDropdownComponent {
    @Input() onTuningSelected!: (tuning: string) => void;

    constructor(private lair: LairService) { }

    get tunings() {
        return Array.from(TuningRecipes.keys());
    }

    isSelected(tuning: string): boolean {
        return this.lair.tuning.name === tuning;
    }
}