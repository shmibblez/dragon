import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Note } from "../../app/objects/note";

@Component({
    selector: "app-fretboard",
    templateUrl: "./fretboard.html",
    //   styleUrls: ["./fretboard.scss"],
})
export class FretboardComponent {
    @Input() tuning!: Note[];
    @Input() numberOfFrets!: number;
    @Input() numberOfStrings!: number;
    @Input() leftOrRightHanded!: "left" | "right";

    @ViewChild('paintCanvas') canvas!: ElementRef<HTMLCanvasElement>;
    private ctx!: CanvasRenderingContext2D;

    ngAfterViewInit() {
        this.ctx = this.canvas.nativeElement.getContext('2d')!;
        this.drawFretboard()
    }

    /**
     * Draw the fretboard on the canvas
     * Right handed by default
     * TODO: flip horizontally if left handed
     */
    private drawFretboard() {
        const canvas = this.canvas.nativeElement;
        const ctx = this.ctx;
        const w = canvas.width;
        const h = canvas.height;

        // Clear the canvas
        ctx.clearRect(0, 0, w, h);

        // TODO: draw fretboard
        //  - partition width and draw vertical lines for frets
        //  - partition height and draw horizontal lines for strings
        //    - for v1 straight lines, for v2 slightly angled

    }
}