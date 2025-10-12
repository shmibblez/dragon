// todo: chip component, text box with rounded border that is selectable

import { NgClass } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "chip",
    templateUrl: "./chip.html",
    styleUrls: ["../../app/app.scss", "./chip.scss"],
    imports: [NgClass],
})
export class ChipComponent {
    @Input() label!: string;
    @Input() selected!: boolean;

    constructor() { }
}