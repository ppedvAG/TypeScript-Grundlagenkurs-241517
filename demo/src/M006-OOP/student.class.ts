export namespace Course {
    export interface Student {
        firstName: string;
        lastName: string;
        fullName: string;
        greet(): void;
    }

    export class StudentExplicit {
        firstName: string;
        lastName: string;
        fullName: string;

        constructor(firstName: string, lastName: string) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = firstName + ' ' + lastName;
        }

        greet(): void {
            console.log(this.fullName + ' says: Hello World!');
        }
    }

    export class StudentShort implements Student {
        fullName: string;

        constructor(public firstName: string, public lastName: string) {
            this.fullName = firstName + ' ' + lastName;
        }

        greet(): void {
            console.log(this.fullName + ' says: Hello World!');
        }
    }

    export class VirtualStudent extends StudentShort {
        constructor(nickName: string) {
            // ich rufe die Basisklasse auf und uebergebe nickName als Vornamen
            super(nickName, '');

            // Methode der Vaterklasse aufrufen
            // super.greet();
        }

        override greet(): void {
            console.log(this.fullName + ' says: Hi!');
        }
    }
}
