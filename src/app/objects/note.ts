// helpers (types, objects, functions) for notes

export type Note = "Ab" | "A" | "A#"
    | "Bb" | "B" // no B#
    | "C" | "C#" // no Cb
    | "Db" | "D" | "D#"
    | "Eb" | "E" // no E#
    | "F" | "F#" // no Fb
    | "Gb" | "G" | "G#"

export const allNotesWithFlats: Note[] = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"]
export const allNotesWithSharps: Note[] = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]

export type Sharps = "A" | "A#"
    | "B"
    | "C" | "C#"
    | "D" | "D#"
    | "E"
    | "F" | "F#"
    | "G" | "G#"

export type Flats = "Ab" | "A"
    | "Bb" | "B"
    | "C"
    | "Db" | "D"
    | "Eb" | "E"
    | "F"
    | "Gb" | "G"

export const SharpToFlat: { [note in Note]: Note } = {
    "Ab": "Gb",
    "A": "A",
    "A#": "Bb",
    "Bb": "Bb",
    "B": "B",
    "C": "C",
    "C#": "Db",
    "Db": "Db",
    "D": "D",
    "D#": "Eb",
    "Eb": "Eb",
    "E": "E",
    "F": "F",
    "F#": "Gb",
    "Gb": "Gb",
    "G": "G",
    "G#": "Ab",
}

export const FlatToSharp: { [note in Note]: Note } = {
    "Ab": "G#",
    "A": "A",
    "A#": "A#",
    "Bb": "A#",
    "B": "B",
    "C": "C",
    "C#": "C#",
    "Db": "C#",
    "D": "D",
    "D#": "D#",
    "Eb": "D#",
    "E": "E",
    "F": "F",
    "F#": "F#",
    "Gb": "F#",
    "G": "G",
    "G#": "G#",
}

export function toSharp(note: Note): Note {
    return FlatToSharp[note]
}

export function toFlat(note: Note): Note {
    return SharpToFlat[note]
}