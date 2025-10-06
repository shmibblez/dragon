export type Interval = "p1"
    | "m2" | "M2"
    | "m3" | "M3"
    | "P4" | "A4" | "d5"
    | "P5" | "m6" | "M6"
    | "m7" | "M7"
    | "P8";

export type Semitones = | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export const IntervalToSemitones: { [interval in Interval]: Semitones } = {
    "p1": 0,
    "m2": 1,
    "M2": 2,
    "m3": 3,
    "M3": 4,
    "P4": 5,
    "A4": 6,
    "d5": 6,
    "P5": 7,
    "m6": 8,
    "M6": 9,
    "m7": 10,
    "M7": 11,
    "P8": 12,
}

export const SemitonesToInterval: { [semitones in Semitones]: Interval } = {
    0: "p1",
    1: "m2",
    2: "M2",
    3: "m3",
    4: "M3",
    5: "P4",
    6: "A4", // or d5
    7: "P5",
    8: "m6",
    9: "M6",
    10: "m7",
    11: "M7",
    12: "P8",
}