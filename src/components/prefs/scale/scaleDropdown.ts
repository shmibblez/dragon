import { Component } from "@angular/core";
import { ChipComponent } from "../../chip/chip";
import { ScaleRecipes } from "../../../app/objects/scale";
import { LairService } from "../../../app/services/lair";

@Component({
    selector: "scaleDropdown",
    templateUrl: "./scaleDropdown.html",
    imports: [ChipComponent],
})
export class ScaleDropdownComponent {
    constructor(private lair: LairService) { }

    get scales() {
        return Array.from(ScaleRecipes.keys())
    }

    isSelected(scale: string): boolean {
        return this.lair.scale.name === scale;
    }

    onDefaultScaleSelected(name: string) {
        this.lair.updateScale(ScaleRecipes.get(name) ?? ScaleRecipes.get("Major")!)
    }
}