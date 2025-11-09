import { Component } from "@angular/core";
import { ChipComponent } from "../../chip/chip";
import { Scale, ScaleRecipes } from "../../../app/objects/scale";
import { LairService } from "../../../app/services/lair";
import { allIntervals, Interval } from "../../../app/objects/interval";

@Component({
    selector: "scaleDropdown",
    templateUrl: "./scaleDropdown.html",
    imports: [ChipComponent],
    styleUrls: ["./scaleDropdown.scss", "../../../app/app.scss"]
})
export class ScaleDropdownComponent {
    constructor(private lair: LairService) { }

    get scales() {
        return Array.from(ScaleRecipes.keys())
    }

    get allIntervals() {
        return allIntervals;
    }

    isCustom(): boolean {
        return this.lair.scale.isCustom
    }

    isIntervalSelected(interval: Interval): boolean {
        return this.lair.scale.intervals.includes(interval);
    }

    onCustomIntervalClicked(interval: Interval) {
        if (!this.lair.scale.isCustom) {
            return;
        }
        this.lair.toggleCustomScaleInterval(interval);
    }

    isSelected(scale: string): boolean {
        return this.lair.scale.name === scale;
    }

    onCustomScaleClicked() {
        if (this.lair.scale.isCustom) {
            this.lair.updateScale(ScaleRecipes.get("Major")!)
        } else {
            this.lair.updateScale(new Scale("Custom", [], true))
        }
    }

    onDefaultScaleSelected(name: string) {
        this.lair.updateScale(ScaleRecipes.get(name) ?? ScaleRecipes.get("Major")!)
    }
}