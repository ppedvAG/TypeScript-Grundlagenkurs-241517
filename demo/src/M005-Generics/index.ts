namespace Module005 {
    interface Person {
        firstName: string;
        lastName: string;
    }

    interface PersonWithMouth extends Person {
        greet(other: PersonWithFullName): void;
        sayHello: (other: PersonWithFullName) => void;
    }

    function indentity<T>(arg: T): T {
        return arg;
    }

    console.log(indentity<string>('Max'));
    console.log(indentity<number>(42));

    function addFullNameToPerson<T extends Person>(person: T) {
        return {
            ...person,
            fullName: person.firstName + ' ' + person.lastName,
        };
    }

    function addFullNameToPersonOld<T extends Person>(person: T): T {
        return Object.assign(person, { fullName: person.firstName + ' ' + person.lastName });
    }

    const student: PersonWithMouth = {
        firstName: 'Max',
        lastName: 'Mustermann',
        greet: function (other: Person) {
            console.log(this.firstName + ' says: Hello ' + other.firstName);
        },
        // this kann in lambda function nicht verwendet werden
        // sayHello: (other: Person) => {
        //     console.log(this.firstName + ' says: Hello ' + other.firstName);
        // },
        // this kann in lambda function nicht verwendet werden
        sayHello: function (other: PersonWithFullName) {
            console.log(this.firstName + ' says: Hello ' + other.fullName);
        },
    };

    type PersonWithFullName = Person & { fullName: string };
    const { firstName, lastName, fullName } = addFullNameToPerson(student);
    console.log(firstName, lastName, fullName);

    const john = addFullNameToPerson({ firstName: 'John', lastName: 'Doe' });
    student.greet(john);
    student.sayHello(john);

    type PersonKeys = keyof Person; // 'firstName' | 'lastName'
    console.log('Keys von Person:', Object.keys(student));
    console.log('Values von Person:', Object.values(student));
    Object.entries(student).forEach(([key, value]) => {
        console.log(`key: '${key}', value:`, value);
    });

    function getProperty<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];
    }
    console.log('Voller name der Person: ', getProperty(john, 'fullName'));
    console.log();

    // Utility Types
    // siehe https://www.typescriptlang.org/docs/handbook/utility-types.html
    type PartialPerson = Partial<PersonWithFullName>;

    const emptyPerson: PartialPerson = {};

    type ReducedPerson = Omit<PersonWithFullName, 'firstName'>;
    const reduced: ReducedPerson = {
        // firstName: 'Max', // gibt es nicht weil ausgenommen
        lastName: 'Mustermann',
        fullName: 'Max Mustermann',
    };

    type PersonFromFunc = ReturnType<typeof addFullNameToPerson>;
    console.log(`PersonFromFunc ist " Person & {
    fullName: string;
    }"`);
}
