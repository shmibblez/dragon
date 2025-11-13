// helpers (types, objects, functions) for notes

export type Note = "A♭" | "A" | "A♯"
    | "B♭" | "B" // no B♯
    | "C" | "C♯" // no C♭
    | "D♭" | "D" | "D♯"
    | "E♭" | "E" // no E♯
    | "F" | "F♯" // no F♭
    | "G♭" | "G" | "G♯"

// notes in order, flats only
export const allNotesWithFlats: Note[] = ["A", "B♭", "B", "C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭"]
// notes in order, sharps only
export const allNotesWithSharps: Note[] = ["A", "A♯", "B", "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯"]
export const allNotesWithFlats2: Note[] = [...allNotesWithFlats, ...allNotesWithFlats]
export const allNotesWithSharps2: Note[] = [...allNotesWithSharps, ...allNotesWithSharps]

export type Solfege = "La♭" | "La" | "La♯" // A
    | "Si♭" | "Si" // B
    | "Do" | "Do♯" // C
    | "Re♭" | "Re" | "Re♯" // D
    | "Mi♭" | "Mi" // E
    | "Fa" | "Fa♯" // F
    | "So♭" | "So" | "So♯" // G

export const allSolfegeNotes: Solfege[] = [
    "La♭", "La", "La♯",
    "Si♭", "Si",
    "Do", "Do♯",
    "Re♭", "Re", "Re♯",
    "Mi♭", "Mi",
    "Fa", "Fa♯",
    "So♭", "So", "So♯"
]

export const NoteToSolfege: { [note in Note]: Solfege } = {
    "A♭": "So♭",
    "A": "La",
    "A♯": "La♯",
    "B♭": "Si♭",
    "B": "Si",
    "C": "Do",
    "C♯": "Do♯",
    "D♭": "Re♭",
    "D": "Re",
    "D♯": "Re♯",
    "E♭": "Mi♭",
    "E": "Mi",
    "F": "Fa",
    "F♯": "Fa♯",
    "G♭": "So♭",
    "G": "So",
    "G♯": "So♯",
}

export const SolfegeToNote: { [solfege in Solfege]: Note } = {
    "La♭": "A♭",
    "La": "A",
    "La♯": "A♯",
    "Si♭": "B♭",
    "Si": "B",
    "Do": "C",
    "Do♯": "C♯",
    "Re♭": "D♭",
    "Re": "D",
    "Re♯": "D♯",
    "Mi♭": "E♭",
    "Mi": "E",
    "Fa": "F",
    "Fa♯": "F♯",
    "So♭": "G♭",
    "So": "G",
    "So♯": "G♯",
}

export type Sharps = "A" | "A♯"
    | "B"
    | "C" | "C♯"
    | "D" | "D♯"
    | "E"
    | "F" | "F♯"
    | "G" | "G♯"

export type Flats = "A♭" | "A"
    | "B♭" | "B"
    | "C"
    | "D♭" | "D"
    | "E♭" | "E"
    | "F"
    | "G♭" | "G"

export const SharpToFlat: { [note in Note]: Note } = {
    "A♭": "G♭",
    "A": "A",
    "A♯": "B♭",
    "B♭": "B♭",
    "B": "B",
    "C": "C",
    "C♯": "D♭",
    "D♭": "D♭",
    "D": "D",
    "D♯": "E♭",
    "E♭": "E♭",
    "E": "E",
    "F": "F",
    "F♯": "G♭",
    "G♭": "G♭",
    "G": "G",
    "G♯": "A♭",
}

export const FlatToSharp: { [note in Note]: Note } = {
    "A♭": "G♯",
    "A": "A",
    "A♯": "A♯",
    "B♭": "A♯",
    "B": "B",
    "C": "C",
    "C♯": "C♯",
    "D♭": "C♯",
    "D": "D",
    "D♯": "D♯",
    "E♭": "D♯",
    "E": "E",
    "F": "F",
    "F♯": "F♯",
    "G♭": "F♯",
    "G": "G",
    "G♯": "G♯",
}

export function noteToSolfege(note: Note): Solfege {
    return NoteToSolfege[note];
}

export function solfegeToNote(solfege: Solfege): Note {
    return SolfegeToNote[solfege];
}

export function toSharp(note: Note): Note {
    return FlatToSharp[note]
}

export function toFlat(note: Note): Note {
    return SharpToFlat[note]
}

export function nextNoteSharp(note: Note): Note {
    const iSharp = allNotesWithSharps2.indexOf(note);
    const iFlat = allNotesWithFlats2.indexOf(note);
    const index = iSharp !== -1 ? iSharp : iFlat;
    // doubled array to prevent overflow
    return allNotesWithSharps2[index + 1]!;
}

export function nextNoteFlat(note: Note): Note {
    const iSharp = allNotesWithSharps2.indexOf(note);
    const iFlat = allNotesWithFlats2.indexOf(note);
    const index = iSharp !== -1 ? iSharp : iFlat;
    // doubled array to prevent overflow
    return allNotesWithFlats2[index + 1]!;
}

export function isSolfege(note: string): boolean {
    return allSolfegeNotes.includes(note as Solfege);
}

export function isNote(note: string): boolean {
    return allNotesWithFlats.includes(note as Note) || allNotesWithSharps.includes(note as Note);
}

export function isSameNote(note1: Note, note2: Note): boolean {
    return note1 === note2 || FlatToSharp[note1] === FlatToSharp[note2] || SharpToFlat[note1] === SharpToFlat[note2];
}