import { BottlesOnTheWall } from "./99-bottles-of-thing";

// Type Definitions
// BottlesOnTheWall generates a "99 Bottles of Thing"-style song.
// Parameters: 
//   - `item`: The name of the item being sung about.
//   - `startCount`: The starting number of items.
//   - `decrement`: How many items are taken down in each verse.

type StandardSong = BottlesOnTheWall<"thing", 2, 1>;
const standardSong: StandardSong = [
    "2 bottles of thing on the wall, 2 bottles of thing. Take 1 down and pass it around, 1 bottle of thing on the wall.",
    "1 bottle of thing on the wall, 1 bottle of thing. Take it down and pass it around, no more bottles of thing on the wall.",
    "No more bottles of thing on the wall, no more bottles of thing. Go to the store and buy 2 more, 2 bottles of thing on the wall."
];

type SodaSong = BottlesOnTheWall<"soda", 2, 1>;
const sodaSong: SodaSong = [
    "2 bottles of soda on the wall, 2 bottles of soda. Take 1 down and pass it around, 1 bottle of soda on the wall.",
    "1 bottle of soda on the wall, 1 bottle of soda. Take it down and pass it around, no more bottles of soda on the wall.",
    "No more bottles of soda on the wall, no more bottles of soda. Go to the store and buy 2 more, 2 bottles of soda on the wall."
];

type LargeStepSong = BottlesOnTheWall<"thing", 10, 2>;
const largeStepSong: LargeStepSong = [
    "10 bottles of thing on the wall, 10 bottles of thing. Take 2 down and pass it around, 8 bottles of thing on the wall.",
    "8 bottles of thing on the wall, 8 bottles of thing. Take 2 down and pass it around, 6 bottles of thing on the wall.",
    "6 bottles of thing on the wall, 6 bottles of thing. Take 2 down and pass it around, 4 bottles of thing on the wall.",
    "4 bottles of thing on the wall, 4 bottles of thing. Take 2 down and pass it around, 2 bottles of thing on the wall.",
    "2 bottles of thing on the wall, 2 bottles of thing. Take 2 down and pass it around, no more bottles of thing on the wall.",
    "No more bottles of thing on the wall, no more bottles of thing. Go to the store and buy 10 more, 10 bottles of thing on the wall."
];

type OddDecrementSong = BottlesOnTheWall<"thing", 5, 3>;
const oddDecrementSong: OddDecrementSong = [
    "5 bottles of thing on the wall, 5 bottles of thing. Take 3 down and pass it around, 2 bottles of thing on the wall.",
    "2 bottles of thing on the wall, 2 bottles of thing. Take 3 down and pass it around, no more bottles of thing on the wall.",
    "No more bottles of thing on the wall, no more bottles of thing. Go to the store and buy 5 more, 5 bottles of thing on the wall."
];

// Test Cases for Expected Errors
// Case: Missing verses or incorrect phrasing
type ErrorOnMissingVerse = BottlesOnTheWall<"thing", 2, 1>;
const errorOnMissingVerse: ErrorOnMissingVerse = [
    "2 bottles of thing on the wall, 2 bottles of thing. Take 1 down and pass it around, 1 bottle of thing on the wall.",
    // Missing one required verse
    // @ts-expect-error: Incomplete song
    "No more bottles of thing on the wall, no more bottles of thing. Go to the store and buy 2 more, 2 bottles of thing on the wall."
];

// Case: Incorrect count decrement
type ErrorOnDecrement = BottlesOnTheWall<"thing", 3, 1>;
const errorOnDecrement: ErrorOnDecrement = [
    "3 bottles of thing on the wall, 3 bottles of thing. Take 1 down and pass it around, 2 bottles of thing on the wall.",
    // Incorrect decrement value
    // @ts-expect-error: Mismatch in decremented count
    "2 bottles of thing on the wall, 2 bottles of thing. Take 2 down and pass it around, no more bottles of thing on the wall."
];

