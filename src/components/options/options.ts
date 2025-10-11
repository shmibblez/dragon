import { Component } from "@angular/core";
import { DropdownComponent } from "../dropdown/dropdown";

type option = "tuning" | "strings" | "scales" | null;

@Component({
    selector: "options",
    templateUrl: "./options.html",
    styleUrls: ["../../app/app.scss", "./options.scss"],
    imports: [DropdownComponent],
})
export class OptionsComponent {
    selectedOption: option = null;

    constructor() { }

    // todo: when click outside, set option = null

    onSelectOption(event: PointerEvent, option: option) {
        this.selectedOption = option;
        event.stopPropagation();

        console.log("Selected option: ", this.selectedOption);
    }
}