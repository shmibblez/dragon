import { Component } from "@angular/core";
import { LairService } from "../../../app/services/lair";
import { ChipComponent } from "../../chip/chip";
import { SelectionBarComponent } from "../../selectionBar/selectionBar";
import { Note } from "../../../app/objects/note";

type HorizontalOrientation = "Left" | "Right";
type VerticalOrientation = "Top" | "Bottom";
type NoteNamingConvention = "Letters" | "Solfège";

@Component({
    selector: "layoutDropdown",
    templateUrl: "./layoutDropdown.html",
    styleUrls: ["../../../app/app.scss"],
    imports: [SelectionBarComponent],
})
export class LayoutDropdownComponent {
    constructor(private lair: LairService) { }

    noteNamingConventions(): NoteNamingConvention[] {
        return ["Letters", "Solfège"];
    }

    selectedNoteNamingConvention(): NoteNamingConvention {
        return this.lair.noteNamingConvention === "letters" ? "Letters" : "Solfège";
    }

    updateNoteNamingConvention(): (convention: NoteNamingConvention) => void {
        return (convention: NoteNamingConvention) => {
            this.lair.updateNoteNamingConvention(convention === "Letters" ? "letters" : "solfège");
        }
    }

    horizontalOptions(): HorizontalOrientation[] {
        return ["Left", "Right"];
    }

    verticalOptions(): VerticalOrientation[] {
        return ["Top", "Bottom"];
    }

    leftyOrRighty(): HorizontalOrientation {
        return this.lair.leftOrRightHanded == "left" ? "Left" : "Right";
    }

    fatStringLocation(): VerticalOrientation {
        return this.lair.thiccStringLocation === "top" ? "Top" : "Bottom";
    }

    changeLayoutDirection(): (direction: HorizontalOrientation) => void {
        return (direction: HorizontalOrientation) => {
            this.lair.updateLeftOrRightHanded(direction === "Left" ? "left" : "right");
        }
    }

    changeFFFatStringLocation(): (location: VerticalOrientation) => void {
        return (location: VerticalOrientation) => {
            this.lair.updateThiccStringLocation(location.toLowerCase() as "top" | "bottom");
        }
    }
}