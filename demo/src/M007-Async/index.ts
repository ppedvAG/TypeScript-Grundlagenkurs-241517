// npm install -D @types/node um Typinformationen von dem node environment zu erhalten
import { promisify } from 'util';

console.log('Start module M007-Async');

let opIndex = 0;

setTimeout(() => console.log('2 secs later'), 2000);

function longRunningOperation<T>(): T {
    console.log('longRunningOperation #', ++opIndex);

    return <T>{
        foo: 'bar',
    };
}

// Evolutionsschritt 1: Callback functions
// ---------------------------------------

type Foo = { foo: string };
let result: Foo | null = null;

const callback = () => (result = longRunningOperation<Foo>());

// Damit die Operation den UI Thread nicht blockiert fuehren wir sie asynchron aus

setTimeout(callback, 0);

console.log('Ergebnis der langlaufenden function ist ', JSON.stringify(result)); // null weil wir es nicht awaited haben
console.log();

// Evolutionsschritt 2: Callback functions in Promises kapseln
// --------------------------------------------------------
// (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

const fakedDelayInMs = 500;

function createWorkingPromise(delay: number) {
    return new Promise<Foo>((resolveFunc, rejectFunc) => {
        setTimeout(() => {
            const result = longRunningOperation<Foo>();

            // Hier loesen wir das Promise auf mit dem der Aufrufende das Ergebnis im then case verarbeiten kann
            resolveFunc(result);
        }, fakedDelayInMs);
    });
}

// Wir koennen das Ergebnis der asynchronen Operation im then-case des Promises verarbeiten
const workingPromise = createWorkingPromise(fakedDelayInMs);
workingPromise
    .then((result) => console.log('Evo2: promise resolved', result))
    .catch((error) => console.error('Evo2: promise rejected', error))
    .finally(() => console.log('Evo2: Abfrage aufraeumen'));

function createFailingPromise(delay: number) {
    return new Promise<Foo>((resolve, reject) => {
        setTimeout(() => {
            try {
                const result = longRunningOperation<Foo>();
                throw new Error('Error: I had a bad day.');
            } catch (error: any) {
                // Hier loesen wir das Promise auf mit dem der Aufrufende das Ergebnis im then case verarbeiten kann
                reject(error.message);
            }
        }, fakedDelayInMs);
    });
}

const failingPromise = createFailingPromise(fakedDelayInMs);
failingPromise
    .then((result) => console.log('Evo2: promise resolved', result))
    .catch((error) => console.error('Evo2: promise rejected', error))
    .finally(() => console.log('Evo2: Abfrage aufraeumen'));

// Problem mit Promises: Callback Hell!!!!
// Deshalb fuer bessere Lesbarkeit wurde das async/wait Muster eingefuehrt
console.log();

// Evolutionsschritt 3: async/await
// ---------------------------------
// (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

async function fetchDataFromLongRunningOperation() {
    const result = await createWorkingPromise(fakedDelayInMs);
    console.log('Evo3: Wurde asynchron ausgefuehrt: ', JSON.stringify(result));

    try {
        const failing = await createFailingPromise(fakedDelayInMs);
        console.log('Evo3: Wird nie ausgegeben.');
    } catch (error) {
        console.error('Evo3: Gefangener Fehler: ', error);
    }
}
fetchDataFromLongRunningOperation();

// Beispiel API abfragen mit der nodejs fetch API
// -----------------------------------------------

type CatFact = {
    fact: string;
    length: number;
};

async function fetchCatFact() {
    try {
        const result: Response = await fetch('https://catfact.ninja/fact');
        const json: CatFact = await result.json();
        console.log('Wusstest du ueber Katzen... \n\t...', json.fact);
    } catch (error) {
        console.error('Da ist was schief gelaufen... ', error);
    }
}

// selfinvoking function: Selbstaufrufende Funktion die wir asynchron machen koennen
(async () => {
    await fetchCatFact();
    console.log('Ende des Beispiels');
    console.log();
})();

// Beispiel Callbacks zu einem Promise machen um es awaiten zu koennen
// Wir haben aus einem Callback aus Evolutionsschritt 1 eine Promise gemacht welches wir im Evolutionsschritt 3 awaiten koennen
const debounce = promisify(() => setTimeout(() => {}, 1000));
(async () => {
    await debounce();
})();
