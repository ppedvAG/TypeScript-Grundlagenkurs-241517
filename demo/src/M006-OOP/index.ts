import { Course } from './student.class';
import { createStudent, createVirtualStudent } from './student.func';

namespace Module006 {
    const klaus = new Course.StudentShort('Klaus', 'Mustermann');
    klaus.greet();

    const max = new Course.VirtualStudent('Max');
    max.greet();

    // den Quellcode von index.ts untersuchen mit target es2016 und es5
    console.log(/* Leerzeile */);

    // function basierter Ansatz welcher sich wie Klassen verhalten
    const julia = createStudent('Julia', 'Mustermann');
    julia.greet();

    const jane = createVirtualStudent('Jane');
    jane.greet();
    console.log(/* Leerzeile */);

    // Strukturierte Typisierung (Duck Typing)
    interface Animal {
        name: string;
        makeSound(): void;
    }

    class Dog implements Animal {
        constructor(public name: string) {}
        makeSound(): void {
            console.log('Woof');
        }
    }

    const bello = new Dog('Bello');
    bello.makeSound();
    console.log({
        instanceof: bello instanceof Dog, // true
        typeof: typeof bello, // object
    });

    const duck: Animal = {
        name: 'Duck',
        makeSound() {
            console.log('Quack');
        },
    };
    duck.makeSound();

    const bunny = {
        name: 'Bugs',
        makeSound() {
            console.log('Hi doc!');
        },
    } as Animal;
    bunny.makeSound();
}