// Case: Incorrect item name
type ErrorOnItemName = BottlesOnTheWall<"thing", 2, 1>;
const errorOnItemName: ErrorOnItemName = [
    // @ts-expect-error: Item name mismatch
    "2 bottles of soda on the wall, 2 bottles of soda. Take 1 down and pass it around, 1 bottle of soda on the wall.",
    // @ts-expect-error: Item name mismatch
    "1 bottle of soda on the wall, 1 bottle of soda. Take it down and pass it around, no more bottles of soda on the wall.",
    // @ts-expect-error: Item name mismatch
    "No more bottles of soda on the wall, no more bottles of soda. Go to the store and buy 2 more, 2 bottles of soda on the wall."
];

type OrderedSong = BottlesOnTheWall<"thing", 3, 1>;

// Test Case: Out-of-order verses
const incorrectOrderSong: OrderedSong = [
    // Verse 2 is placed before Verse 1
    // @ts-expect-error: The verses are out of order
    "2 bottles of thing on the wall, 2 bottles of thing. Take 1 down and pass it around, 1 bottle of thing on the wall.",
    // @ts-expect-error: The verses are out of order
    "3 bottles of thing on the wall, 3 bottles of thing. Take 1 down and pass it around, 2 bottles of thing on the wall.",
    "1 bottle of thing on the wall, 1 bottle of thing. Take it down and pass it around, no more bottles of thing on the wall.",
    "No more bottles of thing on the wall, no more bottles of thing. Go to the store and buy 3 more, 3 bottles of thing on the wall."
];

// Test Case: Missing a verse in sequence
const missingVerseSong: OrderedSong = [
    // Verse 2 is missing
    "3 bottles of thing on the wall, 3 bottles of thing. Take 1 down and pass it around, 2 bottles of thing on the wall.",
    // @ts-expect-error: Missing a required verse
    "1 bottle of thing on the wall, 1 bottle of thing. Take it down and pass it around, no more bottles of thing on the wall.",
    // @ts-expect-error
    "No more bottles of thing on the wall, no more bottles of thing. Go to the store and buy 3 more, 3 bottles of thing on the wall."
];

// Test Case: Duplicated verses
const duplicatedVersesSong: OrderedSong = [
    // Verse 2 is duplicated
    "3 bottles of thing on the wall, 3 bottles of thing. Take 1 down and pass it around, 2 bottles of thing on the wall.",
    "2 bottles of thing on the wall, 2 bottles of thing. Take 1 down and pass it around, 1 bottle of thing on the wall.",
    // @ts-expect-error: Duplicated verses
    "2 bottles of thing on the wall, 2 bottles of thing. Take 1 down and pass it around, 1 bottle of thing on the wall.", // Duplicate
    // @ts-expect-error
    "1 bottle of thing on the wall, 1 bottle of thing. Take it down and pass it around, no more bottles of thing on the wall.",
    "No more bottles of thing on the wall, no more bottles of thing. Go to the store and buy 3 more, 3 bottles of thing on the wall."
];

