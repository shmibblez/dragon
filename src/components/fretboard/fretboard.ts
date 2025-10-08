import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { isSameNote, nextNoteFlat, nextNoteSharp, Note } from "../../app/objects/note";
import { Scale } from "../../app/objects/scale";

@Component({
    selector: "app-fretboard",
    templateUrl: "./fretboard.html",
    //   styleUrls: ["./fretboard.scss"],
})
export class FretboardComponent {
    @Input() scale!: Scale;
    @Input() tuning!: Note[];
    @Input() numberOfFrets!: number;
    @Input() numberOfStrings!: number;
    @Input() leftOrRightHanded!: "left" | "right";
    @Input() noteType!: "sharp" | "flat";

    @ViewChild('paintCanvas') canvas!: ElementRef<HTMLCanvasElement>;
    private ctx!: CanvasRenderingContext2D;
    private flipped = false;

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

        // flip if left handed and not already flipped, if flipped back restore
        if (this.leftOrRightHanded === "left" && !this.flipped) {
            ctx.save();
            ctx.translate(w, 0);
            ctx.scale(-1, 1);
            this.flipped = true;
        } else {
            ctx.restore();
            this.flipped = false;
        }

        // draw frets
        const yPadding = h / (this.numberOfStrings + 1) / 2
        const fretWidth = w / (this.numberOfFrets - 1)
        ctx.lineWidth = 1
        ctx.strokeStyle = "#ffffffff"
        // for each fret number f
        for (let f = 0; f <= this.numberOfFrets; f++) {
            const y0 = yPadding
            const y1 = h - yPadding
            const x = fretWidth * f
            ctx.moveTo(x, y0)
            ctx.lineTo(x, y1)
            ctx.stroke()
        }

        // draw strings
        const stringSpacing = (h - 2 * yPadding) / (this.numberOfStrings - 1)
        ctx.lineWidth = 2
        ctx.strokeStyle = "#ffffffff"
        // for each string number s
        for (let s = 0; s < this.numberOfStrings; s++) {
            const y = yPadding + s * stringSpacing
            const x0 = yPadding
            const x1 = w - yPadding
            ctx.moveTo(x0, y)
            ctx.lineTo(x1, y)
            ctx.stroke()
        }

        // draw blips / note markers
        const blipRadius = yPadding / 2
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.font = `${blipRadius}px Arial`
        const notes = this.scale.getNotes();
        // start at lowest string, go to highest
        for (let s = 0; s < this.numberOfStrings; s++) {
            // start at fret 0, go to highest
            // get note at string s, fret f
            let note = this.tuning[s]
            for (let f = 0; f < this.numberOfFrets; f++) {
                // if note in scale, draw blip
                if (notes.indexOf(note) >= 0) {
                    const y = yPadding + s * stringSpacing
                    const x = fretWidth * f + fretWidth / 2
                    ctx.beginPath()
                    ctx.arc(x, y, blipRadius, 0, 2 * Math.PI)
                    // if root note background is different
                    if (isSameNote(this.scale.root, note)) {
                        ctx.fillStyle = "#cc0000ff"
                    } else {
                        ctx.fillStyle = "#aaaaaaff"
                    }
                    ctx.closePath()
                    ctx.fill()
                    // ctx.strokeStyle = "#ffffffff"
                    // ctx.stroke()
                    // draw note text
                    ctx.fillStyle = "#000000ff"
                    ctx.fillText(note, x, y)
                }

                // update note for next fret, sharp or flat based on user pref
                if (this.noteType === "sharp") {
                    note = nextNoteSharp(note)
                } else {
                    note = nextNoteFlat(note)
                }
            }
        }
    }
}