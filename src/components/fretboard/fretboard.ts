import { Component, ElementRef, HostListener, Input, ViewChild } from "@angular/core";
import { isSameNote, nextNoteFlat, nextNoteSharp, Note } from "../../app/objects/note";
import { Scale } from "../../app/objects/scale";
import { Lair } from "../../app/services/lair";

@Component({
    selector: "fretboard",
    templateUrl: "./fretboard.html",
    styleUrls: ["../../app/app.scss", "./fretboard.scss"],
})
export class FretboardComponent {
    constructor(private lair: Lair) { }

    @ViewChild('fretboard_canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
    private ctx!: CanvasRenderingContext2D;
    private flipped = false;

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.drawFretboard()
    }

    ngOnInit() {
        // update on app state changes
        this.lair.appState$.subscribe(() => {
            if (!this.ctx) return
            this.drawFretboard()
        })
    }

    ngAfterViewInit() {
        this.ctx = this.canvas.nativeElement.getContext('2d')!;
        this.drawFretboard()
    }

    private get leftOrRightHanded() {
        return this.lair.appState.getValue().leftOrRightHanded();
    }

    private get numberOfStrings() {
        return this.lair.appState.getValue().numberOfStrings();
    }

    private get numberOfFrets() {
        return this.lair.appState.getValue().numberOfFrets();
    }

    private get tuning() {
        return this.lair.appState.getValue().tuning();
    }

    private get scale() {
        return this.lair.appState.getValue().scale();
    }

    private get noteType() {
        return this.lair.appState.getValue().noteType();
    }

    /**
     * Draw the fretboard on the canvas
     * Right handed by default
     * TODO: flip horizontally if left handed
     */
    private drawFretboard() {
        const canvas = this.canvas.nativeElement;
        canvas.height = canvas.offsetHeight;
        canvas.width = canvas.offsetWidth;
        const ctx = this.ctx;
        const rect = canvas.getBoundingClientRect();
        const w = rect.width; // canvas.width;
        const h = rect.height; // canvas.height;

        console.log(`drawing fretboard ${w}x${h}, ${this.numberOfStrings} strings, ${this.numberOfFrets} frets, ${this.leftOrRightHanded} handed`)

        // Clear the canvas
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#000000ff"
        ctx.fillRect(0, 0, w, h)

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

        // draw frets and fret numbers
        const yPadding = h / (this.numberOfStrings + 1) / 2
        // start padding for strings
        const stringBlipPadding = yPadding * 2
        const fretNumberPadding = yPadding
        const fretWidth = (w - 2 * yPadding - stringBlipPadding) / (this.numberOfFrets)
        ctx.strokeStyle = "#ffffffff"
        ctx.lineCap = "round"
        // for each fret number f
        for (let f = 0; f <= this.numberOfFrets; f++) {
            const y0 = yPadding + fretNumberPadding
            const y1 = h - yPadding
            const x = yPadding + stringBlipPadding + fretWidth * f
            if (f === 0) {
                ctx.lineWidth = 10
            } else {
                ctx.lineWidth = 1
            }
            // draw fret
            ctx.moveTo(x, y0)
            ctx.lineTo(x, y1)
            ctx.stroke()
            // draw fret number
            if (f > 0) {
                ctx.font = `${yPadding / 2}px Arial`
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.fillStyle = "#ffffffff"
                ctx.fillText(f.toString(), x, yPadding + fretNumberPadding / 2)
            }
        }

        // draw strings
        const stringSpacing = (h - 2 * yPadding - fretNumberPadding) / (this.numberOfStrings - 1)
        ctx.lineWidth = 2
        ctx.strokeStyle = "#ffffffff"
        // for each string number s
        for (let s = 0; s < this.numberOfStrings; s++) {
            const y = yPadding + fretNumberPadding + s * stringSpacing
            const x0 = yPadding + stringBlipPadding
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
            for (let f = 0; f <= this.numberOfFrets; f++) {
                // if note in scale, draw blip
                const noteInScale = notes.indexOf(note) >= 0
                if (noteInScale || f === 0) {
                    const y = yPadding + fretNumberPadding + s * stringSpacing
                    const x = f === 0 ? yPadding + stringBlipPadding / 2 : yPadding + stringBlipPadding + fretWidth * f - fretWidth / 2;
                    ctx.beginPath()
                    ctx.arc(x, y, blipRadius, 0, 2 * Math.PI)
                    // if root note background is different
                    if (isSameNote(this.scale.root, note)) {
                        ctx.fillStyle = "#cc0000ff"
                    } else if (noteInScale) {
                        ctx.fillStyle = "#ffaaaaff"
                    } else {
                        ctx.fillStyle = "#aaaaaa7f"
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