// Classic "99 Bottles of Thing" Song
type ClassicNinetyNineSong = BottlesOnTheWall<"thing", 99, 1>;
const classicSong: ClassicNinetyNineSong = [
    "99 bottles of thing on the wall, 99 bottles of thing. Take 1 down and pass it around, 98 bottles of thing on the wall.",
    "98 bottles of thing on the wall, 98 bottles of thing. Take 1 down and pass it around, 97 bottles of thing on the wall.",
    "97 bottles of thing on the wall, 97 bottles of thing. Take 1 down and pass it around, 96 bottles of thing on the wall.",
    "96 bottles of thing on the wall, 96 bottles of thing. Take 1 down and pass it around, 95 bottles of thing on the wall.",
    "95 bottles of thing on the wall, 95 bottles of thing. Take 1 down and pass it around, 94 bottles of thing on the wall.",
    "94 bottles of thing on the wall, 94 bottles of thing. Take 1 down and pass it around, 93 bottles of thing on the wall.",
    "93 bottles of thing on the wall, 93 bottles of thing. Take 1 down and pass it around, 92 bottles of thing on the wall.",
    "92 bottles of thing on the wall, 92 bottles of thing. Take 1 down and pass it around, 91 bottles of thing on the wall.",
    "91 bottles of thing on the wall, 91 bottles of thing. Take 1 down and pass it around, 90 bottles of thing on the wall.",
    "90 bottles of thing on the wall, 90 bottles of thing. Take 1 down and pass it around, 89 bottles of thing on the wall.",
    "89 bottles of thing on the wall, 89 bottles of thing. Take 1 down and pass it around, 88 bottles of thing on the wall.",
    "88 bottles of thing on the wall, 88 bottles of thing. Take 1 down and pass it around, 87 bottles of thing on the wall.",
    "87 bottles of thing on the wall, 87 bottles of thing. Take 1 down and pass it around, 86 bottles of thing on the wall.",
    "86 bottles of thing on the wall, 86 bottles of thing. Take 1 down and pass it around, 85 bottles of thing on the wall.",
    "85 bottles of thing on the wall, 85 bottles of thing. Take 1 down and pass it around, 84 bottles of thing on the wall.",
    "84 bottles of thing on the wall, 84 bottles of thing. Take 1 down and pass it around, 83 bottles of thing on the wall.",
    "83 bottles of thing on the wall, 83 bottles of thing. Take 1 down and pass it around, 82 bottles of thing on the wall.",
    "82 bottles of thing on the wall, 82 bottles of thing. Take 1 down and pass it around, 81 bottles of thing on the wall.",
    "81 bottles of thing on the wall, 81 bottles of thing. Take 1 down and pass it around, 80 bottles of thing on the wall.",
    "80 bottles of thing on the wall, 80 bottles of thing. Take 1 down and pass it around, 79 bottles of thing on the wall.",
    "79 bottles of thing on the wall, 79 bottles of thing. Take 1 down and pass it around, 78 bottles of thing on the wall.",
    "78 bottles of thing on the wall, 78 bottles of thing. Take 1 down and pass it around, 77 bottles of thing on the wall.",
    "77 bottles of thing on the wall, 77 bottles of thing. Take 1 down and pass it around, 76 bottles of thing on the wall.",
    "76 bottles of thing on the wall, 76 bottles of thing. Take 1 down and pass it around, 75 bottles of thing on the wall.",
    "75 bottles of thing on the wall, 75 bottles of thing. Take 1 down and pass it around, 74 bottles of thing on the wall.",
    "74 bottles of thing on the wall, 74 bottles of thing. Take 1 down and pass it around, 73 bottles of thing on the wall.",
    "73 bottles of thing on the wall, 73 bottles of thing. Take 1 down and pass it around, 72 bottles of thing on the wall.",
    "72 bottles of thing on the wall, 72 bottles of thing. Take 1 down and pass it around, 71 bottles of thing on the wall.",
    "71 bottles of thing on the wall, 71 bottles of thing. Take 1 down and pass it around, 70 bottles of thing on the wall.",
    "70 bottles of thing on the wall, 70 bottles of thing. Take 1 down and pass it around, 69 bottles of thing on the wall.",
    "69 bottles of thing on the wall, 69 bottles of thing. Take 1 down and pass it around, 68 bottles of thing on the wall.",
    "68 bottles of thing on the wall, 68 bottles of thing. Take 1 down and pass it around, 67 bottles of thing on the wall.",
    "67 bottles of thing on the wall, 67 bottles of thing. Take 1 down and pass it around, 66 bottles of thing on the wall.",
    "66 bottles of thing on the wall, 66 bottles of thing. Take 1 down and pass it around, 65 bottles of thing on the wall.",
    "65 bottles of thing on the wall, 65 bottles of thing. Take 1 down and pass it around, 64 bottles of thing on the wall.",
    "64 bottles of thing on the wall, 64 bottles of thing. Take 1 down and pass it around, 63 bottles of thing on the wall.",
    "63 bottles of thing on the wall, 63 bottles of thing. Take 1 down and pass it around, 62 bottles of thing on the wall.",
    "62 bottles of thing on the wall, 62 bottles of thing. Take 1 down and pass it around, 61 bottles of thing on the wall.",
    "61 bottles of thing on the wall, 61 bottles of thing. Take 1 down and pass it around, 60 bottles of thing on the wall.",
    "60 bottles of thing on the wall, 60 bottles of thing. Take 1 down and pass it around, 59 bottles of thing on the wall.",
    "59 bottles of thing on the wall, 59 bottles of thing. Take 1 down and pass it around, 58 bottles of thing on the wall.",
    "58 bottles of thing on the wall, 58 bottles of thing. Take 1 down and pass it around, 57 bottles of thing on the wall.",
    "57 bottles of thing on the wall, 57 bottles of thing. Take 1 down and pass it around, 56 bottles of thing on the wall.",
    "56 bottles of thing on the wall, 56 bottles of thing. Take 1 down and pass it around, 55 bottles of thing on the wall.",
    "55 bottles of thing on the wall, 55 bottles of thing. Take 1 down and pass it around, 54 bottles of thing on the wall.",
    "54 bottles of thing on the wall, 54 bottles of thing. Take 1 down and pass it around, 53 bottles of thing on the wall.",
    "53 bottles of thing on the wall, 53 bottles of thing. Take 1 down and pass it around, 52 bottles of thing on the wall.",
    "52 bottles of thing on the wall, 52 bottles of thing. Take 1 down and pass it around, 51 bottles of thing on the wall.",
    "51 bottles of thing on the wall, 51 bottles of thing. Take 1 down and pass it around, 50 bottles of thing on the wall.",
    "50 bottles of thing on the wall, 50 bottles of thing. Take 1 down and pass it around, 49 bottles of thing on the wall.",
    "49 bottles of thing on the wall, 49 bottles of thing. Take 1 down and pass it around, 48 bottles of thing on the wall.",
    "48 bottles of thing on the wall, 48 bottles of thing. Take 1 down and pass it around, 47 bottles of thing on the wall.",
    "47 bottles of thing on the wall, 47 bottles of thing. Take 1 down and pass it around, 46 bottles of thing on the wall.",
    "46 bottles of thing on the wall, 46 bottles of thing. Take 1 down and pass it around, 45 bottles of thing on the wall.",
    "45 bottles of thing on the wall, 45 bottles of thing. Take 1 down and pass it around, 44 bottles of thing on the wall.",
    "44 bottles of thing on the wall, 44 bottles of thing. Take 1 down and pass it around, 43 bottles of thing on the wall.",
    "43 bottles of thing on the wall, 43 bottles of thing. Take 1 down and pass it around, 42 bottles of thing on the wall.",
    "42 bottles of thing on the wall, 42 bottles of thing. Take 1 down and pass it around, 41 bottles of thing on the wall.",
    "41 bottles of thing on the wall, 41 bottles of thing. Take 1 down and pass it around, 40 bottles of thing on the wall.",
    "40 bottles of thing on the wall, 40 bottles of thing. Take 1 down and pass it around, 39 bottles of thing on the wall.",
    "39 bottles of thing on the wall, 39 bottles of thing. Take 1 down and pass it around, 38 bottles of thing on the wall.",
    "38 bottles of thing on the wall, 38 bottles of thing. Take 1 down and pass it around, 37 bottles of thing on the wall.",
    "37 bottles of thing on the wall, 37 bottles of thing. Take 1 down and pass it around, 36 bottles of thing on the wall.",
    "36 bottles of thing on the wall, 36 bottles of thing. Take 1 down and pass it around, 35 bottles of thing on the wall.",
    "35 bottles of thing on the wall, 35 bottles of thing. Take 1 down and pass it around, 34 bottles of thing on the wall.",
    "34 bottles of thing on the wall, 34 bottles of thing. Take 1 down and pass it around, 33 bottles of thing on the wall.",
    "33 bottles of thing on the wall, 33 bottles of thing. Take 1 down and pass it around, 32 bottles of thing on the wall.",
    "32 bottles of thing on the wall, 32 bottles of thing. Take 1 down and pass it around, 31 bottles of thing on the wall.",
    "31 bottles of thing on the wall, 31 bottles of thing. Take 1 down and pass it around, 30 bottles of thing on the wall.",
    "30 bottles of thing on the wall, 30 bottles of thing. Take 1 down and pass it around, 29 bottles of thing on the wall.",
    "29 bottles of thing on the wall, 29 bottles of thing. Take 1 down and pass it around, 28 bottles of thing on the wall.",
    "28 bottles of thing on the wall, 28 bottles of thing. Take 1 down and pass it around, 27 bottles of thing on the wall.",
    "27 bottles of thing on the wall, 27 bottles of thing. Take 1 down and pass it around, 26 bottles of thing on the wall.",
    "26 bottles of thing on the wall, 26 bottles of thing. Take 1 down and pass it around, 25 bottles of thing on the wall.",
    "25 bottles of thing on the wall, 25 bottles of thing. Take 1 down and pass it around, 24 bottles of thing on the wall.",
    "24 bottles of thing on the wall, 24 bottles of thing. Take 1 down and pass it around, 23 bottles of thing on the wall.",
    "23 bottles of thing on the wall, 23 bottles of thing. Take 1 down and pass it around, 22 bottles of thing on the wall.",
    "22 bottles of thing on the wall, 22 bottles of thing. Take 1 down and pass it around, 21 bottles of thing on the wall.",
    "21 bottles of thing on the wall, 21 bottles of thing. Take 1 down and pass it around, 20 bottles of thing on the wall.",
    "20 bottles of thing on the wall, 20 bottles of thing. Take 1 down and pass it around, 19 bottles of thing on the wall.",
    "19 bottles of thing on the wall, 19 bottles of thing. Take 1 down and pass it around, 18 bottles of thing on the wall.",
    "18 bottles of thing on the wall, 18 bottles of thing. Take 1 down and pass it around, 17 bottles of thing on the wall.",
    "17 bottles of thing on the wall, 17 bottles of thing. Take 1 down and pass it around, 16 bottles of thing on the wall.",
    "16 bottles of thing on the wall, 16 bottles of thing. Take 1 down and pass it around, 15 bottles of thing on the wall.",
    "15 bottles of thing on the wall, 15 bottles of thing. Take 1 down and pass it around, 14 bottles of thing on the wall.",
    "14 bottles of thing on the wall, 14 bottles of thing. Take 1 down and pass it around, 13 bottles of thing on the wall.",
    "13 bottles of thing on the wall, 13 bottles of thing. Take 1 down and pass it around, 12 bottles of thing on the wall.",
    "12 bottles of thing on the wall, 12 bottles of thing. Take 1 down and pass it around, 11 bottles of thing on the wall.",
    "11 bottles of thing on the wall, 11 bottles of thing. Take 1 down and pass it around, 10 bottles of thing on the wall.",
    "10 bottles of thing on the wall, 10 bottles of thing. Take 1 down and pass it around, 9 bottles of thing on the wall.",
    "9 bottles of thing on the wall, 9 bottles of thing. Take 1 down and pass it around, 8 bottles of thing on the wall.",
    "8 bottles of thing on the wall, 8 bottles of thing. Take 1 down and pass it around, 7 bottles of thing on the wall.",
    "7 bottles of thing on the wall, 7 bottles of thing. Take 1 down and pass it around, 6 bottles of thing on the wall.",
    "6 bottles of thing on the wall, 6 bottles of thing. Take 1 down and pass it around, 5 bottles of thing on the wall.",
    "5 bottles of thing on the wall, 5 bottles of thing. Take 1 down and pass it around, 4 bottles of thing on the wall.",
    "4 bottles of thing on the wall, 4 bottles of thing. Take 1 down and pass it around, 3 bottles of thing on the wall.",
    "3 bottles of thing on the wall, 3 bottles of thing. Take 1 down and pass it around, 2 bottles of thing on the wall.",
    "2 bottles of thing on the wall, 2 bottles of thing. Take 1 down and pass it around, 1 bottle of thing on the wall.",
    "1 bottle of thing on the wall, 1 bottle of thing. Take it down and pass it around, no more bottles of thing on the wall.",
    "No more bottles of thing on the wall, no more bottles of thing. Go to the store and buy 99 more, 99 bottles of thing on the wall."
];