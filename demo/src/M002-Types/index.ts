const MY_STRING_READONLY = 'Hello, World!';
// MY_STRING_READONLY = "different"; // Fehler weil const readonly ist

let myString = 'Hello, World!';
myString = 'different';

let myString2: string;
myString = 'new string';
// myString = true; // TS verhindert das und wirft einen Fehler. In JS waere es okay
console.log('type variable myString', typeof myString); // gitbt string aus

const PI = 3.1419;
console.log('typeof PI is', typeof PI); // gibt number aus

let myNumber;
myNumber = 1;
myNumber = 3.145; // float
myNumber = 42e90; // exponent
myNumber = 42 / 11; // float
myNumber = 0xf4; // hex

let howAreYou: boolean = true;
console.log('typeof howAreYou is', typeof howAreYou); // gibt boolean aus

// Mit einem 'Union Operator' (die Pipe: '|') koennen wir typescript sagen, dass unsere variablen mehrere Typen zulaesst
let myBoolean: boolean | number = true;
myBoolean = 0;
console.log('typeof myBoolean is', typeof myBoolean); // gibt number aus

let varWithoutValue = null;
console.log('typeof varWithoutValue is', typeof varWithoutValue); // gibt object aus
console.log();

// Object-Type-Literal
type Person = {
    name: string;
    age: number;
};

const hugo: Person = {
    name: 'Hugo',
    age: 42,
    // isMarried: false // geht nicht weil wir das nicht im Typen definiert haben
};

console.log('typeof hugo is', typeof hugo); // gibt object aus

// typescript feature interface
interface IPerson {
    firstName: string;
    lastName: string;
    nickName: string | undefined;
    color?: string; // wie Nickname ist dieser Parameter optional
}

const klaus: IPerson = {
    firstName: 'Klaus',
    lastName: 'Mustermann',
    nickName: 'Klausi',
    color: 'blue',
};
console.log('typeof klaus is', typeof klaus); // gibt object aus

// Arrays in TypeScript
let someArray: number[] = [1, 2, 3 /* null, undefined */];
someArray = [33, 99, 0];
someArray[8] = 55;
someArray.push(42);
console.log(someArray);

let mixedArray: (number | string)[] = [1, 2, 3, '42'];
console.log(mixedArray);

let mixedArrayWithUnknownTypes: unknown[] = [1, '42', true, [], {}, null, undefined];
console.log('typeof 1st element in mixedArrayWithUnknownTypes is', typeof mixedArrayWithUnknownTypes[0]); // number
console.log('typeof 2nd element in mixedArrayWithUnknownTypes is', typeof mixedArrayWithUnknownTypes[1]); // string

delete mixedArrayWithUnknownTypes[0];
console.log('typeof 1st element in mixedArrayWithUnknownTypes is', typeof mixedArrayWithUnknownTypes[0]); // undefined

const myFunc = new Function();
console.log('typeof myFunc is', typeof myFunc); // gibt function aus

// Union Types
type MixedType = number | undefined | 'default' | 'my awesome type';
let randomVar: MixedType;
randomVar = 42;
randomVar = 'default';
// randomVar = "abc"; // geht nicht weil kein gueltiger Typ angegeben wurde
randomVar = 'my awesome type';
console.log('randomVar is', randomVar);
console.log();

// Tuples
type StringNumberPair = [string, number];
const pair: StringNumberPair = ['foo', 42];
pair[1] = -1;
// pair[0] = 2; // geht nicht weil muss ein string sein
// pair[2] = 2; // geht nicht weil nicht im tuple definiert
console.log('Ausgabe meines tuples:', pair);
console.log('typeof pair is', typeof pair); // gibt object aus
