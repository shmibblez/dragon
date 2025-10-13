import { Component, ElementRef, HostListener, Input, ViewChild } from "@angular/core";
import { isSameNote, nextNoteFlat, nextNoteSharp, Note } from "../../app/objects/note";
import { Scale } from "../../app/objects/scale";
import { LairService } from "../../app/services/lair";
import { Subscription } from "rxjs";

@Component({
    selector: "fretboard",
    templateUrl: "./fretboard.html",
    styleUrls: ["../../app/app.scss", "./fretboard.scss"],
})
export class FretboardComponent {
    constructor(private lair: LairService) { }

    @ViewChild('fretboard_canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
    private ctx!: CanvasRenderingContext2D;
    private subs: Subscription[] = []

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.drawFretboard()
    }

    ngOnInit() {
        // update on app state changes
        this.subs.push(
            this.lair.appState$.subscribe(() => {
                console.log("fretboard sub update")
                if (!this.ctx) return
                this.drawFretboard()
            })
        )
    }

    ngAfterViewInit() {
        this.ctx = this.canvas.nativeElement.getContext('2d')!;
        this.drawFretboard()
    }

    private get thiccStringLocation() {
        return this.lair.thiccStringLocation;
    }

    private get leftOrRightHanded() {
        return this.lair.leftOrRightHanded;
    }

    private get numberOfStrings() {
        return this.lair.numberOfStrings;
    }

    private get numberOfFrets() {
        return this.lair.numberOfFrets;
    }

    private get tuning() {
        return this.lair.tuning;
    }

    private get scale() {
        return this.lair.scale;
    }

    private get rootNote() {
        return this.lair.rootNote;
    }

    private get noteType() {
        return this.lair.noteType;
    }

    /**
     * Draw the fretboard on the canvas
     * Right handed by default
     * TODO: flip horizontally if left handed
     */
    private drawFretboard() {
        const fontFamily = "Courier"
        const fontWeight = "700"
        const canvas = this.canvas.nativeElement;
        canvas.height = canvas.offsetHeight;
        canvas.width = canvas.offsetWidth;
        const ctx = this.ctx;
        const rect = canvas.getBoundingClientRect();
        let w = rect.width; // canvas.width;
        let h = rect.height; // canvas.height;
        const smol = w < 600;

        console.log(`drawing fretboard ${w}x${h}, ${this.numberOfStrings} strings, ${this.numberOfFrets} frets, ${this.leftOrRightHanded} handed`)

        // Clear the canvas
        ctx.clearRect(0, 0, w, h);

        // flip if left handed and not already flipped, if flipped back restore
        ctx.resetTransform()
        if (this.leftOrRightHanded === "left") {
            ctx.translate(w, 0);
            ctx.scale(-1, 1);
        }
        if (smol) {
            ctx.translate(w, 0)
            ctx.rotate(Math.PI / 2)
            w = rect.height
            h = rect.width
        }

        // draw frets and fret numbers
        const yPadding = h / (this.numberOfStrings + 1) / 2
        // start padding for strings
        const stringBlipPadding = yPadding
        const fretNumberPadding = yPadding
        const fretWidth = (w - 2 * yPadding - stringBlipPadding) / (this.numberOfFrets)
        // for each fret number f
        for (let f = 0; f <= this.numberOfFrets; f++) {
            ctx.lineCap = "round"
            const y0 = yPadding + fretNumberPadding
            const y1 = h - yPadding
            const x = yPadding + stringBlipPadding + fretWidth * f

            // draw fret number
            if (f > 0) {
                // stroke
                ctx.lineWidth = 3
                // font
                ctx.font = `${fontWeight} ${yPadding / 1.5}px ${fontFamily}`
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.beginPath()
                if (f % 12 === 0) {
                    console.log("red stroke")
                    // fret #12 special
                    ctx.fillStyle = "#ff000099"
                    ctx.strokeStyle = "#ff000099"
                } else {
                    // other frets normal
                    ctx.fillStyle = "#ffffff99"
                    ctx.strokeStyle = "#ffffff99"
                }
                ctx.fillText(f.toString(), x - fretWidth/2, yPadding / 2 + fretNumberPadding / 2)
                // draw fret
                ctx.moveTo(x, y0)
                ctx.lineTo(x, y1)
                ctx.stroke()
            } else {
                // first fret thicker
                ctx.lineWidth = 10
                ctx.strokeStyle = "#ffffffff"
                // draw fret
                ctx.moveTo(x, y0)
                ctx.lineTo(x, y1)
                ctx.stroke()
            }
        }

        // draw strings
        const stringSpacing = (h - 2 * yPadding - fretNumberPadding) / (this.numberOfStrings - 1)
        // for each string number s
        for (let s = 0; s < this.numberOfStrings; s++) {
            ctx.lineWidth = 2
            ctx.strokeStyle = "#ffffffff"
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
        ctx.font = `${fontWeight} ${blipRadius * 1.25}px ${fontFamily}`
        const notes = this.scale.getNotes(this.rootNote);
        // start at lowest string, go to highest
        for (let s = 0; s < this.numberOfStrings; s++) {
            // start at fret 0, go to highest
            // get note at string s, fret f
            let note = this.tuning.notes[s]
            for (let f = 0; f <= this.numberOfFrets; f++) {
                // if note in scale, draw blip
                const noteInScale = notes.indexOf(note) >= 0
                if (noteInScale || f === 0) {
                    const y = this.thiccStringLocation == "top"
                        ? (yPadding + fretNumberPadding + s * stringSpacing)
                        : (h - yPadding - s * stringSpacing);
                    const x = f === 0 ? yPadding  : yPadding + stringBlipPadding + fretWidth * f - fretWidth / 2;
                    ctx.beginPath()
                    ctx.arc(x, y, blipRadius, 0, 2 * Math.PI)
                    // if root note background is different
                    if (isSameNote(this.rootNote, note)) {
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