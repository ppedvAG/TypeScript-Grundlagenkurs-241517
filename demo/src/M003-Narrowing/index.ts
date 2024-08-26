let n = 10;
let numberAsString = n.toString();
let numberAsStringWithDecimals = n.toFixed(2); // .toFixed() ist eine Methode von Number
console.log('number n is ', numberAsStringWithDecimals, ' and type is ', typeof numberAsStringWithDecimals);

let value: unknown = 'string';
value = 10; // typeof value === 'number'
// value.toFixed(2); // Error weil value is unknown

let newValue = (<number>value).toFixed();

const someDate = new Date(1999, 12, 31);
console.log('typeof someDate is ', typeof someDate); // return object
console.log('instance of Date is ', someDate instanceof Date); // return true

interface IDate {
    year: number;
    month: number;
    day: number;
}

const date: IDate = {
    year: 1999,
    month: 12,
    day: 31,
};
// console.log('instance of IDate is ', date instanceof IDate); // geht nicht weil instanceof nur auf eine Klasse angewendet wird
// siehe index.js: Keine Typinformationen vorhanden, d. h. IDate ist nicht vorhanden
console.log('instance of date is ', date instanceof Object); // return true

// in ist ein operator in JS
console.log('check by property ', 'year' in date); // return true
console.log('check by property ', 'foo' in date); // return false
console.log();

function someAmbigiousFunc(value: string | number) {
    if (typeof value === 'number') {
        const valueAsString = value.toFixed();
        console.log('valueAsString ist jetzt ein String: ', valueAsString);
    } else if (value.match('Hello')) {
        console.log('Typescript weiss implizit, dass es ein string sein muss weil oben auf number asserted wurde!');
    }
}

// Type Casting vs. Type Assertion

let someNumberString = '0';
// let castedNumber = <number>someNumberString; // geht nicht weil Type Assertion und kein Casting
let num1 = parseInt(someNumberString); // Casting zu number
let num2 = Number(someNumberString); // ebenso
let numShort = +someNumberString; // Kurzform
console.log('converted to num', num1, typeof num1);

let bool = Boolean(num2); // Casting zu einem boolean
let boolShort = !!numShort; // Kurzform
console.log('converted to bool', bool, typeof bool);

let numAsString = num1.toString();
let boolAsString = String(bool); // Casting zu einem string
let boolAsStringShort = '' + boolShort; // Kurzform

let undefinedBool: boolean;
// let boolAsStringShort2 = '' + undefinedBool; // Typescript meckert aber die Ausgabe waere 'undefined'
let undefinedBoolAsString = `${undefinedBool!}`; // mit ! koennen wir sicherstellen das undefinedBool nicht undefined ist
console.log('undefinedBoolAsString: ', undefinedBoolAsString);
console.log();

function repeatString(text: string, times?: number): string | undefined {
    if (times !== undefined && times > 0) {
        return text.repeat(times || 1);
    }
    return undefined;
}
function repeatStringAlt(text: string, times = 5): string {
    return text.repeat(times);
}

console.log('1 star', repeatString('🌟', 1));
console.log('2 stars', repeatStringAlt('🌟', 2));

let add = (a: number, b: number) => a + b;
console.log('add 10 + 20 = ', add(10, 20));

console.log(`String templates with variables
    ${num1}
    and very long strings
    ${boolAsStringShort}
`);

function myTag(strings: TemplateStringsArray, personExp: string, ageExp: number) {
    const ageStr = ageExp < 100 ? 'youngster' : 'centenarian';
    return `${strings[0]}${personExp}${strings[1]}${ageStr}${strings[2]}`;
}

const mike = 'Mike';
const age = 20;
const output = myTag`Name: ${mike}, Age: ${age}`;
console.log('output: ', output);
