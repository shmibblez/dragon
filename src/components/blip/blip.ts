import { Component, Input } from "@angular/core";
import { Note } from "../../app/objects/note";

@Component({
    selector: 'blip',
    templateUrl: './blip.html',
})

/**
 * blips are note indicators, circles with note inside
 */
export class Blip {
    @Input() note!: Note;
}